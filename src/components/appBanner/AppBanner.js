import Avangers from '../../resources/img/Avengers.png'
import AvangersLogo from '../../resources/img/Avengers_logo.png'

const AppBanner = () => {
  return (
    <div className="app__banner">
      <img src={Avangers} alt="Avengers"/>
      <div className="app__banner-text">
        New comics every week!
        <br/>
        Stay tuned!
      </div>
      <img src={AvangersLogo} alt="Avengers logo"/>
    </div>
  )
}
export default AppBanner;
