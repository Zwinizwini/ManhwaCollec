import '../styles/PopupToast.css'

const PopupToast = ({manhwaList}) => {
    return (
        <div className="popupToast">
            <p>✓ <span>{manhwaList.at(-1).title}</span> ajouté à la bibliothèque</p>
        </div>
    )
}

export default PopupToast