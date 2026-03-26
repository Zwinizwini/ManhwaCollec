import ManhwaList from '../components/ManhwaList'
import { useState, useEffect, useContext } from 'react'
import PopupToast from '../components/PopupToast'
import { ManhwaContext } from '../utils/Context'

function App() {
  const {manhwaList, saveManhwaList} = useContext(ManhwaContext)
  const [ajoutList, setAjoutList] = useState(false)

  useEffect(() => {
    if (ajoutList) {
      setTimeout(() => {
        setAjoutList(false)
      }, 3000);
    }
  }, [ajoutList])

  useEffect(() => {
      const manhwaListString = JSON.stringify(manhwaList)
      localStorage.setItem('manhwaList', manhwaListString)
  }, [manhwaList])
  

  return (
    <>      
      <ManhwaList 
        manhwaList={manhwaList} 
        updateManhwalist={saveManhwaList} 
        setAjoutList={setAjoutList}
      />
      {ajoutList && <PopupToast manhwaList={manhwaList}/>}
    </>
    
  )
}

export default App
