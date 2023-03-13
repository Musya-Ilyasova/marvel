import { useEffect, useState } from 'react'
import { useParams, Link} from 'react-router-dom'
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import './singleCharacterPage.scss'

const SingleCharacterPage = () => {
  const {characterId} = useParams();
  const [character, setCharacter] = useState(null);
  const {loading, error, getCharacter, clearError} = useMarvelService();

  useEffect(() => {
    updateCharacter();
  }, [characterId]);

  const updateCharacter = () => {
    clearError();
    getCharacter(characterId)
      .then(onCharacterLoaded)
  }

  const onCharacterLoaded = (character) => {
    setCharacter(character);
  }

  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading ? <Spinner/> : null;
  const content = !(loading || error || !character) ? <View character={character}/> : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  )
}

const View = ({character}) => {
  const {title, description, pageCount, thumbnail, language, price} = character;
  return (
    <div className="single-character">
      <img src={thumbnail} alt={title} className="single-character__img"/>
      <div className="single-character__info">
        <h2 className="single-character__name">{title}</h2>
        <p className="single-character__descr">{description}</p>
        <p className="single-character__descr">{pageCount}</p>
        <p className="single-character__descr">Language: {language}</p>
        <div className="single-character__price">{price}$</div>
      </div>
      <Link to="/" className="single-character__back">Back to all</Link>
    </div>
  )
}
export default SingleCharacterPage
