import { useLocation, useNavigate } from "react-router-dom"
import BtnNav from "../components/BtnNav"
import '../styles/ManhwaPage.css'
import { styleCouleur, progressionCouleur } from "../utils/colors"
import PopupInfo from "../components/PopupInfo"
import { Tooltip } from "react-tooltip"
import { useState, useContext } from "react"
import { ManhwaContext, UserContext } from "../utils/Context"
import { supabase } from "../supabase"
import nowait from '../assets/btnsupprsound/nowait.mp3'
import nodont from '../assets/btnsupprsound/nodont.mp3'
import Audio from "../components/Audio"
import Modifier from "../components/Modifier"
import ListeChap from "../components/ListeChap"
import BtnAjouter from "../components/BtnAjouter"

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

//Vercel ?

const ManhwaPage = () => {
    const {state} = useLocation()
    const navigate = useNavigate()
    const id = state.id
    const isUser = state.isUser
    const manhwaListName = state.manhwaListName
    const {manhwaList: contextList, saveManhwaList} = useContext(ManhwaContext)
    const manhwaList = state?.manhwaList ?? contextList
    const manhwa = manhwaList.find((elem) => elem.id === id)

    const tagList = (manhwa && manhwa.tag) ? manhwa.tag.split(/\s*(?:,|$)\s*/) : []

    const gradientSeuil = (manhwa) && Math.round((parseInt(manhwa.chapter)/manhwa.maxChapter) * 100)
    const [pos, setPos] = useState({x:0,y:0})
    
    const audioSuppr = [nowait, nodont]
    const randomSound = getRandomInt(2)
    const [isPlayingHover, setIPH] = useState(false)
    const [modifier, setModifier] = useState(false)

    const supprManhwa = async () => {
        const { error } = await supabase
            .from('manhwas')
            .delete()
            .eq('id',id)
        if ( error ) console.error(error)
        saveManhwaList(manhwaList.filter(manhwa => manhwa.id !== id))
        navigate(-1)
    }

    return (
        <div>
            <BtnNav/>
            {!manhwa ? <div class="loader"></div>
            :
            <div className="manhwaInfo">
                <div className="infoTag">
                    <img src={manhwa.cover} alt={`Cover de ${manhwa.title}`}/>
                    <div className="first">
                        <span className="status-popup" style={{background:styleCouleur(manhwa.status)}}>{manhwa.status}</span>
                        {manhwa.nsfw===1 && <span className="nsfw-popup">18+</span>}
                    </div>
                    {tagList.length > 0 && 
                        <div className='tag-list first'>
                            {tagList.map(t => 
                                <p key={t}>{t}</p>
                            )}
                        </div>
                    }
                    <div className="divBtn">
                        {/* {manhwa.link && <a href={changeLink(manhwa.link, manhwa.chapter)} className='bouton-chap' target='__blank'>Voir le lien de lecture</a>} */}
                        {!isUser && <button onClick={() => setModifier(true)} className='btn-modif'>Modifier</button>}
                        {isUser && <BtnAjouter title={manhwa.title} maxChapter={manhwa.maxChapter} cover={manhwa.cover} manhwaListName={manhwaListName}/>}
                        {!isUser && <>
                            <button 
                                onClick={() => supprManhwa()} 
                                className='btn-modif' 
                                id='btn-suppr' 
                                onMouseEnter={() => setIPH(true)}
                                onMouseLeave={() => setIPH(false)}
                            >Supprimer</button>
                            <Audio isPlaying={isPlayingHover} audio={audioSuppr[randomSound]}/>
                        </>
                        }
                    </div>
                </div>
                <div className="infoSupp">
                    <h2>{manhwa.title}</h2>
                    {manhwa.note && <p className='note'><span>★</span> {manhwa.note}</p>}
                    {manhwa.description && <p className='description'>{manhwa.description}</p>}
                    <div className='popupInfo'>
                        <PopupInfo info1={"Chapitre Max"} info2={`${manhwa.maxChapter}`}/>
                        <PopupInfo info1={"Dernier Lu"} info2={`Ch. ${manhwa.chapter}`}/>
                        <PopupInfo info1={"Lu il y a"} info2={`${manhwa.lastReadCompter ? manhwa.lastReadCompter : 0} jours`}/>
                        <PopupInfo info1={"Progression"} info2={`${Math.round((parseInt(manhwa.chapter)/manhwa.maxChapter) * 100)}%`} />
                    </div>
                    <div 
                        className='progression-bar' 
                        id='popup-bar' 
                        style={{background: `linear-gradient(to right, ${progressionCouleur(gradientSeuil)} ${gradientSeuil}%, black ${gradientSeuil}%)`}} 
                        onMouseMove={(e) => {setPos({x: e.clientX, y: e.clientY})}}>
                    </div>
                    <Tooltip 
                        anchorSelect="#popup-bar"
                        style={{background: '#08090a'}}
                        opacity={1}
                        position={{x: pos.x, y: pos.y}}
                        content= {`${gradientSeuil}%`}
                    />
                    {manhwa.link && <ListeChap lien={manhwa.link} maxChapter={manhwa.maxChapter}/>}
                </div>
            </div>}
            {modifier && <Modifier 
                title={manhwa.title}
                chapter={manhwa.chapter}
                status={manhwa.status}
                cover={manhwa.cover}
                description={manhwa.description}
                link={manhwa.link}
                maxChapter={manhwa.maxChapter}
                setModifier={setModifier}
                manhwaList={manhwaList}
                id={id}
                updateManhwalist={saveManhwaList}
                note={manhwa.note}
                lastRead={manhwa.lastRead}
                tag={tagList}
                modifier={modifier}
            />}
        </div>
    )
}

export default ManhwaPage
