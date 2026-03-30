import { useState, createContext} from "react";

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