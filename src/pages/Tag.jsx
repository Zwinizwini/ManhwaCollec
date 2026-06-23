import { useContext } from "react"
import { useParams } from "react-router-dom"
import { ManhwaContext } from "../utils/Context"

const Tag = () => {

  const {title} = useParams()
  const {manhwaList, saveManhwaList} = useContext(ManhwaContext)
  const manhwaListTag = manhwaList.filter(manhwa => manhwa.tag.includes(title))
  
  return (
    <div>
      {title}
    </div>
  )
}

export default Tag
