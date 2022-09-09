const RandomChar = () => {
  return (
  <div class="randomchar">
      <div class="randomchar__block">
        {/* <img src="img/thor.jpeg" alt="Random character" class="randomchar__img"> */}
        <div class="randomchar__info">
          <p class="randomchar__name">Thor</p>
          <p class="randomchar__descr">
            As the Norse God of thunder and lightning, Thor wields one of the greatest weapons ever made, the enchanted hammer Mjolnir. While others have described Thor as an over-muscled, oafish imbecile, he's quite smart and compassionate...
          </p>
          <div class="randomchar__btns">
            <a href="#" class="button button__main">
              <div class="inner">homepage</div>
            </a>
            <a href="#" class="button button__secondary">
              <div class="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div class="randomchar__static">
        <p class="randomchar__title">
          Random character for today!<br>
          Do you want to get to know him better?
        </p>
        <p class="randomchar__title">
          Or choose another one
        </p>
        <button class="button button__main">
          <div class="inner">try it</div>
        </button>
        {/* <img src="img/mjolnir.png" alt="mjolnir" class="randomchar__decoration"> */}
      </div>
    </div>
  )
}