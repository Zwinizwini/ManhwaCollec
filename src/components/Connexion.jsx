import { useState } from "react"
import { supabase } from "../supabase"
import "../styles/Account.css"

const connexion = async (email, mdp) => {
    const {data, error} = await supabase.auth.signInWithPassword({
        email: email,
        password: mdp
    })
    if (error) console.error(error)
    return data
}

// const forgotPassword = async (email) => {
//     const urlSite = import.meta.env.VITE_URL_ID
//     const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
//         redirectTo: `${urlSite}account/update-password`,
//     })
//     if (error) console.log (error)
//     return data
// }


const Connexion = () => {
    const [email, setEmail] = useState("")
    const [mdp, setMdp] = useState("")

    return (
        <div className="compte-body">
            <label>
                Email
                <input type="text" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
            </label>
            <label>
                Mot de passe
                <input type="password" value={mdp} placeholder="Mot de passe" onChange={(e) => setMdp(e.target.value)}/>
            </label>
            {/* <button onClick={() => forgotPassword(email)}>mdp perdu</button> */}
            <button onClick={() => connexion(email, mdp)}>Connexion</button>
        </div>
    )
}

export default Connexion