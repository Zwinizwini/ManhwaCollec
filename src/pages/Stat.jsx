import { useContext } from "react"
import { ManhwaContext } from "../utils/Context"
import '../styles/Stat.css'
import CamembertRep from "../components/CamembertRep"
import CamembertLec from "../components/CamembertLec"
import { useLocation } from "react-router-dom"
import BtnNav from "../components/BtnNav"

const Stat = () => {
    const {state} = useLocation()
    const {manhwaList: contextList} = useContext(ManhwaContext)
    const manhwaList = state?.manhwaList ?? contextList
    const totalManhwa = manhwaList.length


    return (   
        <>
            <BtnNav/>
            <div className="stat">
                <CamembertRep manhwaList={manhwaList} totalManhwa={totalManhwa}/>
                <CamembertLec manhwaList={manhwaList} totalManhwa={totalManhwa}/>
            </div>
        </>
    )
}

export default Stat