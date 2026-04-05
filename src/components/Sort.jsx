import { useEffect } from "react"


const Sort = ({trie, setTrie}) => {
    
    useEffect(() => {
        localStorage.setItem('trier', JSON.stringify(trie))
    },[trie])


    return (
        <select
            value={trie}
            name="trier"
            onChange={(e) => {
                setTrie(e.target.value)
            }                
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