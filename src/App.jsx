import Banner from './components/Banner'
import ManhwaList from './components/ManhwaList'
import CC from './assets/CC.png'
import { useState, useEffect } from 'react'
import PopupToast from './components/PopupToast'

function App() {
  const manhwaListStorage = localStorage.getItem("manhwaList")
  const [manhwaList, updateManhwalist] = useState(manhwaListStorage ? JSON.parse(manhwaListStorage) : [])
  const [activeList, setActiveList] = useState(manhwaList)
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
      setActiveList(manhwaList)     
  }, [manhwaList])
  

  return (
    <>
      <Banner />
      <img src={CC} alt="tkt" className='CC'/>
      <ManhwaList 
        manhwaList={manhwaList} 
        updateManhwalist={updateManhwalist} 
        activeList={activeList} 
        setActiveList={setActiveList}
        setAjoutList={setAjoutList}
      />
      {ajoutList && <PopupToast manhwaList={manhwaList}/>}
    </>
    
  )
}

export default App
