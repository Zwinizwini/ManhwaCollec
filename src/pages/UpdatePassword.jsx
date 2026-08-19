import { useState } from "react";
import { supabase } from "../supabase";


const UpdatePassword = () => {
    const [mdp, setMDP] = useState('')
    const [msg, setMSG] = useState('')
    const [mdpVerif, setMDP2] = useState('')

    const verifMDP = (e) =>{
        e.preventDefault()
        mdp === mdpVerif ? handleUpdate(e) : setMSG('Les mots de passe ne sont pas identiques')
    }

    const handleUpdate = async () => {
        
        const {error} = await supabase.auth.updateUser({
            password: mdp
        })
        if (error) setMSG(`Erreur: ${error.message}`)
        else setMSG('Mot de passe modifié avec succès')
    }

    return (
        <form onSubmit={verifMDP}>
            <h2>Nouveau mot de passe</h2>
            <input 
                type="password" 
                value={mdp} 
                onChange={(e) => setMDP(e.target.value)} 
                placeholder="Entre ton nouveau mot de passe"
                required
            />
            <input 
                type="password" 
                value={mdpVerif} 
                onChange={(e) => setMDP2(e.target.value)} 
                placeholder="Entre ton nouveau mot de passe"
                required
            />
            <button type="submit">Valider</button>
            {msg && <p>{msg}</p>}
        </form>
    )
}

export default UpdatePassword