import { useState, useEffect } from 'react';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import useMarvelService from "../../services/MarvelService";
import { Link } from 'react-router-dom';

import "./charSearchForm.scss"

const SearchForm = () => {
    const [charName, setCharName] = useState({});
    const {loading, error, getSearchCharacter} = useMarvelService();

    const onRequest = (charName) => {
        getSearchCharacter(charName)
            .then(charLoaded)
    }

    // useEffect(() => {
    //     onRequest();
    // }, [charName]);
    
    const charLoaded = (charName) => {
        console.log(charName)
        setCharName(charName => charName)
    }

    const errMsg = error ? <div className="char__search-error">The character was not found. Check the name and try again</div> : null;
    return (
        <Formik  
            initialValues={{
                charName: "",
            }}
            validationSchema= {Yup.object({
                charName: Yup.string()
                    .required('This file is required')
            })}
            onSubmit = {values => onRequest(values)}
        
        >
            <Form className="char__search-form" >
                <h3 className="char__search-label">Or find a character by name:</h3>
                <div className="char__search-wrapper">
                    <Field 
                        type="text"
                        id="charName" 
                        name="charName" 
                        placeholder="Enter name" />
                    <button
                        className="button button__main" type='submit'>
                        <div className="inner">Find</div>
                    </button>
                </div>
                <ErrorMessage className="char__search-error" name="charName" component="div"/>
                {errMsg}
                {charName.name ? <div className="char__search-success">There is {charName.name} page <Link className="button button__secondary"  to={`/${charName.id}`}>
                    <div className="inner">To page</div>
                    </Link></div> : null}
            </Form>
        </Formik>
    )
}

export default SearchForm;