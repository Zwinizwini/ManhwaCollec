import { useEffect, useState } from 'react'
import '../styles/Popup.css'

//Permet de tranformer le nom du manhwa en ses initial
// const initialManhwa = (manhwa) => {
//     const iti = manhwa.split(" ")
//     return iti.reduce((acc, mot) => acc + mot[0], "").toLocaleUpperCase()
// }

const styleCouleur = (status) => {
    if (status === "En Cours" || status === "Hiatus") return '#378ADD'
    if (status === "Pas lu") return '#555555'
    return '#1D9E75'
}

const Modifier = ({id, title, chapter, status, nsfw, cover, description, link, setModifier, maxChapter, manhwaList}) => {
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') setModifier(false)
        }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [])

    const handleMAJ = () => {
        const manhwa = manhwaList.find((manhwa) => manhwa.id === id)
        const index = manhwaList.findIndex((manhwa) => manhwa.id === id)
        manhwa.title = updateTitle
        manhwa.description = desc
        manhwa.chapter = updateChapter
        if (updateChapter > maxChapter) manhwa.maxChapter = updateChapter
        manhwa.cover = urlCover
        manhwa.link = updateURL
        manhwa.status = updateStatus
        if (updateChapter !== chapter) manhwa.lastRead = new Date()
        
        manhwaList[index] = manhwa
        localStorage.setItem("manhwaList", JSON.stringify(manhwaList))
        setModifier(false)
    }

    const couleurStatus = styleCouleur(status)
    const [desc, setDesc] = useState(description)
    const [urlCover, setURLCoser] = useState(cover)
    const [updateChapter, setChapter] = useState(chapter)
    const [updateTitle, setTitle] = useState(title)
    const [updateURL, setURL] = useState(link)
    const [updateStatus, setUpdateStatus] = useState(status)
    


    return (
        <div className='popupBackground'>
            <div className="popup">
                <div className='container-hover' id='container-popup'>
                    <img src={cover} alt={`Cover de ${title}`} className="manhwa-item-cover"/>
                    <span className="status" style={{background:couleurStatus}}>{status}</span>
                    {nsfw===1 && <span className="nsfw">18+</span>}
                </div>
                <div className='snd-container'>
                    <input onChange={(e) => setTitle(e.target.value)} value={updateTitle} id='changeTitle'/>
                    <textarea onChange={(e) => setDesc(e.target.value)} value={desc} placeholder='Description'/>

                    <div className='popupInfo'>
                        <div>
                            <p>URL</p>
                            <input type="text" value={updateURL} onChange={(e) => setURL(e.target.value)}/>
                        </div>
                        <div>
                            <p>Dernier Lu</p>
                            <input type="number" value={updateChapter} onChange={(e) => setChapter(e.target.value)}/>
                        </div>
                        <div>
                            <p>URL Cover</p>
                            <input type="text" value={urlCover} onChange={(e) => setURLCoser(e.target.value)}/>
                        </div>
                        <div>
                            <p>Status</p>
                            <select value={updateStatus}
                                    onChange={(e) => setUpdateStatus(e.target.value)}
                                    name='status'
                            >
                                <option value="Fini">Fini</option>
                                <option value="En Cours">En Cours</option>
                                <option value="Hiatus">Hiatus</option>
                                <option value="Pas lu">Pas lu</option>
                            </select>
                        </div>
                    </div>
                    <button onClick={() => handleMAJ()} className='btn-modif'>Mettre à Jour</button>
                    
                </div>
                <div className='closePopup' onClick={() => setModifier(false)}>
                    <div className='gauche'></div>
                    <div className='droite'></div>
                </div>
            </div>
        </div>
    )
}


export default Modifier