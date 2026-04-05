import { useState } from "react"
import { supabase } from "../supabase"
import "../styles/Account.css"

const inscription = async (email, mdp, pseudo) => {
    const {data, error} = await supabase.auth.signUp({
        email: email,
        password: mdp,
        options: {
            data: {
                pseudo: pseudo
            }
        }
    })
    if (error) console.error(error)
    alert(`Email de confirmation envoyé à l'adress mail : ${email}`)
    return data
}

const Inscription = () => {
    const [email, setEmail] = useState("")
    const [mdp, setMdp] = useState("")
    const [pseudo, setPseudo] = useState("")
    const [cmdp, setCMdp] = useState("")
    const [emailCorrect, setCorrect] = useState(false)
    const [mdpCorrect, setMdpCorrect] = useState(false)

    const verifEmail = (email) => {
        const emailValide = /.+@.+\..+/
        const valide = emailValide.test(email)
        setCorrect(valide)
    }

    const verifMdp = (mdp1, mdp2) => {
        const valide = mdp1 === mdp2
        setMdpCorrect(valide)
    }

    return (
        <div className="compte-body">
            <label>
                Pseudo
                <input type="text" value={pseudo} placeholder="Pseudo" onChange={(e) => setPseudo(e.target.value)}/>
            </label>
            <label>
                Email
                <input type="text" value={email} placeholder="Email" 
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={(e) => verifEmail(e.target.value)}
                />
            </label>
            <label>
                Mot de passe
                <input type="password" value={mdp} placeholder="Mot de passe" onChange={(e) => setMdp(e.target.value)}/>
            </label>
            <label>
                Confirmer le mot de passe
                <input type="password" value={cmdp} placeholder="Mot de passe" 
                onChange={(e) => setCMdp(e.target.value)}
                onBlur={(e) => verifMdp(e.target.value, mdp)}/>
            </label>
            <button disabled={!mdpCorrect || !emailCorrect} onClick={() => inscription(email, mdp, pseudo)} id="btnInscr">Inscription</button>
        </div>
    )
}

export default Inscription