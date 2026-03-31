import { useEffect, useState } from "react"


const Sort = ({manhwaList, saveManhwaList}) => {
    const trierLocal = localStorage.getItem("trier")
    const [trierState, setTrierState] = useState(trierLocal ? JSON.parse(trierLocal) : 0)

    useEffect(() => {
        localStorage.setItem('trier', JSON.stringify(trierState))
    },[trierState])

    const trier = (e) => {
        if (e === "1") {           
            saveManhwaList(manhwaList.toSorted((a,b) => {
                const noteA = a.note ? a.note : 0
                const noteB = b.note ? b.note : 0
                if (noteA < noteB) return 1
                if (noteA > noteB) return -1
                return 0
            }))
        } else if (e === "2") {
            saveManhwaList(manhwaList.toSorted((a,b) => {
                const noteA = a.note ? a.note : 0
                const noteB = b.note ? b.note : 0
                if (noteA < noteB) return -1
                if (noteA > noteB) return 1
                return 0
            }))
        }
    }

    return (
        <select
            value={trierState}
            name="trier"
            onChange={(e) => {
                setTrierState(e.target.value)
                trier(e.target.value)}                
            }
            className="trieSelect"
        >
            <option value="0">Par Default</option>
            <option value="1">Note ↓</option>
            <option value="2">Note ↑</option>
        </select>
    )
}

export default Sort