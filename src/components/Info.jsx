import '../styles/Info.css'
import { ManhwaContext } from '../utils/Context'

function findStatus(manhwaList, status) {
    return manhwaList.reduce(
        (acc, manhwa) => manhwa.status === status ? acc+1 : acc,
        0
    )
}

const Info = ({manhwaList}) => {
    const nbFini = findStatus(manhwaList,"Fini")
    const nbEnCours = findStatus(manhwaList,"En Cours") + findStatus(manhwaList,"Hiatus")
    const nbPasLu = findStatus(manhwaList,"Pas lu")
    const nbDrop = findStatus(manhwaList,"Drop")
    const nbManhwa = [{nb:manhwaList.length, txt:"Total"},
            {nb:nbFini, txt:"Finis"},
            {nb:nbEnCours, txt:"En Cours"},
            {nb:nbPasLu, txt:"Pas Lus"},
            {nb:nbDrop, txt:"Drop"}
    ]

    return (
        <div className="menu-info">
            {nbManhwa.map(({nb,txt}) => (
                <div className="div-info" key={txt}>
                    <h5 className={`${txt}H`}>{nb}</h5>
                    <div>
                        <span className={`point ${txt}`}></span>
                        <p>{txt}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Info