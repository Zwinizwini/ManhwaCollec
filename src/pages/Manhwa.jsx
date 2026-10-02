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
    const [tagList, setTL] = useState([])

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
                // .eq('nsfw', 1)
                .range((page-1)*50,(page*50)-1)
                .order('score', {ascending: false})
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


    const getPornhwa = async (variable = {page: 1, startDateGreater:20000000, startDateLesser:20010000}) => {
        const query = `
        query($page: Int, $startDateGreater: FuzzyDateInt, $startDateLesser: FuzzyDateInt)  {
            Page(page: $page) {
                pageInfo {
                hasNextPage
                }
                media(
                type: MANGA
                startDate_greater: $startDateGreater
                startDate_lesser: $startDateLesser
                countryOfOrigin: "KR"
                ) {
                id
                title {
                    english
                    romaji
                }
                coverImage {
                    extraLarge
                }
                averageScore
                chapters
                description
                genres
                synonyms
                idMal
                tags {
                    name
                }
                isAdult
                }
            }
        }
        `
        const url = 'https://graphql.anilist.co',
            options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    query: query,
                    variables: variable
                })
            };
        
            try {
                const response = await fetch(url, options)
                const {data} = await response.json();
                setLoading(true)


                data.Page.media.forEach(manhwa => {
                    const cover = manhwa.coverImage.extraLarge
                    let tag =  manhwa.tags.some((elem) => elem.name === "Boys' Love") ? manhwa.genres.join(',').concat(',', "Boys Love") : manhwa.genres.join(',')
                    const manwhaData = {
                        id: manhwa.id,
                        title: manhwa.title.english ? manhwa.title.english : manhwa.title.romaji,
                        title_synonyms: manhwa.synonyms.join('#'),
                        tag: tag,
                        cover: cover,
                        chapters: manhwa.chapters,
                        synopsis: manhwa.description,
                        score: manhwa.averageScore / 10,
                        nsfw: manhwa.isAdult ? 1 : 0,
                        id_mal: manhwa.idMal
                    };
                    setMAL(prec => [...prec, manwhaData])
                });

                console.log('autre page ? ' + data.Page.pageInfo.hasNextPage)
                if(data.Page.pageInfo.hasNextPage) {
                    console.log('encore une page')
                    setTimeout(() => {
                        getPornhwa({page: variable.page+1, startDateGreater:variable.startDateGreater, startDateLesser:variable.startDateLesser});
                    }, 2500)
                } else if (variable.startDateLesser < 20270000) { 
                    console.log('année : ' + variable.startDateLesser)
                    console.log('----------------------------------------------')
                    setTimeout(() => {
                        getPornhwa({page: 1, startDateGreater:variable.startDateGreater+10000, startDateLesser:variable.startDateLesser+10000});
                    }, 2500)
                } else {
                    console.log('fini')
                    setLoading(false)
                }
            } catch (error) {
                console.error(error)
            }

    }

    useEffect(() => {
        if (!isLoading) {
            console.log(manhwaMAL)
            ajoutManhwaBDD()
        }
    }, [isLoading])

    return (
        <>
            {isAdmin && <button onClick={() => getPornhwa()} className="btnAdmin">Recup Manhwa</button>}
            <ManhwaListMAL 
                manhwaList={manhwaBDD} 
                loading={isLoadingBDD} 
                page={page} isNsfw={isNsfw} 
                setIsNsfw={setIsNsfw} 
                setBL={setBL} isSearch={false} 
                manhwaNameList={manhwaListName} 
                user={user}
                tagList={tagList}
                setTL={setTL}
            />
        </>
    )
}

export default Manhwa
