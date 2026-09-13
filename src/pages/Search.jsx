import { useEffect, useState, useContext } from "react";
import { supabase } from "../supabase"
import ManhwaListMAL from "../components/ManhwaListMAL";
import { useParams, useSearchParams } from "react-router-dom";
import '../styles/ManhwaMAL.css'
import { ManhwaContext } from "../utils/Context";
import { useAuth } from "../utils/AuthContext";


const Search = () => {
    const [manhwaBDD, setMBDD] = useState([])
    const [isLoadingBDD, setLoadingBDD] = useState(true)
    const [isNsfw, setIsNsfw] = useState(2)
    const [param] = useSearchParams()
    const page = parseInt(param.get('page'))
    const {titre} = useParams()
    const [excludeBL, setBL] = useState(true)
    const {manhwaList} = useContext(ManhwaContext)
    const manhwaListName = manhwaList.map((manhwa) => manhwa.title.toLowerCase().replaceAll(" ", ""))
    const {user} = useAuth()

    useEffect(() => {
        const getManhwas = async () => {
            setLoadingBDD(true)
            let requete = supabase.from('manhwaMAL').select('*')
            if (excludeBL) requete = requete.not('tag', 'ilike', '%Boys Love%')
            if (isNsfw === '0' || isNsfw === '1') requete = requete.eq('nsfw', isNsfw)
            const { data, error } = await requete
                .or(`title.ilike.%${titre}%,title_synonyms.ilike.%${titre}%`)
                .range((page-1)*50,(page*50)-1)
                .order('id', {ascending: true})
            if (error) console.error(error)
            if (data) {
                setMBDD(data)
                setLoadingBDD(false)
            }
        }
        getManhwas()
    }, [page, isNsfw, excludeBL, titre])


    return (
        <div>
            <ManhwaListMAL 
                manhwaList={manhwaBDD} 
                loading={isLoadingBDD} 
                page={page} 
                isNsfw={isNsfw} 
                setIsNsfw={setIsNsfw} 
                setBL={setBL} isSearch={true}
                titre={encodeURIComponent(titre)}
                tailleSearch={manhwaBDD.length}
                manhwaNameList={manhwaListName}
                user={user}
            />
        </div>
    )
}

export default Search
