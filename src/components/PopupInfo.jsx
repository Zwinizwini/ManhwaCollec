
const styleCouleur = (prog) => {
    if (prog <= 20) return '#E24B4A'
    if (prog <= 40) return '#BA7517'
    if (prog <= 60) return '#EF9F27'
    if (prog <= 80) return '#378ADD'
    if (prog < 100) return '#1D9E75'
    return '#39FF14'
}

const PopupInfo = ({info1, info2}) => {
    let couleur
    if (info2.includes("%")) {
        const nbrString = info2.split("%")
        const nbr = parseInt(nbrString[0])
        couleur = styleCouleur(nbr)
    }

    return (
        <div>
            <p>{info1}</p>
            <h5 style={{color: couleur}}>{info2}</h5>
        </div>
    )
}

export default PopupInfo