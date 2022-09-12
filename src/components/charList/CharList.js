import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss'

class CharList extends Component {
  state = {
    chars: [],
    loading: true
  }

  marvelService = new MarvelService();

  componentDidMount() {
    this.updateChars();
  }

  onCharsLoaded = (chars) => {
    this.setState({
      chars,
      loading: false,
      error: false
    })
  }
  updateChars = () => {
    this.marvelService
        .getAllCharacters()
        .then(this.onCharsLoaded)
        .catch(this.onError)
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
        <li key={item.id} className="char__item">
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
    const {chars, loading, error} = this.state;
    const items = this.renderItems(chars);
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content =  !(loading || error) ? items : null;
    
    // console.log(content)
    return (
      <div className="char__list">
        <ul className="char__grid">
          {errorMessage}
          {spinner}
          {content}
        </ul>
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    )
  }
}

export default CharList;