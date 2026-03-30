import styled from 'styled-components'
import {colors} from '../utils/colors'
import { useState } from 'react'
import Inscription from '../components/Inscription'
import Connexion from '../components/Connexion'

const AccountDiv = styled.div`
    width: 600px;
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

const BtnHead = styled.button`
    background-color: ${({connexion}) =>
        connexion ? colors.violet : '#23262c'};
    color: ${({connexion}) =>
        connexion ? 'white' : '#888'};
    border-radius: 10px;
    width: 100px;
    height: 30px;
    border: 1px solid ${({connexion}) =>
        connexion ? colors.violet : '#888'};
    margin-left: 10px;
    margin-right: 10px;
    cursor: pointer;
`

const DivStyle = styled.div`
    width: 500px;
    margin-top: 20px;
`   



const Account = () => {
    const [connexion, setConnexion] = useState(true)

    return <AccountDiv>
        <h1 style={{margin:"0", color:"white"}}>Manhwa<span id="violet">Collec</span></h1>
        <DivStyle>
            <BtnHead connexion={connexion} onClick={() => setConnexion(true)}>Connexion</BtnHead>
            <BtnHead connexion={!connexion} onClick={() => setConnexion(false)}>Inscription</BtnHead>
            {connexion ? <Connexion />
            : <Inscription />
            }
        </DivStyle>
    </AccountDiv>
}

export default Account