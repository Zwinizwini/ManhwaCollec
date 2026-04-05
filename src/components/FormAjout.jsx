import { useState, useEffect, useContext } from "react"
import '../styles/FormAjout.css'
import { ManhwaContext } from "../utils/Context"
import styled from "styled-components"
import {colors} from "../utils/colors"
import { supabase } from "../supabase"
import { useAuth } from "../utils/AuthContext"

const BtnHead = styled.button`
    background-color: ${({rapid}) =>
        rapid ? colors.violet : '#23262c'};
    color: ${({rapid}) =>
        rapid ? 'white' : '#888'};
    border-radius: 10px;
    width: 100px;
    height: 30px;
    border: 1px solid ${({rapid}) =>
        rapid ? colors.violet : '#888'};
    margin-left: 10px;
    margin-right: 10px;
    cursor: pointer;
`

const FormAjout = ({isForm, setForm, setAjoutList}) => {
    const {manhwaList, saveManhwaList} = useContext(ManhwaContext)
    const {user} = useAuth()

    async function recupManhwa(id) {
        try {
            const response = await fetch(`https://api.jikan.moe/v4/manga/${id}`)
            const {data} = await response.json()
            ajoutManhwa(data) 
        } catch (err) {
            console.log(err);
        }
    }

    const btnAjout = () => {
        idMAL ? recupManhwa(idMAL) : ajoutManhwa()
        setForm(false)
    }

    const addManhwa = async (manhwa) => {
        const { data, error } = await supabase
            .from('manhwas')
            .insert(manhwa)
            .select()
        
        if (error) console.error(error)
        
        manhwa.id = data[0].id
        const newList = [...manhwaList, manhwa]
        saveManhwaList(newList)
        setAjoutList(true)
    }

    const ajoutManhwa = (data) => {
        let maxChapterFinal, titre, image
        const maxChapterCond = maxChapter < chapter ? chapter : maxChapter
        if (data) {
            maxChapterFinal = data.chapters ? data.chapters : maxChapterCond
            titre = data.titles[0].title ? data.titles[0].title : title
            image = data.images.jpg.image_url ? data.images.jpg.image_url : cover
        } else {
            maxChapterFinal = maxChapterCond
            titre = title
            image = cover
        }
        
        const manhwaObj = {
            
            title: titre,
            user_id: user.id,
            chapter: parseInt(chapter),
            maxChapter: parseInt(maxChapterFinal),
            status: statusAjout,
            link: urlChapt,
            lastReadCount: statusAjout !== "Pas lu" ? "0" : "",
            lastRead: new Date().toISOString(),
            description: desc,
            nsfw: nsfw,
            cover: image,
            ...(idMAL && { idmal: idMAL })
        }

        addManhwa(manhwaObj)
        
    }

    useEffect(() => {
        if (isForm) {
            document.body.style.overflow = "hidden"
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
    const [maxChapter, setMaxChapter] = useState(1)
    const [chapter, setChapter] = useState(0)
    const [urlChapt, setURLChapter] = useState('')
    const [desc, setDesc] = useState('')
    const [statusAjout, setStatusAjout] = useState('Pas lu')
    const [nsfw, setNSFW] = useState(0)
    const [idMAL, setIdMAL] = useState('')
    const [rapid, setRapid] = useState(true)

    return (
        <div className="popupAjoutBack" onClick={(e) => {
            e.target.className === 'popupAjoutBack' && setForm(false)
        }}>
            <div className="popupAjout">
                <div className="head">
                    <h2>Ajouter un manhwa</h2>
                    <div onClick={() => setForm(false)} className="closeAjout"></div>
                </div>
                <div className="ajout-body">
                    <BtnHead onClick={() => setRapid(true)} rapid={rapid}>Par Id</BtnHead>
                    <BtnHead onClick={() => setRapid(false)} rapid={!rapid}>Manuel</BtnHead>
                    <div>
                        {rapid ? <label>
                            Id Mal <input type="number" value={idMAL} onChange={(e) => setIdMAL(e.target.value)} placeholder="https://myanimelist.net/manga/--->178671<---"/>
                        </label>
                        :
                        <>
                        <label>
                            Titre <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ex: My Bias..."/>
                        </label>
                        <label>
                            URL de la cover <input type="text" value={cover} onChange={(e) => setCover(e.target.value)} placeholder="https://..."/>
                        </label>
                        </>
                        }
                    </div>
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
                            <input type="radio" name="radioStatus" value="Pas lu" onClick={() => setStatusAjout("Pas lu")} defaultChecked/> Pas Lu
                        </label>
                        <label className="rouge">
                            <input type="radio" name="radioStatus" value="Drop" onClick={() => setStatusAjout("Drop")}/> Drop
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
                        <div onChange={(e) => {e.target.checked ? setNSFW(1) : setNSFW(0)}}
                            className="divNsfw"
                        >
                            <div>
                                Contenu adulte 
                                <span className="nsfwSpan">18 +</span>
                            </div> 
                            <div className="switchNSFW"><div></div></div>
                            <input type="checkbox" id="inputNsfw"/>
                        </div>
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