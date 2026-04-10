import { useContext } from "react"
import { ManhwaContext } from "../utils/Context"
import '../styles/Stat.css'
import CamembertRep from "../components/CamembertRep"
import CamembertLec from "../components/CamembertLec"
import { useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"

const StatBtn = styled.div`
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


const Stat = () => {
    const navigate = useNavigate()
    const {state} = useLocation()
    const {manhwaList: contextList} = useContext(ManhwaContext)
    const manhwaList = state?.manhwaList ?? contextList
    const totalManhwa = manhwaList.length


    return (
        <>           
            <div style={{marginBottom:'10px', marginLeft: '20px'}}>
                <StatBtn onClick={() => navigate(-1)}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M1 7L7 2L13 7V13H9V9H5V13H1Z" fill="#7F77DD"/>
                    </svg>
                    Home
                </StatBtn>
                <StatBtn onClick={() => navigate(-1)}>
                    <svg width="14" height="14" viewBox="0 0 7 7" fill="none">
                        <path d="M 1 4 L 4 1 V 3 H 7 V 5 H 4 V 7 Z" fill="#7F77DD"/>
                    </svg>
                    Retour
                </StatBtn>
            </div>
            <div className="stat">
                <CamembertRep manhwaList={manhwaList} totalManhwa={totalManhwa}/>
                <CamembertLec manhwaList={manhwaList} totalManhwa={totalManhwa}/>
            </div>
        </>
    )
}

export default Stat