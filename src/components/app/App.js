import AppHeader from '../appHeader/AppHeader' 
import RandomChar from '../randomChar/RandomChar'
import CharList from '../charList/CharList'
import CharInfo from '../chaiinfo/Charinfo'

import Vision from '../../resources/img/vision.png'

const App = () => {
  return (
    <div className='app'>
      <AppHeader/>
      <main>
        <RandomChar/>
        <div className="char__content">
          <CharList/>
          <CharInfo/>
        </div>
        <img src={Vision} alt="Vision" className='bd-decoration'/>
      </main>
    </div>
  )
}

export default App;
