import { useContext, useEffect } from "react"
import { supabase } from "../supabase"
import { AjoutListContext, ManhwaContext } from "../utils/Context"
import { useAuth } from "../utils/AuthContext"


const BtnAjouter = ({title, cover, maxChapter, manhwaListName}) => {
    const { manhwaList, saveManhwaList } = useContext(ManhwaContext)
    const { ajoutList, setAjoutList } = useContext(AjoutListContext)
    const { user } = useAuth()
    const isValid = !manhwaListName.includes(title.toLowerCase().replaceAll(" ", ""))

    useEffect(() => {
        if (ajoutList) {
        setTimeout(() => {
            setAjoutList(false)
        }, 2800);
        }
    }, [ajoutList])


    const addManhwa = async (manhwa) => {
        const { data, error } = await supabase
            .from('manhwas')
            .insert(manhwa)
            .select()
        
        if (error) console.error(error)
        
        manhwa.id = data[0].id
        const newList = [...manhwaList, manhwa]
        saveManhwaList(newList)
        setAjoutList(true)
    }

    
    const ajoutManhwa =  () => {
        const manhwaObj = {
            title: title,
            cover: cover,
            maxChapter: maxChapter,
            user_id: user.id,
            status: 'Pas lu',
            chapter: 0,
            lastRead: new Date().toISOString(),
            lastReadCount: ""
        }
        addManhwa(manhwaObj)
    }

    return (
        <>
            {isValid && <button onClick={() => {ajoutManhwa()}} className="bouton-chap" id="btnAjoutAutre">Ajouter +</button>}
            {ajoutList && <button className="bouton-chap" style={{background: '#085041', border: '1px solid #1d9e75'}}>Ajouté</button>}
        </>
    )
}

export default BtnAjouter