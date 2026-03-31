import { useContext, useEffect, useState } from 'react'
import ManhwaList from '../components/ManhwaList'
import { useParams } from 'react-router-dom'
import { supabase } from '../supabase'
import { UserContext } from '../utils/Context'


function User() {
    const [manhwaList, saveManhwaList] = useState([])
    const {id} = useParams()
    const {setIsUser} = useContext(UserContext)

    useEffect(() => {
        const fetchManhwa = async () => {
            const {data,error} = await supabase
                .from('manhwas')
                .select('*')
                .eq('user_id', id)
                .order('status', {ascending: true})
            if (error) console.error(error)
            if (data) {
                saveManhwaList(data)
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
