import { useState, createContext, useEffect} from "react";
import { supabase } from "../supabase";
import { useAuth } from "./AuthContext";

export const ManhwaContext = createContext()

export const ManhwaProvider = ({children}) => {
    // const manhwaListStorage = localStorage.getItem("manhwaList")
    // const [manhwaList, updateManhwalist] = useState(manhwaListStorage ? JSON.parse(manhwaListStorage) : [])

    const [manhwaList, updateManhwalist] = useState([])
    const {user} = useAuth()
    
    const saveManhwaList = (ml) => {
        updateManhwalist(ml)
    }

    useEffect(() => {
        const getManhwas = async () => {
            const { data, error } = await supabase
                .from('manhwas')
                .select('*')
                .eq('user_id', user.id)
                .order('status', {ascending: true})
            
            if (error) console.error(error)
            if (data) {
                saveManhwaList(data)
            }
        }
        getManhwas()
    }, [user])

    return (
        <ManhwaContext.Provider value={{manhwaList, saveManhwaList}}>
            {children}
        </ManhwaContext.Provider>
    )
}

export const UserContext = createContext()

export const UserProvider = ({children}) => {
    const [isUser, setIsUser] = useState(false)
    return (
        <UserContext.Provider value={{isUser, setIsUser}}>
            {children}
        </UserContext.Provider>
    )
}
