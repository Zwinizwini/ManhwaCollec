import { useEffect, useState, useContext } from "react";
import { supabase } from "../supabase"
import ManhwaListMAL from "../components/ManhwaListMAL";
import { useSearchParams } from "react-router-dom";
import '../styles/ManhwaMAL.css'
import { ManhwaContext } from "../utils/Context";
import { useAuth } from "../utils/AuthContext";


const Manhwa = () => {
    const [manhwaMAL, setMAL] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [manhwaBDD, setMBDD] = useState([])
    const [isLoadingBDD, setLoadingBDD] = useState(true)
    const [isNsfw, setIsNsfw] = useState(2)
    const [param] = useSearchParams()
    const page = parseInt(param.get('page'))
    const [excludeBL, setBL] = useState(true)
    const {manhwaList} = useContext(ManhwaContext)
    const manhwaListName = manhwaList.map((manhwa) => manhwa.title.toLowerCase().replaceAll(" ", ""))
    const {user} = useAuth()
    const [isAdmin, setAdmin] = useState(false)

    useEffect(() => {
        const getAdmin = async () => {
            const {data, error} = await supabase.from('profiles').select('admin').eq('id', user.id)
            if (error) console.error(error)
            if (data) setAdmin(data[0].admin)
        }
        getAdmin()
    },[])

    useEffect(() => {
        const getManhwas = async () => {
            setLoadingBDD(true)
            let requete = supabase.from('manhwaMAL').select('*')
            if (excludeBL) requete = requete.not('tag', 'ilike', '%Boys Love%')
            if (isNsfw === '0' || isNsfw === '1') requete = requete.eq('nsfw', isNsfw)
            const { data, error } = await requete
                .range((page-1)*50,(page*50)-1)
                .order('id', {ascending: true})
            if (error) console.error(error)
            if (data) {
                setMBDD(data)
                setLoadingBDD(false)
            }
        }
        getManhwas()
    }, [page, isNsfw, excludeBL])

    const ajoutManhwaBDD = async () => {
        for (const manhwa of manhwaMAL) {
            console.log('Envoie Liste Manhwa')
            const { error } = await supabase
                .from('manhwaMAL')
                .insert(manhwa)
            if (error) console.error(error)
        }
    }

    async function getTopAnimeData(page = 1, totalAnime = 7643) {

        try {
          const response = await fetch(`https://api.tenrai.org/v1/top/manga?type=manhwa&limit=50&page=${page}`);
          const {data} = await response.json();
          setLoading(true)
     
          data.forEach(manhwa => {
            const {title, title_synonyms, chapters, synopsis, score} = manhwa;
            const id_mal = manhwa.mal_id
            const cover = manhwa.images.webp.large_image_url
            const tagListe = [...manhwa.genres, ...manhwa.themes]
            const tag = tagListe.reduce(
                (acc, current) => acc.concat(current.name),
                []
            ).toString()
            const manwhaData = {
                id_mal: id_mal,
                title: title,
                title_synonyms: title_synonyms.join('#'),
                tag: tag,
                cover: cover,
                chapters: chapters,
                synopsis: synopsis,
                score: score,
                nsfw: tag.includes('Erotica') ? 1 : 0
            };
            setMAL(prec => [...prec, manwhaData])
            console.log('Loading Liste Manhwa')
          });
    
          if (data.length > 0 && totalAnime > 0) {
            setTimeout(() => {
                getTopAnimeData(page + 1, totalAnime - data.length);
              }, 1000)
          } else {
            setLoading(false)
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        if (!isLoading) {
            console.log(manhwaMAL)
            ajoutManhwaBDD()
        }
    }, [isLoading])

    return (
        <div>
            {isAdmin && <button onClick={() => getTopAnimeData()}>Recup Manhwa</button>}
            <ManhwaListMAL 
                manhwaList={manhwaBDD} 
                loading={isLoadingBDD} 
                page={page} isNsfw={isNsfw} 
                setIsNsfw={setIsNsfw} 
                setBL={setBL} isSearch={false} 
                manhwaNameList={manhwaListName} 
                user={user}
            />
        </div>
    )
}

export default Manhwa
