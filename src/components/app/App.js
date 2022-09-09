import AppHeader from '../appHeader/AppHeader' 
import RandomChar from '../randomChar/RandomChar'
import CharList from '../charList/CharList'
import CharInfo from '../charInfo/CharInfo'

import Vision from '../../resources/img/vision.png'

import './app.scss'

const App = () => {
  return (
    <div className="app">
      <AppHeader/>
      <main>
        <RandomChar/>
        <div className="char__content">
          <CharList/>
          <CharInfo/>
        </div>
        <img src={Vision} alt="Vision" className="bg-decoration"/>
      </main>
    </div>
  )
}

export default App;
