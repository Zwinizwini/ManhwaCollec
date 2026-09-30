import '../styles/Banner.css'
import CC from '../assets/CC.png'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import {colors} from '../utils/colors'
import { useAuth } from '../utils/AuthContext'
import { useState } from 'react'
import livre from '../assets/livre.png'
import accueil from '../assets/accueil.png'
import account from '../assets/utilisateur.png'
import stat from '../assets/statistique.png'
import metaphore from '../assets/Metaphore.png'
import TrailsBtn from './TrailsBtn'

const StyledLink = styled(Link)`
  font-size: 2em;
  font-weight: bold;
  color: white;
  margin-left: 20px;
`

const AccountLink = styled(Link)`
  border-radius: 50%;
  background: #1c1f27;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  border: 1px solid ${colors.violet};
  color: white;
  &:hover {
    background-color: ${colors.violet};
  }
`

const ManhwaBtn = styled(Link)`
  font-size: 13px;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
  transition: all .15s, transform .1s;
  &:hover {
    color: #fff;
  }

  &:active { transform: scale(0.95); }
`

const StatBtn = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  transform: scaleY(0.55);
  letter-spacing: -0.04em;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
  width: 100px;
  height: 42px;
  transition: all .2s, transform .1s;
  &:hover {
    color: #fff;
  }
  &:hover img {
    filter: brightness(100%);
  }

  & img {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    transition: all .2s ease-in-out;
    filter: brightness(70%);
  }

  &:active { transform: scale(0.95); }
`

const Banner = () => {
    const {user} = useAuth()
    const navigate = useNavigate()
    const [titre, setTitre] = useState('')
    const [tailleCC, setCC] = useState(0)
    const [menu, setMenu] = useState(false)
    

    const initialPseudo = () => {
        return user ? user.user_metadata.pseudo.slice(0,2).toUpperCase() : "MC"
    }

    const redirection = () =>{
      setMenu(false)
      const url = encodeURIComponent(titre)
      navigate(`/search/${url}?page=1`)
    }

    return (
    <div className="banner">
        <StyledLink to='/' id="bannerNom" onClick={() => setMenu(false)}>Manhwa<span id='violet'>Collec</span></StyledLink>
        <img src={CC} alt="tkt" className='CC' id='cc' style={{transform: `translate(-50%) scale(${1+tailleCC*0.5})`}} onClick={() => setCC(prec => prec+1)}/>
        
        {/* Menu PC */}
        <nav className='PC'>
            <label className="bannerSearch">
              <input type="text" 
                id="search"
                onChange={(e) => setTitre(e.target.value)}
                value={titre}
                onKeyDown={(e) => e.key === 'Enter' && redirection()}
                placeholder='Search Manhwa'
              />
              <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
                <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </label>
            <Link to='/manhwa-liste?page=1' className='trailsBtn'><TrailsBtn/></Link>
            <StatBtn to='/stat' className='stat-link'>
              <img src={metaphore} alt="meta"/>
              STAT
            </StatBtn>
            <AccountLink to="/account" id="bannerAccount">{initialPseudo()}</AccountLink>

        </nav>

        {/* Btn activation menu telephone */}
        <nav className='phone'>
          <label className="btnPhone">
            <div></div>
            <input type="checkbox" name="btnPhone" 
            id="btnPhone" onChange={(e) => setMenu(e.target.checked)}
            checked={menu}
            />
          </label>

          {/* Menu de telephone */}
          <div className='navPhone'>
            <Link to={'/'} onClick={() => setMenu(false)}>
              <img src={accueil} alt="img accueil"/>
              Accueil
            </Link>
            <Link to='/manhwa-liste?page=1' onClick={() => setMenu(false)}>
              <img src={livre} alt="img livre"/>
              MANHWA
            </Link>
            <Link to='/stat' onClick={() => setMenu(false)}>
                <img src={stat} alt="img stat"/>
                Stat
            </Link>
            <Link to="/account" className='pseudo' onClick={() => setMenu(false)}>
              <img src={account} alt="img compte"/>
              {user? <span>{user.user_metadata.pseudo}</span> : <span>compte</span>}
            </Link>
            <label className="bannerSearch">
              <input type="text" 
                id="search"
                onChange={(e) => setTitre(e.target.value)}
                value={titre}
                onKeyDown={(e) => e.key === 'Enter' && redirection()}
                placeholder='Search Manhwa'
              />
            </label>
          </div>
        </nav>
    </div>
)


}

export default Banner