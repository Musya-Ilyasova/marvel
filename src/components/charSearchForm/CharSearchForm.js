import { useState } from 'react';
import { Form, Formik, Field, ErrorMessage as FormikErrorMessage} from 'formik';
import * as Yup from "yup";
import useMarvelService from "../../services/MarvelService";

import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from 'react-router-dom';

import "./charSearchForm.scss"

const SearchForm = () => {
    const [char, setChar] = useState(null);
    const {loading, error, getSearchCharacter, clearError} = useMarvelService();

    const updateChar = (char) => {
        clearError();
        getSearchCharacter(char)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char)
    }

    const errorMessage = error ? <div className="char__search-error" name="charName" component="div">
        <ErrorMessage/>
    </div> : null;
    const results =  !char ? null : char.length > 0 ?
        <div className="char__search-wrapper">
            <div className="char__search-success"> There is! Visit {char[0].name} page?</div>
            <Link to={`/characters/${char[0].id}`} className="button button__secondary">
                <div className="inner">To page</div>
            </Link>
        </div> :
        <div className="char__search-error">
            The character was not found. Check the name and try again
        </div>;

    return (
        <>
            <Formik
                initialValues={{
                    charName: "",
                }}
                validationSchema= {Yup.object({
                    charName: Yup.string()
                        .required('This file is required')
                })}
                onSubmit = {({charName}) => updateChar(charName)}

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
                    <FormikErrorMessage component="div" className="char__search-error" name="charName"/>
                    {results}
                    {errorMessage}
                </Form>
            </Formik>
        </>
    )
}

export default SearchForm;
