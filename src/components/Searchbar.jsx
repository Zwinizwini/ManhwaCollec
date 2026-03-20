import { useState } from "react"
import '../styles/Searchbar.css'

const Searchbar = ({activeList, setActiveList, manhwaList}) => {
    const [inputValue, setInputValue] = useState('')
    return (
        <input 
            placeholder="Rechercher un manhwa"
            value={inputValue}
            onChange={(e) => {
                setInputValue(e.target.value)
                setActiveList(manhwaList.filter((manhwa) => manhwa.title.toLowerCase().includes(e.target.value.toLowerCase())))
            }}
        />

    )
}

export default Searchbar