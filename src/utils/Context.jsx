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

export const AjoutListContext = createContext()

export const AjoutListProvider = ({children}) => {
    const [ajoutList, setAjoutList] = useState(false)
    return (
        <AjoutListContext.Provider value={{ajoutList, setAjoutList}}>
            {children}
        </AjoutListContext.Provider>
    )
}


export const OtherManhwaContext = createContext()

export const OtherManhwaProvider = ({children}) => {
    const [otherManhwaList, setOtherManhwa] = useState([])
    const {user} = useAuth()

    const saveOtherManhwaList = (ml) => {
        setOtherManhwa(ml)
    }

    useEffect(() => {
        const getManhwas = async () => {
            const { data, error } = await supabase
                .from('manhwas')
                .select('title, cover, maxChapter')
                .neq('user_id', user.id)
                .order('status', {ascending: true})
            
            if (error) console.error(error)
            if (data) {
                saveOtherManhwaList(data)
            }
        }
        getManhwas()
    }, [user])

    return (
        <OtherManhwaContext.Provider value={{otherManhwaList, saveOtherManhwaList}}>
            {children}
        </OtherManhwaContext.Provider>
    )
}