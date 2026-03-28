import '../styles/Banner.css'
import CC from '../assets/CC.png'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {colors} from '../utils/colors'

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
    return (
    <div className="banner">
        <StyledLink to='/'>Manhwa<span id='violet'>Collec</span></StyledLink>
        <img src={CC} alt="tkt" className='CC'/>
        <AccountLink to="/account">ZW</AccountLink>
    </div>
)


}

export default Banner