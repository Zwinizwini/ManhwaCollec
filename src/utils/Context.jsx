import { useState, createContext, useEffect } from "react";
import { supabase } from "../supabase";
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
    const [loading, setLoading] = useState(true)

    const trier = (e, data) => {
        if (e === "1") {  
            updateManhwalist(data.toSorted((a,b) => {
                const noteA = a.note ? a.note : 0
                const noteB = b.note ? b.note : 0
                if (noteA < noteB) return 1
                if (noteA > noteB) return -1
                return 0
            }))
        } else if (e === "2") {
            updateManhwalist(data.toSorted((a,b) => {
                const noteA = a.note ? a.note : 0
                const noteB = b.note ? b.note : 0
                if (noteA < noteB) return -1
                if (noteA > noteB) return 1
                return 0
            }))
        } else {
            console.log("dernier if trier")
        }
    }

    useEffect(() => {
        const getManhwas = async () => {
            setLoading(true)
            const { data, error } = await supabase
                .from('manhwas')
                .select('*')
            
            if (error) console.error(error)
            if (data) {
                setLoading(false)
                const trieLocal = localStorage.getItem("trier")
                trier(trieLocal ? JSON.parse(trieLocal) : 0, data)
            }
        }
        getManhwas()
    }, [])
    
    const saveManhwaList = (ml) => {
        updateManhwalist(ml)
    }

    return (
        <ManhwaContext.Provider value={{manhwaList, saveManhwaList}}>
            {loading ? <Loader/> : children}
        </ManhwaContext.Provider>
    )
}