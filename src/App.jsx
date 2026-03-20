import Banner from './components/Banner'
import ManhwaList from './components/ManhwaList'
import CC from './assets/CC.png'
import { useState, useEffect } from 'react'

function App() {
  const manhwaListStorage = localStorage.getItem("manhwaList")
  const [manhwaList, updateManhwalist] = useState(manhwaListStorage ? JSON.parse(manhwaListStorage) : [])
  const [activeList, setActiveList] = useState(manhwaList)

  useEffect(() => {
      const manhwaListString = JSON.stringify(manhwaList)
      localStorage.setItem('manhwaList', manhwaListString)
      setActiveList(manhwaList)     
  }, [manhwaList])
  

  return (
    <>
      <Banner />
      <img src={CC} alt="tkt" className='CC'/>
      <ManhwaList manhwaList={manhwaList} updateManhwalist={updateManhwalist} activeList={activeList} setActiveList={setActiveList}/>
    </>
    
  )
}

export default App
