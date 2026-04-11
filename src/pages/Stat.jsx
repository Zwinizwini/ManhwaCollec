import { useContext } from "react"
import { ManhwaContext } from "../utils/Context"
import '../styles/Stat.css'
import CamembertRep from "../components/CamembertRep"
import CamembertLec from "../components/CamembertLec"
import { useLocation, useNavigate } from "react-router-dom"

const Stat = () => {
    const navigate = useNavigate()
    const {state} = useLocation()
    const {manhwaList: contextList} = useContext(ManhwaContext)
    const manhwaList = state?.manhwaList ?? contextList
    const totalManhwa = manhwaList.length


    return (
        <>           
            <div style={{marginBottom:'10px', marginLeft: '20px'}}>
                <div className='btnNav' onClick={() => navigate(-1)}>
                    <svg width="14" height="14" viewBox="0 0 7 7" fill="none">
                        <path d="M 1 4 L 4 1 V 3 H 7 V 5 H 4 V 7 Z" fill="#7F77DD"/>
                    </svg>
                    Retour
                </div>
            </div>
            <div className="stat">
                <CamembertRep manhwaList={manhwaList} totalManhwa={totalManhwa}/>
                <CamembertLec manhwaList={manhwaList} totalManhwa={totalManhwa}/>
            </div>
        </>
    )
}

export default Stat