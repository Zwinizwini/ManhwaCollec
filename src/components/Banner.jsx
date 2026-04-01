import '../styles/Banner.css'
import CC from '../assets/CC.png'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {colors} from '../utils/colors'
import { useAuth } from '../utils/AuthContext'

const StyledLink = styled(Link)`
    font-size: 2em;
    font-weight: bold;
    color: white;
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

const Banner = () => {
    const {user} = useAuth()

    const initialPseudo = () => {
        return user ? user.user_metadata.pseudo.slice(0,2).toUpperCase() : "ZW"
    }

    return (
    <div className="banner">
        <StyledLink to='/' id="bannerNom">Manhwa<span id='violet'>Collec</span></StyledLink>
        <img src={CC} alt="tkt" className='CC'/>
        <AccountLink to="/account" id="bannerAccount">{initialPseudo()}</AccountLink>
    </div>
)


}

export default Banner