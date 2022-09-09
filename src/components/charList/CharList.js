import './charList.scss'
import Abyss from '../../resources/img/abyss.jpg'

const CharList = () => {
  return (
    <div class="char__list">
      <ul class="char__grid">
        <li class="char__item">
           <img src={Abyss} alt="abyss" />
          <div class="char__name">Abyss</div>
        </li>
        <li class="char__item char__item_selected">
           <img src={Abyss} alt="abyss" />
          <div class="char__name">Abyss</div>
        </li>
        <li class="char__item">
           <img src={Abyss} alt="abyss" />
          <div class="char__name">Abyss</div>
        </li>
        <li class="char__item">
           <img src={Abyss} alt="abyss" />
          <div class="char__name">Abyss</div>
        </li>
        <li class="char__item">
           <img src={Abyss} alt="abyss" />
          <div class="char__name">Abyss</div>
        </li>
        <li class="char__item">
           <img src={Abyss} alt="abyss" />
          <div class="char__name">Abyss</div>
        </li>
        <li class="char__item">
           <img src={Abyss} alt="abyss" />
          <div class="char__name">Abyss</div>
        </li>
        <li class="char__item">
           <img src={Abyss} alt="abyss" />
          <div class="char__name">Abyss</div>
        </li>
        <li class="char__item">
           <img src={Abyss} alt="abyss" />
          <div class="char__name">Abyss</div>
        </li>
      </ul>
      <button class="button button__main button__long">
        <div class="inner">load more</div>
      </button>
    </div>
  )
};

export default CharList;