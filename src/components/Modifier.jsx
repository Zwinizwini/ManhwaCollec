import { useEffect, useState } from 'react'
import '../styles/Popup.css'
import { supabase } from '../supabase'
import ModifTag from './ModifTag'


const clickSelectTag = () => {
    document.querySelector('.select-tag').classList.toggle('openTag')
}




const Modifier = ({id, modifier, setModifier, manhwaList, updateManhwalist, tag, setManhwa, manhwa}) => {
    const [isClose, setIC] = useState(false)

    const closeModif = () => {
        setIC(true)
        setTimeout(() => setModifier(false), 300)
    }

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') closeModif()
        }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [])
    useEffect(() => {
        if (modifier) {
            document.body.style.overflow = "hidden"
        } 
        return () => {document.body.style.overflow = ""}
    }, [modifier])


    const updateManhwa = async (id, updates) => {
        const { data, error } = await supabase
            .from('manhwas')
            .update(updates)
            .eq('id', id)
        
        if (error) console.error(error)
        return data
    }

    const handleMAJ = () => {     
        const updateValue = {
            ...manhwaUpdate,
            tag: tagUpdate.toString(),
            maxChapter: manhwaUpdate.maxChapter < manhwaUpdate.chapter ? manhwaUpdate.chapter : manhwaUpdate.maxChapter,
            lastRead: manhwa.chapter !== manhwaUpdate.chapter ? new Date().toISOString() : manhwaUpdate.lastRead
        }   
        setMU(updateValue)
        const updateList = manhwaList.map((m) => (
            m.id === id ? {
                ...updateValue
            } : m
        ))
        updateManhwa(id, updateValue)
        updateManhwalist(updateList)
        setManhwa(updateValue)
        closeModif()
    }

    const [tagUpdate, setTagUpdate] = useState(tag)
    const [manhwaUpdate, setMU] = useState(manhwa)

    

    const manhwaMAJ = (e,key) => {
        setMU(prev => ({
            ...prev,
            [key]: e
        }))
    }

    return (
        <div className='popupBackground' onClick={(e) => {
            if (e.target.className === 'popupBackground') closeModif()
        }}>
            <div className="popup" id='popupModif' style={{animation: isClose ? 'fermeture .3s ease-in-out both' : 'ouverture .3s ease-in-out both'}}>
                <div className='img-popup'>
                    <img src={manhwaUpdate.cover} alt={`Cover de ${manhwaUpdate.title}`}/>
                </div>
                <div className='snd-container'>
                    <div className="popupInfo">
                        <label className="divInvo">
                            <p>Titre</p>
                            <input onChange={(e) => manhwaMAJ(e.target.value, 'title')} value={manhwaUpdate.title}/>
                        </label>
                        <label className="divInvo">
                            <p>Note</p>
                            <div className='input-note'><input type="number" min="0" max="10"
                                value={manhwaUpdate.note}
                                onChange={(e) => {
                                    if (e.target.value > 10) {
                                        manhwaMAJ(10, 'note')
                                    } else if (e.target.value < 0) {
                                        manhwaMAJ(0, 'note')
                                    } else {
                                        manhwaMAJ(parseFloat(e.target.value), 'note')
                                    }
                                }}    
                            />/10</div>
                        </label>
                        <textarea 
                            onChange={(e) => manhwaMAJ(e.target.value, 'description')} 
                            value={manhwaUpdate.description} placeholder='Description'/>
                    </div>

                    <div className='popupInfo'>
                        <label className='divInvo'>
                            <p>Max Chapter</p>
                            <div className="number-style">
                                <input type="number" value={manhwaUpdate.maxChapter} onChange={(e) => manhwaMAJ(parseInt(e.target.value), 'maxChapter')}/>
                                <div>
                                    <span id='spanplus' onClick={() => manhwaMAJ(parseInt(manhwaUpdate.maxChapter)+1, 'maxChapter')}>+</span>
                                    <span id='spanmoins' onClick={() => manhwaMAJ(parseInt(manhwaUpdate.maxChapter)-1, 'maxChapter')}>-</span>
                                </div>
                            </div>
                        </label>
                        <label className='divInvo'>
                            <p>Dernier Lu</p>
                            <div className="number-style">
                                <input type="number" value={manhwaUpdate.chapter} onChange={(e) => manhwaMAJ(parseInt(e.target.value), 'chapter')}/>
                                <div>
                                    <span id='spanplus' onClick={() => manhwaMAJ(parseInt(manhwaUpdate.chapter)+1, 'chapter')}>+</span>
                                    <span id='spanmoins' onClick={() => manhwaMAJ(parseInt(manhwaUpdate.chapter)-1, 'chapter')}>-</span>
                                </div>
                            </div>
                        </label>
                        <label className='divInvo'>
                            <p>URL Cover</p>
                            <input type="text" value={manhwaUpdate.cover} onChange={(e) => manhwaMAJ(e.target.value, 'cover')}/>
                        </label>
                        <div className='divInvo'>
                            <p>Status</p>
                            <select value={manhwaUpdate.status}
                                onChange={(e) => manhwaMAJ(e.target.value, 'status')}
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
                            <input type="text" value={manhwaUpdate.link} onChange={(e) => manhwaMAJ(e.target.value, 'link')}/>
                        </label>
                        <div className='divInvo' onClick={() => clickSelectTag()}>
                            <p>Tag Liste</p>
                            <ModifTag tagList={tagUpdate} setTagUpdate={setTagUpdate}/>
                        </div>
                    </div>
                    <button onClick={() => handleMAJ()} className='btn-modif'>Mettre à Jour</button>
                    
                </div>
                <div className='closePopup' onClick={() => {
                        closeModif()
                    }}>
                    <div className='gauche'></div>
                    <div className='droite'></div>
                </div>
            </div>
        </div>
    )
}


export default Modifier