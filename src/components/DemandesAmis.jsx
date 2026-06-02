import { useEffect } from "react"
import { supabase } from "../supabase"


const DemandesAmis = ({amisR, setAR, user_id, setLoader}) => {

  useEffect(() => {
    const amisR = async () => {
      const { data, error } = await supabase
        .from('amis')
        .select('*')
        .eq('receive_uid', user_id)
        .eq('status', 'pending')
        .order('created_at', {ascending: true})
      
      if (error) console.error(error)
      if (data) {
        setAR(data)
        setLoader(false)
      }
    }
    amisR()
  }, [])

  const handleAccept = async (sender_uid) => {
    const { error } = await supabase
      .from('amis')
      .update({
        status: "accepted"
      })
      .eq('sender_uid', sender_uid)
      .eq('receive_uid', user_id)

    if (error) console.error(error)
    setAR(prevAR => prevAR.filter(user => user.sender_uid !== sender_uid));
  }

  const handleRefuse = async (sender_uid) => {
    const { error } = await supabase
      .from('amis')
      .delete()
      .eq('sender_uid', sender_uid)
      .eq('receive_uid', user_id)

    if (error) console.error(error)
    setAR(prevAR => prevAR.filter(user => user.sender_uid !== sender_uid));
  }

  return (
    <div className="content-amis">
      {amisR.map((request, index) => (
        <div key={index} className="amis-items">
          <div className="nom">
            <div className="amis-icone">{request.name_sender.slice(0,2).toUpperCase()}</div>
            {request.name_sender}
          </div>
          <div className="amis-btndiv">
            <button onClick={() => handleAccept(request.sender_uid)} className="amis-btnAccept">✓</button>
            <button onClick={() => handleRefuse(request.sender_uid)} className="amis-btnRefuse">✕</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DemandesAmis
