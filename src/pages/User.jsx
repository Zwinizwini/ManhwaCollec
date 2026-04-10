import { useContext, useEffect, useState } from 'react'
import ManhwaList from '../components/ManhwaList'
import { useParams } from 'react-router-dom'
import { supabase } from '../supabase'
import { UserContext } from '../utils/Context'
import { Link } from 'react-router-dom'
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


function User() {
    const [manhwaList, saveManhwaList] = useState([])
    const {id} = useParams()
    const {setIsUser} = useContext(UserContext)

    const BAR_DATA = [5,11,8,14,6]

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
        const fetchManhwa = async () => {
            const {data,error} = await supabase
                .from('manhwas')
                .select('*')
                .eq('user_id', id)
                .order('status', {ascending: true})
            if (error) console.error(error)
            if (data) {
                const trieLocal = localStorage.getItem("trier")
                trier(trieLocal ? JSON.parse(trieLocal) : "0", data)
            }
        }
        setIsUser(true)
        fetchManhwa()
    }, [])



  return (
    <>      
        <div className='container-btnStat'style={{width:'98%', display:'flex', justifyContent: 'end', marginBottom:'10px'}}>
            <StatBtn to={`/stat/${id}`} state={{ manhwaList }}>
              <Bars>
                {BAR_DATA.map((h, i) => <Bar key={i} h={h} />)}
              </Bars>
              Stat
            </StatBtn> 
          </div>   
        <ManhwaList 
        manhwaList={manhwaList} 
        updateManhwalist={saveManhwaList}
        />
    </>
  )
}

export default User
