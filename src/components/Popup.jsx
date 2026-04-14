import { useContext, useEffect, useState } from 'react'
import '../styles/Popup.css'
import PopupInfo from './PopupInfo'
import Modifier from './Modifier'
import { styleCouleur, progressionCouleur } from '../utils/colors'
import { UserContext } from '../utils/Context'

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

const Popup = ({id, title, chapter, status, nsfw, cover, lastReadCompter, lastRead, description, link, setPopup, isPopup, maxChapter, manhwaList, updateManhwalist, note, gradientSeuil, setChapUpdate}) => {
    const {isUser} = useContext(UserContext)

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

    return (
        <div className='popupBackground' onClick={(e) => {
            e.target.className === 'popupBackground' && setPopup(false)
        }}>
            <div className="popup">
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
                    {description && <p className='description'>{description}</p>
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
                    </div>
                </div>
                <div className='closePopup' onClick={() => setPopup(false)}></div>
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
                />}
            </div>
        </div>
    )
}


export default Popup