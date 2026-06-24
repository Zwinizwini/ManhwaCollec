import { useContext, useEffect, useState } from 'react'
import '../styles/Popup.css'
import PopupInfo from './PopupInfo'
import Modifier from './Modifier'
import { styleCouleur, progressionCouleur } from '../utils/colors'
import { UserContext } from '../utils/Context'
import BtnAjouter from './BtnAjouter'
import { supabase } from '../supabase'
import Audio from './Audio'

const changeLink = (link, chapter) => {
    let changeLink
    const ChapCond1 = /chapter\/\d+/
    const ChapCond2 = /ch\d+/
    const ChapCondF = /\d+/
    if (ChapCond1.test(link)) changeLink = link.replace(ChapCond1, `chapter/${chapter}`)
    else if (ChapCond2.test(link)) changeLink = link.replace(ChapCond2, `ch${chapter}`)
    else changeLink = link.replace(ChapCondF, chapter)
    return changeLink
}
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const Popup = ({id, title, chapter, status, nsfw, cover, lastReadCompter, lastRead, description, link, setPopup, isPopup, maxChapter, manhwaList, updateManhwalist, note, gradientSeuil, setChapUpdate, manhwaListName, coor, tag}) => {
    const {isUser} = useContext(UserContext)
    const [isPlayingHover, setIPH] = useState(false)
    const tagList = tag?.split(/\s*(?:,|$)\s*/) ?? []
    const audioSuppr = ['src/assets/btnsupprsound/nowait.mp3', 'src/assets/btnsupprsound/nodont.mp3']
    const randomSound = getRandomInt(2)


    useEffect(() => {
        if (isPopup) {
            document.body.style.overflow = "hidden"
        } 
        return () => {document.body.style.overflow = ""}
    }, [isPopup])

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') setPopup(false)
        }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [])

    const couleurStatus = styleCouleur(status)
    const [modifier, setModifier] = useState(false)
    const [isClose, setIsClose] = useState(false)

    const supprManhwa = async () => {
        const { error } = await supabase
            .from('manhwas')
            .delete()
            .eq('id',id)
        if ( error ) console.error(error)
        updateManhwalist(manhwaList.filter(manhwa => manhwa.id !== id))
        setPopup(false)
    }


    return (
        <div className='popupBackground' onClick={(e) => {
            if (e.target.className === 'popupBackground') {
                setIsClose(true)
                setTimeout(() => setPopup(false), 300)
            }
        }}>
            <div className="popup" style={{left: coor.x, top: coor.y, animation: isClose ? 'fermeture .3s ease-in-out both' : 'ouverture .3s ease-in-out both'}} id='popupLec'>
                <div className='img-popup'>
                    <img src={cover} alt={`Cover de ${title}`}/>
                </div>
                <div className='snd-container'>
                    <div className='status-note'>
                        <span className="status-popup" style={{background:couleurStatus}}>{status}</span>
                        {nsfw===1 && <span className="nsfw-popup">18+</span>}
                        {note && <div className='note'>★ {note}</div>}
                    </div>
                    <h2>{title}</h2>
                    {description && <p className='description'>{description}</p>}
                    {tagList && 
                        <div className='tag-list'>
                            {tagList.map(t => 
                                <p key={t}>{t}</p>
                            )}
                        </div>
                    }

                    <div className='popupInfo'>
                        <PopupInfo info1={"Chapitre Max"} info2={`${maxChapter}`}/>
                        <PopupInfo info1={"Dernier Lu"} info2={`Ch. ${chapter}`}/>
                        <PopupInfo info1={"Lu il y a"} info2={`${lastReadCompter ? lastReadCompter : 0} jours`}/>
                        <PopupInfo info1={"Progression"} info2={`${Math.round((parseInt(chapter)/maxChapter) * 100)}%`} />
                    </div>
                    <div className='progression-bar' id='popup-bar' style={{background: `linear-gradient(to right, ${progressionCouleur(gradientSeuil)} ${gradientSeuil}%, black ${gradientSeuil}%)`}}></div>
                    <div className="divBtn">
                        {link && <a href={changeLink(link, chapter)} className='bouton-chap' target='__blank'>Voir le lien de lecture</a>}
                        {!isUser && <button onClick={() => setModifier(true)} className='btn-modif'>Modifier</button>}
                        {isUser && <BtnAjouter title={title} maxChapter={maxChapter} cover={cover} manhwaListName={manhwaListName}/>}
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
                <div className='closePopup' onClick={() => {
                        setIsClose(true)
                        setTimeout(() => setPopup(false), 300)
                    }}>
                </div>
                {modifier && <Modifier 
                    title={title}
                    chapter={chapter}
                    status={status}
                    nsfw={nsfw}
                    cover={cover}
                    description={description}
                    link={link}
                    maxChapter={maxChapter}
                    setModifier={setModifier}
                    manhwaList={manhwaList}
                    id={id}
                    updateManhwalist={updateManhwalist}
                    note={note}
                    lastRead={lastRead}
                    setChapUpdate={setChapUpdate}
                    tag={tagList}
                />}
            </div>
        </div>
    )
}


export default Popup