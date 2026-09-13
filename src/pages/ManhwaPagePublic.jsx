import { useParams } from "react-router-dom"
import BtnNav from "../components/BtnNav"
import '../styles/ManhwaPage.css'
import PopupInfo from "../components/PopupInfo"
import { useState, useContext, useEffect } from "react"
import { ManhwaContext } from "../utils/Context"
import { supabase } from "../supabase"
import BtnAjouter from "../components/BtnAjouter"


const ManhwaPagePublic = () => {
    const params = useParams()
    const id = parseInt(params.id)
    const {manhwaList} = useContext(ManhwaContext)
    const manhwaListName = manhwaList.map((manhwa) => manhwa.title.toLowerCase().replaceAll(" ", ""))
    const [manhwa, setManhwa] = useState({})
    const [isLoading, setIL] = useState(true)


    useEffect(() => {
        const getManhwa = async () => {
            const { data, error } = await supabase
                .from("manhwaMAL")
                .select()
                .eq('id', id)
            if (error) console.error(error)
            if (data) {
                setManhwa(data[0])
                setIL(false)
                document.title = data[0].title
            }
        } 
        getManhwa()
    },[])

    const tagList = (!isLoading && manhwa.tag) ? manhwa.tag.split(',') : []
    const titreSyn = (!isLoading && manhwa.title_synonyms) ? manhwa.title_synonyms.split('#') : []

    return (
        <>
            {isLoading ? <div class="loader"></div>
            :
            <div>
                <BtnNav/>
                <div className="manhwaInfo">
                    <div className="infoTag">
                        <img src={manhwa.cover} alt={`Cover de ${manhwa.title}`}/>
                        {manhwa.nsfw===1 && 
                            <div className="first">
                                <span className="nsfw-popup">18+</span>
                            </div>
                        }
                        {tagList.length > 0 && 
                            <div className='tag-list first'>
                                {tagList.map(t => 
                                    <p key={t}>{t}</p>
                                )}
                            </div>
                        }
                        {titreSyn.length > 0 && 
                            <div className='tag-list first'>
                                {titreSyn.map(t => 
                                    <p key={t}>{t}</p>
                                )}
                            </div>
                        }
                        <div className="divBtn">
                            <BtnAjouter title={manhwa.title} maxChapter={manhwa.chapters} cover={manhwa.cover} manhwaListName={manhwaListName} nsfw={manhwa.nsfw}/>
                        </div>
                    </div>
                    <div className="infoSupp">
                        <div className="info">
                            <h2>{manhwa.title}</h2>
                            {manhwa.score && <p className='note'><span>★</span> {manhwa.score}</p>}
                            {manhwa.synopsis && <p className='description'>{manhwa.synopsis}</p>}
                            <div className='popupInfo'>
                                <PopupInfo info1={"Chapitre Max"} info2={manhwa.chapters ? `${manhwa.chapters}` : 'En Cours'}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }
        </>
    )
}

export default ManhwaPagePublic
