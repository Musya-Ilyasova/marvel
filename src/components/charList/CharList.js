import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss'

const CharList = (props) => {
  const [charList, setCharList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(216);
  const [charEnded, setCharEnded] = useState(false);


  const {loading, error, getAllCharacters} = useMarvelService();

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllCharacters(offset)
      .then(onCharListLoaded)
  }

  useEffect(() => {
    onRequest(offset, true);
  }, [])

  const onCharListLoaded = (newCharList) => {
    let ended = false;
    if(newCharList.length < 9) {
      ended = true
    }

    setCharList(charList => [...charList, ...newCharList])
    setNewItemLoading(newItemLoading => false);
    setOffset(offset => offset + 9);
    setCharEnded(charEnded => ended);
  }

  const itemRefs = useRef([]);

  const focusItem = (id) => {
    itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
    itemRefs.current[id].classList.add('char__item_selected');
    itemRefs.current[id].focus();
  }

  function renderItems(arr) {
    const items = arr.map((item, i) => {
      const imgStyle = (item.thumbnail.indexOf('image_not_available') !== -1) ? {objectFit: 'unset'} : null;
      return (
        <CSSTransition
              key={item.id}
              timeout={500}
              classNames="char__item_wrapper"
            >
            <li
                tabIndex={0}
                ref={el => itemRefs.current[i] = el}
                key={item.id}
                onClick={() => {
                  props.onCharSelected(item.id);
                  focusItem(i);
                }}
                onKeyPress={(e) => {
                  if (e.key === ' ' || e.key === "Enter") {
                    props.onCharSelected(item.id);
                    focusItem(i);
                  }
                }}
                className="char__item">
                <img src={item.thumbnail} alt={item.name} style={imgStyle} />
              <div className="char__name">{item.name}</div>
            </li>
        </CSSTransition>
      )
    });
    return (
      <TransitionGroup className='char__grid' >
        {items}
      </TransitionGroup>
    )
  }

  const items = renderItems(charList);

  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading && !newItemLoading ? <Spinner/> : null;
  // const content =  !(loading || error) ? items : null;
  return (
    <div className="char__list">
      {errorMessage}
      {spinner}
      {items}
      {/* {content} */}
      <button
        className="button button__main button__long"
        disabled={newItemLoading}
        style={{'display': charEnded ? 'none' : 'block'}}
        onClick={() => onRequest(offset)}>
        <div className="inner">load more</div>
      </button>
    </div>
  )
}


CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired
}

export default CharList;
