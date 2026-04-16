import { useContext, useEffect } from "react"
import { supabase } from "../supabase"
import { AjoutListContext, ManhwaContext } from "../utils/Context"
import { useAuth } from "../utils/AuthContext"
import styled from "styled-components"

const BtnAjout = styled.button`
    background-color: ${({ajoutList}) =>
        ajoutList ? '#085041' : '#16191f'};
    border: 1px solid ${({ajoutList}) =>
        ajoutList ? '#1d9e75' : '#7F77DD'};
`


const BtnAjouter = ({title, cover, maxChapter}) => {
    const { manhwaList, saveManhwaList } = useContext(ManhwaContext)
    const { ajoutList, setAjoutList } = useContext(AjoutListContext)
    const { user } = useAuth()

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
        <BtnAjout onClick={() => {ajoutManhwa()}} className="bouton-chap" ajoutList={ajoutList} id="btnAjoutAutre">{!ajoutList ? 'Ajouter +' : 'Ajouté'}</BtnAjout>
    )
}

export default BtnAjouter