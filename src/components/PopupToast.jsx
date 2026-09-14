import { useContext } from 'react'
import '../styles/PopupToast.css'
import { ManhwaContext } from '../utils/Context'

const PopupToast = ({msg, isCopy=false}) => {
    const {manhwaList} = useContext(ManhwaContext)
    return (
        <div className="popupToast">
            <p>✓ {!isCopy && <span>{manhwaList.at(-1).title}</span>} {msg}</p>
        </div>
    )
}

export default PopupToast