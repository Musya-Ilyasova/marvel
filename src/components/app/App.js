import { useState } from 'react'

import AppHeader from '../appHeader/AppHeader'
import RandomChar from '../randomChar/RandomChar'
import CharList from '../charList/CharList'
import CharInfo from '../charInfo/CharInfo'
import ErrorBoundary from '../errorBoundary/ErrorBoundary'
import Vision from '../../resources/img/vision.png'

import './app.scss'

const App = () => {

  const [selectedChar, setCrat] = useState(null)


  const onCharSelected = (id) => {
    setCrat(id);
  }

  return (
    <div className="app">
      <AppHeader/>
      <main>
        <ErrorBoundary>
          <RandomChar/>
        </ErrorBoundary>
        <div className="char__content">
          <ErrorBoundary>
            <CharList onCharSelected = {onCharSelected}/>
          </ErrorBoundary>
          <ErrorBoundary>
            <CharInfo charId={selectedChar}/>
          </ErrorBoundary>
        </div>
        <img src={Vision} alt="Vision" className="bg-decoration"/>
      </main>
    </div>
  )
}
export default App;
