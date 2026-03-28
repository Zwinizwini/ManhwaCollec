import { useEffect, useState } from 'react'
import '../styles/Popup.css'
import PopupInfo from './PopupInfo'
import Modifier from './Modifier'
import { styleCouleur } from '../utils/colors'

//Permet de tranformer le nom du manhwa en ses initial
// const initialManhwa = (manhwa) => {
//     const iti = manhwa.split(" ")
//     return iti.reduce((acc, mot) => acc + mot[0], "").toLocaleUpperCase()
// }

const Popup = ({id, title, chapter, status, nsfw, cover, lastReadCompter, description, link, setPopup, isPopup, maxChapter, manhwaList, updateManhwalist, note}) => {
    useEffect(() => {
        if (isPopup) {
                document.body.style.overflow = "hidden"
                

            } else { 
                document.body.style.overflow = ""
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
        <div className='popupBackground'>
            <div className="popup">
                <div className='container-hover' id='container-popup'>
                    <img src={cover} alt={`Cover de ${title}`} className="manhwa-item-cover" id='img-popup'/>
                    <span className="status" style={{background:couleurStatus}}>{status}</span>
                    {nsfw===1 && <span className="nsfw">18+</span>}
                </div>
                <div className='snd-container'>
                    <h2>{title}</h2>
                    {note && <div className='note'><span style={{fontSize:"22px"}}>{note}</span><span style={{fontSize:"12px", color:"#888"}}>/10</span></div>}
                    {description && <p className='description'>{description}</p>
                    }

                    <div className='popupInfo'>
                        <PopupInfo info1={"Chapitre"} info2={`${maxChapter}`}/>
                        <PopupInfo info1={"Dernier Lu"} info2={`Ch. ${chapter}`}/>
                        <PopupInfo info1={"Lu il y a"} info2={`${lastReadCompter ? lastReadCompter : 0} jours`}/>
                        <PopupInfo info1={"Progression"} info2={`${Math.round((parseInt(chapter)/maxChapter) * 100)}%`} />
                    </div>
                    {link && <a href={link+chapter} className='bouton-chap' target='__blank'>Voir le lien de lecture</a>}
                </div>
                <div className='closePopup' onClick={() => setPopup(false)}></div>
                <button onClick={() => setModifier(true)} className='btn-modif'>Modifier</button>
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
                />}
            </div>
        </div>
    )
}


export default Popup