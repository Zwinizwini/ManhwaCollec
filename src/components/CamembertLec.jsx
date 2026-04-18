import { useState } from "react"
import { PieChart } from "react-minimal-pie-chart"
import StatInfo from "./StatInfo"
import { Tooltip } from "react-tooltip"


const CamembertLec = ({manhwaList, totalManhwa}) => {
    const [hovered2, setHovered2] = useState(null)
    const [pos, setPos] = useState({x: 0, y:0})
    const totalChapterLu = manhwaList.reduce(
        (acc, m) => m.chapter ? acc + parseInt(m.chapter) : acc
        , 0
    )
    const totalChapter = manhwaList.reduce(
        (acc, m) => m.maxChapter ? acc + parseInt(m.maxChapter) : acc
        , 0
    ) 
    const nbNsfw = manhwaList.filter((manhwa) => manhwa.nsfw === 1).length
    const nbPasLu = manhwaList.filter((manhwa => manhwa.status === 'Pas lu')).length

    const dataLuTemp = [
        { title: 'Lus', value: Math.round((totalChapterLu/totalChapter) * 100), color: '#7F77DD', colorHover: '#4d3ef5'},
        { title: 'Restants', value: Math.round(((totalChapter-totalChapterLu)/totalChapter) * 100), color: '#D3D1C7', colorHover: '#c5c1ac'}
    ].reduce(
        (acc, elem) => elem.value > 0 ? acc.concat(elem) : acc
        , []
    )
    const dataLu = dataLuTemp.map((entry, index) => {
        if (hovered2 === index) {
            return {
                ...entry,
                color: entry.colorHover
            }
        }
        return entry
    })


    return (
        <div className="container-droite">
            <StatInfo info1={"Chapitres lus au total"} info2={totalChapterLu}/>
            <StatInfo info1={"Moyenne chap. lu"} info2={Math.round(totalChapterLu/(totalManhwa-nbPasLu))}/>
            <StatInfo info1={"Contenus adulte"} info2={`${Math.round((nbNsfw/totalManhwa) * 100)} %`}/>
            <div className="statInfo">
                <p>Avancement global</p>
                <div id='anchor-hover2' onMouseMove={(e) => {setPos({x: e.clientX, y: e.clientY})}}>
                    <PieChart
                        data={dataLu}
                        lineWidth={30}
                        style={{width: '150px'}}
                        animate={true}
                        animationDuration={600}
                        animationEasing="ease-in-out"
                        onMouseOver={(_, index) => {
                            setHovered2(index)
                        }}
                        onMouseOut={() => {
                            setHovered2(null)
                        }}
                    />
                    <Tooltip
                        anchorSelect="#anchor-hover2"
                        border={typeof hovered2 === 'number' && `1px solid ${dataLu[hovered2].colorHover}`}
                        style={{background: '#08090a'}}
                        content= {typeof hovered2 === 'number' && `${dataLu[hovered2].title} : ${dataLu[hovered2].value} %`}
                        position={{x: pos.x, y: pos.y}}
                    />
                </div>
            </div>
        </div>
    )
}

export default CamembertLec