import {useState} from 'react'
import { Helmet } from 'react-helmet'
import RandomChar from '../randomChar/RandomChar'
import CharList from '../charList/CharList'
import CharInfo from '../charInfo/CharInfo'
import ErrorBoundary from '../errorBoundary/ErrorBoundary'
import CharSearchForm from '../charSearchForm/CharSearchForm'
import Vision from '../../resources/img/vision.png'

const MainPage = () => {
  const [selectedChar, setCrat] = useState(null)


  const onCharSelected = (id) => {
    setCrat(id);
  }
  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Marvel information portal"
        />

        <title>Marvel </title>

      </Helmet>
      <ErrorBoundary>
        <RandomChar/>
      </ErrorBoundary>
      <div className="char__content">
        <ErrorBoundary>
          <CharList onCharSelected = {onCharSelected}/>
        </ErrorBoundary>
        <div>
          <ErrorBoundary>
            <CharInfo charId={selectedChar}/>
          </ErrorBoundary>
          <ErrorBoundary>
            <CharSearchForm/>
          </ErrorBoundary>
        </div>
      </div>
      <img src={Vision} alt="Vision" className="bg-decoration"/>
    </>
  )
}

export default MainPage
