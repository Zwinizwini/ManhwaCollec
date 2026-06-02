import { useState } from "react"
import { useAuth } from "../utils/AuthContext"
import ListeAmis from "./ListeAmis"
import DemandesAmis from "./DemandesAmis"
import DecouvrirAmis from "./DecouvrirAmis"


const Amis = () => {
    const [amisList, setAL] = useState([])
    const [amisRequest, setAR] = useState([])
    const [nonAmis, setNA] = useState([])
    const {user} = useAuth()
    const [onglet, setOnglet] = useState(0)
    const [loader, setLoader] = useState(true)

    return (
        <div className="amisMenu">
            <div className="en-tete">
                <label>
                    <input type="radio" name="radioAmis" value={0} onChange={() => setOnglet(0)} defaultChecked/> Amis
                </label>
                <label>
                    <input type="radio" name="radioAmis" value={1} onChange={() => setOnglet(1)}/> Demande
                </label>
                <label>
                    <input type="radio" name="radioAmis" value={2} onChange={() => setOnglet(2)}/> Découvrir
                </label>
            </div>
            {loader && <div className="loader-space"></div>}
            {onglet === 0 && <ListeAmis amisL={amisList} user_id={user.id} setAL={setAL} setNA={setNA} setLoader={setLoader}/>}
            {onglet === 1 && <DemandesAmis amisR={amisRequest} user_id={user.id} setAR={setAR} setLoader={setLoader}/>}
            {onglet === 2 && <DecouvrirAmis nonAmis={nonAmis} user={user}/>}
        </div>
    )
}

export default Amis
