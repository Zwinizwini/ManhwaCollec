import { useContext, useEffect, useState } from 'react'
import ManhwaList from '../components/ManhwaList'
import { useParams } from 'react-router-dom'
import { supabase } from '../supabase'
import { UserContext } from '../utils/Context'


function User() {
    const [manhwaList, saveManhwaList] = useState([])
    const {id} = useParams()
    const {setIsUser} = useContext(UserContext)

    const trier = (e, data) => {
        if (e === "1") {  
            saveManhwaList(data.toSorted((a,b) => {
                const noteA = a.note ? a.note : 0
                const noteB = b.note ? b.note : 0
                if (noteA < noteB) return 1
                if (noteA > noteB) return -1
                return 0
            }))
        } else if (e === "2") {
            saveManhwaList(data.toSorted((a,b) => {
                const noteA = a.note ? a.note : 0
                const noteB = b.note ? b.note : 0
                if (noteA < noteB) return -1
                if (noteA > noteB) return 1
                return 0
            }))
        } else {
            saveManhwaList(data)
        }
    }

    useEffect(() => {
        const fetchManhwa = async () => {
            const {data,error} = await supabase
                .from('manhwas')
                .select('*')
                .eq('user_id', id)
                .order('status', {ascending: true})
            if (error) console.error(error)
            if (data) {
                const trieLocal = localStorage.getItem("trier")
                trier(trieLocal ? JSON.parse(trieLocal) : "0", data)
            }
        }
        setIsUser(true)
        fetchManhwa()
    }, [])


  return (
    <>       
        <ManhwaList 
        manhwaList={manhwaList} 
        updateManhwalist={saveManhwaList}
        />
    </>
  )
}

export default User
