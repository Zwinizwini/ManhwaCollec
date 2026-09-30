import '../styles/BtnJeux.css'




const TrailsBtn = () => {
  return (
    <div className='trailsBtn'>
      <div className="gauche">
        <svg viewBox='0 0 4 7' height="24px">
            <linearGradient id="degraderPath" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#675833"/>
              <stop offset="15%" stopColor="#efefc2"/>
              <stop offset="50%" stopColor="#7c7255"/>
              <stop offset="75%" stopColor="#efefc2"/>
              <stop offset="100%" stopColor="#675833"/>
            </linearGradient>
            <linearGradient id="degraderHover" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#857039"/>
              <stop offset="15%" stopColor="#ffffff"/>
              <stop offset="50%" stopColor="#b09559"/>
              <stop offset="75%" stopColor="#ffffff"/>
              <stop offset="100%" stopColor="#857039"/>
            </linearGradient>
            <path d="M 4 0 A 1 1 0 0 0 4 7 V 6 A 1 1 0 0 1 4 1 Z"/>
        </svg>
      </div>
      <div className="centre">
            MANHWA
      </div>
      <div className="droite">
        <svg viewBox='0 0 4 7' height="24px">
            <linearGradient id="degraderPath" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#675833"/>
              <stop offset="15%" stopColor="#efefc2"/>
              <stop offset="50%" stopColor="#7c7255"/>
              <stop offset="75%" stopColor="#efefc2"/>
              <stop offset="100%" stopColor="#675833"/>
            </linearGradient>
            <linearGradient id="degraderHover" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#857039"/>
              <stop offset="15%" stopColor="#ffffff"/>
              <stop offset="50%" stopColor="#b09559"/>
              <stop offset="75%" stopColor="#ffffff"/>
              <stop offset="100%" stopColor="#857039"/>
            </linearGradient>
            <path d="M 0 0 A 1 1 0 0 1 0 7 V 6 A 1 1 0 0 0 0 1 Z"/>
        </svg>
      </div>
    </div>
  )
}

export default TrailsBtn
