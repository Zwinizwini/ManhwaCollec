import WIP from '../assets/WIP.gif'
import styled from 'styled-components'
import {colors} from '../utils/colors'

const ImgStyled = styled.img`
    margin-top: 20px;
`

const AccountDiv = styled.div`
    width: 80%;
    margin: auto;
    margin-top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    color: #888;
    background-color: ${colors.fondElem};
    padding: 20px;
    border: 1px solid ${colors.violet};
    border-radius: 20px;
`

const Account = () => {
    return <AccountDiv>
        <h1 style={{margin:"0"}}>Laisse moi tranquille Chacal, je sais pas encore comment faire avec React pour faire les comptes</h1>
        <ImgStyled src={WIP} alt="Rien à voir Chef" />
    </AccountDiv>
}

export default Account