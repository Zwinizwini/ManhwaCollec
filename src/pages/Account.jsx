import styled from 'styled-components'
import {colors} from '../utils/colors'
import { useContext, useState } from 'react'
import Inscription from '../components/Inscription'
import Connexion from '../components/Connexion'
import { useAuth } from '../utils/AuthContext'
import { supabase } from '../supabase'
import { ManhwaContext } from '../utils/Context'
import '../styles/Account.css'

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

const DivIni = styled.div`
    width: 50px;
    height: 50px;
    border: 2px solid ${colors.violet};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #26215C;
    color: #AFA9EC;
    font-size: 25px;
    padding: 5px;
`
const DivProfil = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const DivManhwa = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
    gap: 30px;
    border-top: 1px solid #666;
    border-bottom: 1px solid #666;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
`

const HManhwa = styled.h3`
    margin: 0;
    color: white;
    ${(props) =>
        props.$isNote &&
        `color: #ef9f27`}
`

const deconnexion = async () => {
    await supabase.auth.signOut()
}

const noteMoyenne = (manhwaList) => {
    let noteTotal = 0
    let nbNote = 0
    manhwaList.forEach(({note}) => {
        if (note) {
            nbNote++
            noteTotal+=note
        }
    })
    return noteTotal > 0 && nbNote > 0 ? (noteTotal/nbNote).toFixed(2) : 0
}


const Account = () => {
    const [connexion, setConnexion] = useState(true)
    const {user} = useAuth()
    const {manhwaList} = useContext(ManhwaContext)
    const note = noteMoyenne(manhwaList)

    const copieURL = () => {
        const urlSite = import.meta.env.VITE_URL_ID
        navigator.clipboard.writeText(`${urlSite}user/${user.id}`)
        alert('Liste copié')
    }   

    return <AccountDiv className='compte'>
        {user ? 
            <DivProfil>
                <DivIni>{user.user_metadata.pseudo.slice(0,2).toUpperCase()}</DivIni>
                <div style={{marginTop: "15px", marginBottom: "15px"}}>
                    <h2 style={{margin:0, color: "white"}}>{user.user_metadata.pseudo}</h2>
                    <p style={{fontSize: "12px", margin:0}}>{user.email}</p>
                </div>
                <DivManhwa>
                    <div>
                        <HManhwa>{manhwaList.length}</HManhwa>
                        <p style={{fontSize: "12px", margin:0}}>Total</p>
                    </div>
                    {note !== 0 && 
                    <div>
                        <HManhwa $isNote>{note}</HManhwa>
                        <p style={{fontSize: "12px", margin:0}}>Note moy.</p>
                    </div>
                    }
                </DivManhwa>
                <button className="btnDeco" onClick={() => copieURL()}>Partager Liste</button>
                <button className="btnDeco" onClick={() => deconnexion()}>Deconnexion</button>
            </DivProfil> 
        : 
            <DivStyle>
                <BtnHead connexion={connexion} onClick={() => setConnexion(true)}>Connexion</BtnHead>
                <BtnHead connexion={!connexion} onClick={() => setConnexion(false)}>Inscription</BtnHead>
                {connexion ? <Connexion />
                : <Inscription />
                }
            </DivStyle>
        }
    </AccountDiv>
}

export default Account