import styled from "styled-components"
import { colors } from "../utils/colors"
import gun from '../assets/gun.gif'

const ImgStyled = styled.img`
    margin-top: 20px;
    width: 95%;
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

const Pasco = () => {
    return <AccountDiv>
        <h1 style={{margin:"0"}}>Ah ouais, t'es pas connecté, tu vas gentillement clicker en haut à droite et te connecter, merci.</h1>
        <ImgStyled src={gun} alt="Rien à voir Chef" id="imgPasCo"/>
    </AccountDiv>
}

export default Pasco