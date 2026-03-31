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
            <div>
                <button onClick={() => connexion(email, mdp)}>Connexion</button>
            </div>
        </div>
    )
}

export default Connexion