import ManhwaList from '../components/ManhwaList'
import { useState, useEffect, useContext } from 'react'
import PopupToast from '../components/PopupToast'
import { ManhwaContext, UserContext } from '../utils/Context'
import { Link } from 'react-router-dom'
import Pasco from '../components/Pasco'
import {useAuth} from '../utils/AuthContext'


function App() {
  //netoyage
  const {user} = useAuth()
  const {setIsUser} = useContext(UserContext)
  const {manhwaList, saveManhwaList} = useContext(ManhwaContext)
  const [ajoutList, setAjoutList] = useState(false)

  useEffect(() => {
    setIsUser(false)
  }, [])

  useEffect(() => {
    if (ajoutList) {
      setTimeout(() => {
        setAjoutList(false)
      }, 2800);
    }
  }, [ajoutList])


  return (
    <>       
      {!user ? <Link to='/account'><Pasco/></Link> 
      : <>
          <ManhwaList 
            manhwaList={manhwaList} 
            updateManhwalist={saveManhwaList} 
            setAjoutList={setAjoutList}
          />
          {ajoutList && <PopupToast manhwaList={manhwaList} msg={"ajouté à la bibliothèque"}/>}
        </>
      }
    </>
  )
}

export default App
