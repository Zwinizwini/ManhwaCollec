import ManhwaList from '../components/ManhwaList'
import { useState, useEffect, useContext } from 'react'
import PopupToast from '../components/PopupToast'
import { ManhwaContext } from '../utils/Context'
import { supabase } from '../supabase'
import { Link } from 'react-router-dom'
import Pasco from '../components/Pasco'


function App() {
  //netoyage
  const {manhwaList, saveManhwaList} = useContext(ManhwaContext)
  console.log(manhwaList)
  const [ajoutList, setAjoutList] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (ajoutList) {
      setTimeout(() => {
        setAjoutList(false)
      }, 3000);
    }
  }, [ajoutList])

  useEffect(() => {
    supabase.auth.getUser().then(({data: {user}}) => {
      setUser(user)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
      }
    )
    return () => subscription.unsubscribe()
  }, [])

  const addManhwa = async (manhwa) => {
    const { data, error } = await supabase
        .from('manhwas')
        .insert(manhwa)
    
    if (error) console.error(error)
    return data
  }

  const rajouterLocalStorage = () => {
    const data = JSON.parse(localStorage.getItem('manhwaList'))
    const localList = data.map(({ id, ...manhwa }) => {
      let dateISO
      if (manhwa.lastRead) {
        const [day, month, year] = manhwa.lastRead.split('/')
        dateISO = new Date(`${year}-${month}-${day}`).toISOString()
      }
      return {
      ...manhwa,
      user_id: user.id,
      chapter: parseInt(manhwa.chapter),
      maxChapter: parseInt(manhwa.maxChapter),
      lastRead: dateISO
      }
    })
    localList.forEach((element) => {
      addManhwa(element)
    });
  }


  

  return (
    <>       
      {!user ? <Link to='/account'><Pasco/></Link> 
      : <>
          <button onClick={() => rajouterLocalStorage()}>Rajouter le localStorage à la BDD</button>
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
