import { useEffect, useState } from "react"
import { supabase } from "../supabase"
import sadako from '../assets/sadako2.PNG'
import EditLienExt from "./EditLienExt"

const BtnLien = ({user_id}) => {

    const [listeLien, setLL] = useState({})
    const [isEdit, setEdit] = useState(false)

    useEffect( () => {
        const getUser = async () => {
            const { data, error } = await supabase
                .from("profiles")
                .select()
                .eq('id', user_id)
            if (error) console.error(error)
            if (data) {
                setLL({
                    lien_film: data[0].lien_film,
                    lien_jeu: data[0].lien_jeu
                })
            }
        } 
        getUser()
    },[])


    const extractName = (nom) => {
        return nom.split('/')[2].split('.')[0]
    }
    
    const clapBW = Array.from({length:10})

    return (
        <div className="btnLien">
            {listeLien?.lien_film && 
                <a href={listeLien.lien_film} target="_blank" className="clapFilm">
                    <div className="up">
                        {clapBW.map((_,index) => (
                            <span key={index}></span>
                        ))}
                    </div>
                    <div className="down">
                        <img src={sadako} alt="sadako" />
                        <div>
                            {clapBW.map((_,index) => (
                                <span key={index}></span>
                            ))}
                        </div>
                        {extractName(listeLien.lien_film)}
                    </div>
                    <div className="svg">
                        <svg width={20} height={20} viewBox="0 0 20 20" fill="rgb(10, 10, 10)" >
                            <path d="M0 0 V20 H20 V13 L7 0 Z"/>
                        </svg>
                        <div></div>
                    </div>
                </a>
            }
            {listeLien?.lien_jeu &&
                <a href={listeLien.lien_jeu} target="_blank" className="jeu">
                    <div class="loader-packman"></div>
                    <p>{extractName(listeLien.lien_jeu)}</p>
                </a>
            }
            <button onClick={() => setEdit(true)} className="btnNav">
                <svg 
                    width={16} 
                    height={16} 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke='#fff' 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                >
                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                </svg>
                Modifier
            </button>
            {isEdit && <EditLienExt setEdit={setEdit} setLL={setLL} user_id={user_id}/>}
        </div>
    )
}

export default BtnLien
