import ManhwaList from '../components/ManhwaList'
import { useState, useEffect, useContext } from 'react'
import PopupToast from '../components/PopupToast'
import { ManhwaContext, UserContext } from '../utils/Context'
import { Link } from 'react-router-dom'
import Pasco from '../components/Pasco'
import {useAuth} from '../utils/AuthContext'
import styled from 'styled-components'


const StatBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #1c1f27;
  color: #fff;
  border-radius: 10px;
  padding: 7px 14px 7px 10px;
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  border: 1px solid #3C3489;
  cursor: pointer;
  transition: opacity .15s, transform .1s;
  

  &:hover { opacity: .85; }
  &:active { transform: scale(0.95); }
`

const Bars = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 16px;
`

const Bar = styled.span`
  width: 3px;
  border-radius: 1px;
  background: #7F77DD;
  height: ${({ h }) => h}px;
`

function App() {
  //netoyage
  const {user} = useAuth()
  const {setIsUser} = useContext(UserContext)
  const {manhwaList, saveManhwaList} = useContext(ManhwaContext)
  const [ajoutList, setAjoutList] = useState(false)

  const BAR_DATA = [5,11,8,14,6]

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
          <div className='container-btnStat'style={{width:'98%', display:'flex', justifyContent: 'end', marginBottom:'10px'}}>
            <Link className='btnNav' to='/stat'>
              <Bars>
                {BAR_DATA.map((h, i) => <Bar key={i} h={h} />)}
              </Bars>
              Stat
            </Link> 
          </div> 
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
