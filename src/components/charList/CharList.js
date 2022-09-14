import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss'

class CharList extends Component {
  state = {
    chars: [],
    loading: true,
    error: false,
    newItemLoading: false,
    offset: 210
  }

  marvelService = new MarvelService();

  componentDidMount() {
    this.onRequest();
  }

  onRequest = (offset) => {
    this.onCharsLoading();
    this.marvelService.getAllCharacters(offset)
      .then(this.onCharsLoaded)
      .catch(this.onError)
  }

  onCharsLoading = () => {
    this.setState({
      newItemLoading: true
    })
  }

  onCharsLoaded = (newChars) => {
    this.setState(({offset, chars}) => ({
      chars: [...chars, ...newChars],
      loading: false,
      error: false,
      newItemLoading: false,
      offset: offset + 9
    }))
  }

  onError = () => {
    this.setState({
      loading: false,
      error: true
    })
  }

  renderItems(arr) {
    const items = arr.map((item) => {
      const imgStyle = (item.thumbnail.indexOf('image_not_available') !== -1) ? {objectFit: 'unset'} : null;
      return (
        <li key={item.id}
            onClick={() => this.props.onCharSelected(item.id)}
        className="char__item">
            <img src={item.thumbnail} alt={item.name} style={imgStyle} />
          <div className="char__name">{item.name}</div>
        </li>
      )
    });
    return (
      <ul className='char__grid'>
        {items}
      </ul>
    )
  }


  render () {
    const {chars, loading, error, offset, newItemLoading} = this.state;
    const items = this.renderItems(chars);
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content =  !(loading || error) ? items : null;
    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        {content}
        <button 
          className="button button__main button__long"
          disabled={newItemLoading}
          onClick={() => this.onRequest(offset)}>
          <div className="inner">load more</div>
        </button>
      </div>
    )
  }
}

export default CharList;
