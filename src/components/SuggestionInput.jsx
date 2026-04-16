import { useContext, useState } from "react"
import { ManhwaContext, OtherManhwaContext } from "../utils/Context"
import styled from "styled-components"

const StyledSuggestion = styled.ul`
    position: absolute;
    top: 100%;
    background: #16191f;
    border-radius: 10px;
    box-shadow: #7F77DD 1px 1px 5px;
    width: 99%;
    padding: 0;
    max-height: 80px;
    overflow: auto;
    margin: 0;
    color: #ccc;
    & li {
        padding: 5px 10px;
        list-style: none;
    }
    & li:hover {
        background-color: #7F77DD;
        color: white;
    }
`


const SuggestionInput = ({title, setTitle, setCover, setMaxChapter}) => {
    const {manhwaList} = useContext(ManhwaContext)
    const {otherManhwaList} = useContext(OtherManhwaContext)
    const [isSuggest, setIsSuggest] = useState(false)
    const titreDejaVu = new Set()


    const nameManhwaList = manhwaList.map((manhwa) => manhwa.title.toLowerCase().replaceAll(" ",""))
    const manhwaNotCorrespond = otherManhwaList.filter((manhwa) => {
      const titreNettoye = manhwa.title.toLowerCase().replaceAll(" ", "")
      const estExclu = nameManhwaList.includes(titreNettoye)
      const dejaVu = titreDejaVu.has(titreNettoye)
      if (!estExclu && !dejaVu) {
        titreDejaVu.add(titreNettoye)
        return true
      }
      return false
    })
    const suggestionManhwa = title.length > 0 ? manhwaNotCorrespond.filter((manhwa) => manhwa.title.toLowerCase().includes(title.toLocaleLowerCase())) : []

    return (
        <div style={{position: 'relative'}}>
            <input type="text" value={title} onChange={(e) => {
                setTitle(e.target.value)
                setIsSuggest(true)
            }} placeholder="Ex: My Bias..."/>
            {isSuggest && <StyledSuggestion className="suggestionManhwa" onClick={() => setIsSuggest(false)}>
                {suggestionManhwa.map((manhwa, index) => (
                    <li key={index} onClick={() => {
                        setTitle(manhwa.title)
                        setCover(manhwa.cover)
                        setMaxChapter(manhwa.maxChapter)
                        setIsSuggest(false)
                    }}>{manhwa.title}</li>
                ))}
            </StyledSuggestion>}
        </div>
    )
}

export default SuggestionInput