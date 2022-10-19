import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { Link } from 'react-router-dom';

import './comicsList.scss'

const ComicsList = () => {
  const [comicsList, setComicsList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [comicsEnded, setComicsEnded] = useState(false);
  const [offset, setOffset] = useState([900]);
  const {loading, error, getAllComics} = useMarvelService();

  useEffect(() => {
    onRequest(offset);
  }, [])

  const onRequest = () => {
    getAllComics(offset)
      .then(onComicsListLoaded);
  }


  const onComicsListLoaded = (newComicsList) => {
    let ended = false;
    if(newComicsList.length < 8) {
      ended = true
    }
    setComicsList(comicsList => [...comicsList, ...newComicsList])
    setNewItemLoading(newItemLoading => false);
    setOffset(offset => offset + 8);
    setComicsEnded(comicsEnded => ended);
  }

  function renderItems(arr) {
    const items = arr.map(item => {
      const imgStyle = (item.thumbnail.indexOf('image_not_available') !== -1) ? {objectFit: 'unset'} : null;
      return (
        <li
          tabIndex={0}
          key={item.id}
          className="comics__item">
          <Link to={`/comics/${item.id}`}>
            <img src={item.thumbnail} alt={item.title} className="comics__item-img" style={imgStyle}/>
            <div className="comics__item-name">{item.title}</div>
            <div className="comics__item-price">{item.price}$</div>
          </Link>
        </li>
      )
    })
    return (
      <ul className='comics__grid' >
        {items}
      </ul>
    )
  }

  const items = renderItems(comicsList);

  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading && !newItemLoading ? <Spinner/> : null;

  return (
    <div className="comics__list">
      {errorMessage}
      {spinner}
      {items}
      <button className="button button__main button__long" onClick={()=> onRequest()}>
        <div className="inner">load more</div>
      </button>
    </div>
  )
}
export default ComicsList
