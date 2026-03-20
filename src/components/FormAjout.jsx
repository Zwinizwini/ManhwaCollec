import { useState, useEffect } from "react"
import '../styles/FormAjout.css'

const FormAjout = ({isForm, setForm, manhwaList}) => {

    const btnAjout = () => {
        ajoutManhwa()
        setForm(false)
    }

    const initialManhwa = (manhwa) => {
        const iti = manhwa.split(" ")
        return iti.reduce((acc, mot) => acc + mot[0], "").toLocaleUpperCase()
    }

    const ajoutManhwa = () => {
        let dateJour = ""
        const maxChapterCond = maxChapter === 0 ? 1 : maxChapter
        if (statusAjout !== "Pas lu") {
            dateJour = new Date()
        }
        const manhwaObj = {
            id: initialManhwa(title)+manhwaList.length,
            title: `${title}`,
            chapter: `${chapter}`,
            maxChapter: maxChapterCond,
            status: statusAjout,
            link: `${urlChapt}`,
            lastReadCount: "",
            lastRead: `${dateJour}`,
            description: `${desc}`,
            nsfw: nsfw,
            cover: `${cover}`
        }
        console.log(manhwaObj)
        manhwaList.push(manhwaObj)
        localStorage.setItem("manhwaList", JSON.stringify(manhwaList))
    }

    useEffect(() => {
        if (isForm) {
            document.body.style.overflow = "hidden"
            window.scrollBy(0,-window.innerHeight)
        } else { 
            document.body.style.overflow = ""
        }
        return () => {document.body.style.overflow = ""}
    }, [isForm])
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') setForm(false)
        }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [])

    const [title, setTitle] = useState('')
    const [cover, setCover] = useState('')
    const [maxChapter, setMaxChapter] = useState(0)
    const [chapter, setChapter] = useState(0)
    const [urlChapt, setURLChapter] = useState('')
    const [desc, setDesc] = useState('')
    const [statusAjout, setStatusAjout] = useState('')
    const [nsfw, setNSFW] = useState(0)

    return (
        <div className="popupAjoutBack">
            <div className="popupAjout">
                <div className="head">
                    <h2>Ajouter un manhwa</h2>
                    <div onClick={() => setForm(false)}>
                        <img src="" alt="" />ddd
                    </div>
                </div>
                <div className="ajout-body">
                    <label>
                        Titre <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ex: My Bias..."/>
                    </label>
                    <label>
                        URL de la cover <input type="text" value={cover} onChange={(e) => setCover(e.target.value)} placeholder="https://..."/>
                    </label>
                    <div className="radio-status">
                        <label className="bleu">
                            <input type="radio" name="radioStatus" value="En Cours" onClick={() => setStatusAjout("En Cours")}/> En Cours
                        </label>
                        <label className="vert">
                            <input type="radio" name="radioStatus" value="Fini" onClick={() => setStatusAjout("Fini")}/> Fini
                        </label>
                        <label className="jaune">
                            <input type="radio" name="radioStatus" value="Hiatus" onClick={() => setStatusAjout("Hiatus")}/> Hiatus
                        </label>
                        <label className="noir">
                            <input type="radio" name="radioStatus" value="Pas lu" onClick={() => setStatusAjout("Pas lu")}/> Pas Lu
                        </label>
                    </div>
                    <div className="formChapter">
                        <label>
                            Chapitre max <input type="text" value={maxChapter} onChange={(e) => setMaxChapter(e.target.value)} placeholder="Ex: 200"/>
                        </label>
                        <label>
                            Chapitre actuel <input type="text" value={chapter} onChange={(e) => setChapter(e.target.value)} placeholder="Ex: 45"/>
                        </label>
                    </div>
                    <label>
                        Lien de lecture <input type="text" value={urlChapt} onChange={(e) => setURLChapter(e.target.value)} placeholder="https://..."/>
                    </label>
                    <label>
                        Description
                        <textarea name="desc" id="desc"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            placeholder="Un court résumé du manhwa..."
                        />
                    </label>
                    <label>
                        <div onChange={(e) => {e.target.checked ? setNSFW(1) : setNSFW(0)}}>Contenu adulte <span className="nsfwSpan">18 +</span> <input type="checkbox"/></div>
                    </label>
                </div>
                <div className="foot">
                    <button onClick={() => btnAjout()}>+ Ajouter</button>
                </div>
            </div>
        </div>
    )

    
}

export default FormAjout