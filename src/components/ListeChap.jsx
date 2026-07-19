import { useState } from 'react'
import Searchbar from '../components/Searchbar'
import styled from 'styled-components'

const Bars = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 2px;
  height: 16px;
`

const Bar = styled.span`
  width: ${({ h }) => h}px;
  border-radius: 1px;
  background: #7F77DD;
  height: 3px;
`

const ArrowIcon = styled.svg`
  width: 16px;
  height: 16px;
  transform: rotate(${({ $up }) => $up ? '180deg' : '0deg'});
  transition: transform 0.2s ease;
`


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

    const ligne = [15,10,8]
    const [search, setSearch] = useState('')
    const [listeUpdate, setLU] = useState(Array.from({ length: maxChapter }, (_, i) => ({ nom: `Chapitre ${i+1}`, numero: i+1 })))
    const listeChap = listeUpdate.filter(elem => elem.nom.toLowerCase().includes(search.toLowerCase())).reverse()

    return (
        <div className="selectChap">
            <div className="menuChap">
                <label className='input'><Searchbar search={search} setSearch={setSearch}/></label>
                <button onClick={() => {setLU([...listeUpdate].reverse())}}> 
                    <div>
                        <Bars>
                            {ligne.map((h, i) => <Bar key={i} h={h} />)}
                        </Bars>
                        <ArrowIcon $up={listeChap.length > 0 ? listeChap[0].numero === 1 : false} viewBox="0 0 24 24" fill="none">
                            <path
                            d="M12 4L12 20M12 20L6 14M12 20L18 14"
                            stroke="#7F77DD"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            />
                        </ArrowIcon>
                    </div>
                </button>
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
