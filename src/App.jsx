import Banner from './components/Banner'
import ManhwaList from './components/ManhwaList'
import CC from './assets/CC.png'

function App() {
  // const manhwaListStorage = localStorage.getItem("manhwaList")
  // const manhwaList = manhwaListStorage ? JSON.parse(manhwaListStorage) : []
  

  return (
    <>
      <Banner />
      <img src={CC} alt="tkt" className='CC'/>
      <ManhwaList />
    </>
    
  )
}

export default App
