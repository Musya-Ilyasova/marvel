import "./charSearchForm.scss"

const Form = () => {
    let message = "somethink"
    return (
        <form className="char__search-form">
            <h3 className="char__search-label">Or find a character by name:</h3>
            <div className="char__search-wrapper">
                <input 
                    type="text"
                    id="charName" 
                    name='charName' 
                    placeholder="Enter name" />
                <button
                    className="button button__main">
                    <div className="inner">Find</div>
                </button>
            </div>
            <p className="char__search-error">{message}</p>
        </form>
    )
}

export default Form;