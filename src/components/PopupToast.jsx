import '../styles/PopupToast.css'

const PopupToast = ({manhwaList, msg}) => {
    return (
        <div className="popupToast">
            <p>✓ {manhwaList && <span>{manhwaList.at(-1).title}</span>} {msg}</p>
        </div>
    )
}

export default PopupToast