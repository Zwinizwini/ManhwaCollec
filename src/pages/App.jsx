import ManhwaList from '../components/ManhwaList'
import { useEffect, useContext } from 'react'
import PopupToast from '../components/PopupToast'
import { AjoutListContext, ManhwaContext, UserContext } from '../utils/Context'
import { Link } from 'react-router-dom'
import Pasco from '../components/Pasco'
import {useAuth} from '../utils/AuthContext'
import Audio from '../components/Audio'
import uwu from '../assets/uwu.mp3'




function App() {
  //netoyage
  const {user} = useAuth()
  const {setIsUser} = useContext(UserContext)
  const {manhwaList, saveManhwaList} = useContext(ManhwaContext)
  const {ajoutList} = useContext(AjoutListContext)


  useEffect(() => {
    setIsUser(false)
    document.title = 'ManhwaCollec'
  }, [])


  return (
    <>   
      {!user ? <Link to='/account'><Pasco/></Link> 
      : <>
           
          <ManhwaList 
            manhwaList={manhwaList} 
            updateManhwalist={saveManhwaList} 
          />
          {ajoutList && <>
            <PopupToast msg={"ajouté à la bibliothèque"}/>
            <Audio isPlaying={ajoutList} audio={uwu}/>
          </>
          }
        </>
      }
    </>
  )
}

export default App
