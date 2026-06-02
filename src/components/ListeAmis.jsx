import { useEffect } from "react"
import { Link } from "react-router-dom"
import { supabase } from "../supabase"

const ListeAmis = ({amisL, user_id, setAL, setNA, setLoader}) => {

  useEffect(() => {
    const amisL = async () => {
      const { data, error } = await supabase
        .from('amis')
        .select('*')
        .or(`and(sender_uid.eq.${user_id},status.eq.accepted),and(receive_uid.eq.${user_id},status.eq.accepted)`)
        .order('created_at', {ascending: true})
      
      if (error) console.error(error)
      if (data) {
        setAL(data)
        setLoader(false)
        const amisIds = data.map(a => 
            a.sender_uid === user_id ? a.receive_uid : a.sender_uid
        )
        amisIds.push(user_id)

        const { data: nonAmisData } = await supabase
          .from('profiles')
          .select('*')
          .neq('id', user_id)
        
        if (nonAmisData) {
          const filtered = nonAmisData.filter(p => !amisIds.includes(p.id))
          setNA(filtered)
        }
      }
    }
    amisL()
  }, [])

  return (
    <div className="content-amis">
      {amisL.map((a, index) => (
        <div key={index} className="amis-items">
          <div className="nom">
            <div className="amis-icone">{user_id === a.sender_uid ? a.name_receive.slice(0,2).toUpperCase() : a.name_sender.slice(0,2).toUpperCase()}</div>
            {user_id === a.sender_uid ? a.name_receive : a.name_sender}
          </div>
          <div>
            <Link to={`/user/${user_id === a.sender_uid ? a.receive_uid : a.sender_uid}`} className="amis-btn" target="__blank">Voir Liste</Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ListeAmis
