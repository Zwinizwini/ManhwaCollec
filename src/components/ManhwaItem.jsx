import { useState } from 'react'
import '../styles/ManhwaItem.css'
import Popup from './Popup'

const styleCouleur = (status) => {
    if (status === "En Cours" || status === "Hiatus") return '#378ADD'
    if (status === "Pas lu") return '#555555'
    if (status === "Drop") return '#791F1F'
    return '#1D9E75'
}

const ManhwaItem = ({id, title, chapter, status, lastRead, nsfw, cover, lastReadCount, description,link, maxChapter, manhwaList, updateManhwalist, note}) => {
    const [isPopup, setPopup] = useState(false)
    const dateNow = new Date()
    const [day, month, year] = lastRead.split('/')
    const lastReadDate = new Date(`${year}-${month}-${day}`)
    const lastReadCompter = Math.floor((dateNow - lastReadDate) / (1000 * 60 * 60 * 24))
    const couleurStatus = styleCouleur(status)
    const gradientSeuil = Math.round((parseInt(chapter)/maxChapter) * 100)

    return (
        <>
            <li className="manhwa-item">
                <div
                    className='container-hover'
                    onClick={() => setPopup(true)}
                >
                    {cover && <img src={cover} alt={`Cover de ${title}`} className="manhwa-item-cover"/>}
                    <span className="name-hover">{title}</span>
                    <span className="status" style={{background:couleurStatus}}>{status}</span>
                    {nsfw===1 && <span className="nsfw">18+</span>}
                    <div className='info-hover'>
                        <div>
                            {chapter !== "" && <span>Ch. {chapter}</span>}
                            {lastRead !== "" && lastReadCount !== "" && <span>{lastReadCompter} jours</span>}
                        </div>
                        <div className='progression-bar' style={{background: `linear-gradient(to right,#39FF14 ${gradientSeuil}%, black ${gradientSeuil}%)`}}></div>
                    </div>
                    {note && <span className='note-hover'>{note}<span>★</span></span>}
                </div>
            </li>
            {isPopup && 
                <Popup 
                    title={title}
                    chapter={chapter}
                    status={status}
                    lastRead={lastRead}
                    lastReadCompter={lastReadCompter}
                    nsfw={nsfw}
                    cover={cover}
                    description={description}
                    link={link}
                    setPopup={setPopup}
                    isPopup={isPopup}
                    maxChapter={maxChapter}
                    id={id}
                    manhwaList={manhwaList}
                    updateManhwalist={updateManhwalist}
                    note={note}
                />
            }
        </>

    )
}

export default ManhwaItem