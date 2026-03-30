import ManhwaList from '../components/ManhwaList'
import { useState, useEffect, useContext } from 'react'
import PopupToast from '../components/PopupToast'
import { ManhwaContext } from '../utils/Context'
import { supabase } from '../supabase'
import { Link } from 'react-router-dom'
import Pasco from '../components/Pasco'
import {useAuth} from '../utils/AuthContext'


function App() {
  //netoyage
  const {user} = useAuth()
  const {manhwaList, saveManhwaList} = useContext(ManhwaContext)
  const [ajoutList, setAjoutList] = useState(false)

  useEffect(() => {
    if (ajoutList) {
      setTimeout(() => {
        setAjoutList(false)
      }, 3000);
    }
  }, [ajoutList])


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
      const getManhwas = async () => {
          const { data, error } = await supabase
              .from('manhwas')
              .select('*')
          
          if (error) console.error(error)
          if (data) {
              const trieLocal = localStorage.getItem("trier")
              trier(trieLocal ? JSON.parse(trieLocal) : "0", data)
          }
      }
      getManhwas()
  }, [user])
  

  return (
    <>       
      {!user ? <Link to='/account'><Pasco/></Link> 
      : <>
          <ManhwaList 
            manhwaList={manhwaList} 
            updateManhwalist={saveManhwaList} 
            setAjoutList={setAjoutList}
            user={user}
          />
          {ajoutList && <PopupToast manhwaList={manhwaList}/>}
        </>
      }
    </>
  )
}

export default App
