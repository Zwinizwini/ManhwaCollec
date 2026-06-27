import { useEffect, useState } from 'react'
import '../styles/Popup.css'
import { styleCouleur } from '../utils/colors'
import { supabase } from '../supabase'
import ModifTag from './ModifTag'


const clickSelectTag = () => {
    document.querySelector('.select-tag').classList.toggle('openTag')
}


const Modifier = ({id, title, chapter, status, nsfw, cover, description, link, setModifier, maxChapter, manhwaList, updateManhwalist, note, lastRead, setChapUpdate, tag}) => {
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') setModifier(false)
        }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [])

    const updateManhwa = async (id, updates) => {
        const { data, error } = await supabase
            .from('manhwas')
            .update(updates)
            .eq('id', id)
        
        if (error) console.error(error)
        return data
    }

    const handleMAJ = () => {        
        const manhwaUpdate = {
            title: updateTitle,
            description: desc,
            chapter: parseInt(updateChapter),
            maxChapter: parseInt(updateChapter) > parseInt(updateMaxChap) ? parseInt(updateChapter) : parseInt(updateMaxChap),
            cover: urlCover,
            link: updateURL,
            status: updateStatus,
            lastRead: updateChapter !== chapter ? new Date().toISOString() : lastRead,
            lastReadCount: "0",
            note: noteM && parseFloat(noteM),
            tag: tagUpdate.toString()
        }
        const updateList = manhwaList.map((m) => (
            m.id === id ? {
                ...m,
                title: updateTitle,
                description: desc,
                chapter: updateChapter,
                maxChapter: parseInt(updateChapter) > parseInt(updateMaxChap) ? updateChapter : updateMaxChap,
                cover: urlCover,
                link: updateURL,
                status: updateStatus,
                lastRead: updateChapter !== chapter ? new Date().toISOString() : m.lastRead,
                lastReadCount: "0",
                note: noteM && parseFloat(noteM),
                tag: tagUpdate.toString()
            } : m
        ))
        setChapUpdate(parseInt(updateChapter) > parseInt(updateMaxChap) ? updateChapter : updateMaxChap)
        updateManhwa(id, manhwaUpdate)
        updateManhwalist(updateList)
        setModifier(false)
    }

    const couleurStatus = styleCouleur(status)
    const [desc, setDesc] = useState(description)
    const [urlCover, setURLCoser] = useState(cover)
    const [updateChapter, setChapter] = useState(chapter)
    const [updateTitle, setTitle] = useState(title)
    const [updateURL, setURL] = useState(link)
    const [updateStatus, setUpdateStatus] = useState(status)
    const [noteM, setNote] = useState(note)
    const [updateMaxChap, setMaxChap] = useState(maxChapter)
    const [tagUpdate, setTagUpdate] = useState(tag)
    


    return (
        <div className='popupBackground'>
            <div className="popup" id='popupModif'>
                <div className='img-popup'>
                    <img src={cover} alt={`Cover de ${title}`}/>
                </div>
                <div className='snd-container'>
                    <div className="popupInfo">
                        <label className="divInvo">
                            <p>Titre</p>
                            <input onChange={(e) => setTitle(e.target.value)} value={updateTitle}/>
                        </label>
                        <label className="divInvo">
                            <p>Note</p>
                            <div className='input-note'><input type="number" min="0" max="10"
                                value={noteM}
                                onChange={(e) => {
                                    if (e.target.value > 10) {
                                        setNote(10)
                                    } else if (e.target.value < 0) {
                                        setNote(0)
                                    } else {
                                        setNote(e.target.value)
                                    }
                                }}    
                            />/10</div>
                        </label>
                        <textarea onChange={(e) => setDesc(e.target.value)} value={desc} placeholder='Description'/>
                    </div>

                    <div className='popupInfo'>
                        <label className='divInvo'>
                            <p>Max Chapter</p>
                            <input type="number" value={updateMaxChap} onChange={(e) => setMaxChap(e.target.value)}/>
                        </label>
                        <label className='divInvo'>
                            <p>Dernier Lu</p>
                            <input type="number" value={updateChapter} onChange={(e) => setChapter(e.target.value)}/>
                        </label>
                        <label className='divInvo'>
                            <p>URL Cover</p>
                            <input type="text" value={urlCover} onChange={(e) => setURLCoser(e.target.value)}/>
                        </label>
                        <div className='divInvo'>
                            <p>Status</p>
                            <select value={updateStatus}
                                onChange={(e) => setUpdateStatus(e.target.value)}
                                name='status'
                            >
                                <option value="Fini">Fini</option>
                                <option value="En Cours">En Cours</option>
                                <option value="Hiatus">Hiatus</option>
                                <option value="Pas lu">Pas lu</option>
                                <option value="Drop">Drop</option>
                            </select>
                        </div>
                        <label className='divInvo'>
                            <p>URL Lecture</p>
                            <input type="text" value={updateURL} onChange={(e) => setURL(e.target.value)}/>
                        </label>
                        <div className='divInvo' onClick={() => clickSelectTag()}>
                            <p>Tag Liste</p>
                            <ModifTag tagList={tagUpdate} setTagUpdate={setTagUpdate}/>
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