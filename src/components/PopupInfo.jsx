import { progressionCouleur } from "../utils/colors"


const PopupInfo = ({info1, info2}) => {
    let couleur
    if (info2.includes("%")) {
        const nbrString = info2.split("%")
        const nbr = parseInt(nbrString[0])
        couleur = progressionCouleur(nbr)
    }

    return (
        <div>
            <p>{info1}</p>
            <h5 style={{color: couleur}}>{info2}</h5>
        </div>
    )
}

export default PopupInfo