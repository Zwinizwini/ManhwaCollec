import { useState, createContext} from "react";
import {styled, keyframes} from 'styled-components'
import { colors } from '../utils/colors'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const Loader = styled.div`
  padding: 10px;
  border: 6px solid ${colors.violet};
  border-bottom-color: transparent;
  border-radius: 22px;
  animation: ${rotate} 1s infinite linear;
  height: 0;
  width: 0;
`

export const ManhwaContext = createContext()

export const ManhwaProvider = ({children}) => {
    // const manhwaListStorage = localStorage.getItem("manhwaList")
    // const [manhwaList, updateManhwalist] = useState(manhwaListStorage ? JSON.parse(manhwaListStorage) : [])

    const [manhwaList, updateManhwalist] = useState([])
    
    const saveManhwaList = (ml) => {
        updateManhwalist(ml)
    }

    return (
        <ManhwaContext.Provider value={{manhwaList, saveManhwaList}}>
            {children}
        </ManhwaContext.Provider>
    )
}