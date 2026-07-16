import { useState } from 'react'
import Searchbar from '../components/Searchbar'


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

const ListeChap = ({lien, maxChapter}) => {

    const [search, setSearch] = useState('')
    const [listeUpdate, setLU] = useState(Array.from({ length: maxChapter }, (_, i) => ({ nom: `Chapitre ${i+1}`, numero: i+1 })))
    const listeChap = listeUpdate.filter(elem => elem.nom.toLowerCase().includes(search.toLowerCase())).reverse()

    return (
        <div className="selectChap">
            <div className="menuChap">
                <label className='input'><Searchbar search={search} setSearch={setSearch}/></label>
                <button onClick={() => {setLU([...listeUpdate].reverse())}}>Chap <span>{listeChap.length > 0 ? (listeChap[0].numero === 1 ? '↑' : '↓') : '↓'}</span></button>
            </div>
            <div className="listeChap">
                {listeChap.map((elem, index) => (
                    <a href={changeLink(lien, elem.numero)} target='__blank' key={index+1}>{elem.nom}</a>
                ))}
            </div>
        </div>
    )
}

export default ListeChap
