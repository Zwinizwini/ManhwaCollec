import { useContext, useState } from "react"
import { ManhwaContext } from "../utils/Context"
import { supabase } from "../supabase";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


const handleClick = async (manhwaList, isLoading) => {
    isLoading(true)
    for (const manhwa of manhwaList) {
        if (manhwa.nsfw === 0) {
            try {
            const response = await fetch(`https://api.jikan.moe/v4/manga?q=${encodeURIComponent(manhwa.title)}`)
            const {data} = await response.json()
            const donnee = data.find(d => d.title.toLowerCase().replaceAll(" ","") === manhwa.title.toLowerCase().replaceAll(" ",""))

            const tagListe = [...donnee.genres, ...donnee.themes]

            const tag = tagListe.reduce(
                (acc, current) => acc.concat(current.name),
                []
            )
            
            const {error} = await supabase
                .from('manhwas')
                .update({
                    tag: tag.toString()
                })
                .eq('id', manhwa.id)
            if (error) console.error(error)

            await delay(1500)
            } catch(error) {
                console.log(error)
                await delay(2000)
            }
        }
    }
    isLoading(false)
}

const BtnAjoutTag = () => {
    const {manhwaList} = useContext(ManhwaContext)
    const [loading, isLoading] = useState(false)
    
    return (
        <>
            {loading && <div className="loader-cube"></div>}
            <button onClick={() => handleClick(manhwaList, isLoading)}>Ajout Tag</button>
        </>
    )
}

export default BtnAjoutTag
