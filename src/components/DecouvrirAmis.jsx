import { supabase } from "../supabase"
import { useEffect, useState } from "react"




const DecouvrirAmis = ({nonAmis, user}) => {
    const [amisEnvoie, setAE] = useState([])

    useEffect(() => {
        const amisR = async () => {
            const { data, error } = await supabase
                .from('amis')
                .select('receive_uid')
                .eq('sender_uid', user.id)
                .eq('status', 'pending')
            
            if (error) console.error(error)
            if (data) {
                const ids = data.map(i => i.receive_uid)
                setAE(ids)
            }
        }
        amisR()
    },[])

    const ajoutAmis = async (user, receive_uid, receive_name) => {
        const amisRequest = {
            sender_uid: user.id,
            name_sender: user.user_metadata.pseudo,
            receive_uid: receive_uid,
            name_receive: receive_name,
            status: 'pending'
        }
        const { data, error } = await supabase
            .from('amis')
            .insert(amisRequest)
            .select('receive_uid')
            .single()
        
        if (error) console.error(error) 
        if (data) {
            setAE([...amisEnvoie, data.receive_uid])
            alert(`Demande d'envoyé à ${receive_name}`)
        }
    }

    return (
        <div className="content-amis">
            {nonAmis.map((a, index) => (
                <div key={index} className="amis-items">
                    <div className="nom">
                        <div className="amis-icone">{a.pseudo.slice(0,2).toUpperCase()}</div>
                        {a.pseudo}
                    </div>
                    <button onClick={() => ajoutAmis(user, a.id, a.pseudo)} disabled={amisEnvoie.includes(a.id)} className="amis-btn">+ Ajouter</button>
                </div>
            ))}
        </div>

    )
}

export default DecouvrirAmis
