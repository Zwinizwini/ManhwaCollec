import { useState } from "react"
import styled from "styled-components"
import { supabase } from "../supabase"

const DivBack = styled.div`
    position: fixed;
    top: 0%;
    left: 0%;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    & .container {
        width: 300px;
        height: 150px;
        background-color: #1c1f27;
        border-radius: 10px;
        border: 1px solid #7f77dd;
        box-shadow: #7f77dd 2px 2px 5px;
        display: flex;
        flex-direction: column;
        padding: 10px;
        gap: 20px;
        justify-content: center;
        align-content: center;
    }
`

const LabelInfo = styled.label`
    height: 35px;
    background-color: #16191f;
    padding: 8px;
    border-radius: 5px;
    position: relative;
    color: white;
    text-align: left;
    cursor: pointer;
    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background-color: #7F77DD;
        transition: all .3s ease-in-out
    }
    & input {
        background: none;
        border: none;
        color: white;
    }
    &:focus-within::after {
        width: 100%;
        box-shadow: #7F77DD 0px 0px 5px;
    }
    & input {
        outline: none;
    }

`



const EditLienExt = ({setEdit, user_id, setLL}) => {

    const [objLien, setOBL] = useState({lien: '', media: 'Film'})

    const updateLien = async (categorie) => {
        const { data, error } = await supabase
            .from('profiles')
            .update({[categorie] : objLien.lien})
            .eq('id', user_id)
            .select()
        
        if (error) console.error(error)
        if (data) {
            setLL(prev => ({
                ...prev,
                [categorie]: objLien.lien
            }))
            setEdit(false)
        }
        return data
    }

    
    const validClick = () => {
        const categorie = objLien.media === 'Film' ? 'lien_film' : 'lien_jeu'
        updateLien(categorie)
    }

    return (
        <DivBack onClick={(e) => {
            if (e.target === e.currentTarget) setEdit(false)
        }}>
            <div className="container">
                <LabelInfo>
                    <p>Lien</p>
                    <input onChange={(e) => setOBL(prev => ({
                            ...prev,
                            lien: e.target.value
                        }))} value={objLien.lien}
                        type="url"
                    />
                </LabelInfo>
                <select value={objLien.media}
                    onChange={(e) => setOBL(prev => ({
                        ...prev,
                        media: e.target.value
                    }))}
                    name='media'
                >
                    <option value="Film">Film</option>
                    <option value="Jeu">Jeux</option>
                </select>
                <button onClick={() => validClick()}>Valider</button>
            </div>
        </DivBack>
    )
}

export default EditLienExt
