import ManhwaList from './components/ManhwaList'
import { useState, useEffect } from 'react'
import PopupToast from './components/PopupToast'

function App() {
  const manhwaListStorage = localStorage.getItem("manhwaList")
  const [manhwaList, updateManhwalist] = useState(manhwaListStorage ? JSON.parse(manhwaListStorage) : [])
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
        updateManhwalist={updateManhwalist} 
        setAjoutList={setAjoutList}
      />
      {ajoutList && <PopupToast manhwaList={manhwaList}/>}
    </>
    
  )
}

export default App
