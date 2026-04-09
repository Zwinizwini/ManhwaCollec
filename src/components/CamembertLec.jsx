import { useState } from "react"
import { PieChart } from "react-minimal-pie-chart"
import StatInfo from "./StatInfo"
import { Tooltip } from "react-tooltip"


const CamembertLec = ({manhwaList, totalManhwa}) => {
    const [hovered2, setHovered2] = useState(null)
    const totalChapterLu = manhwaList.reduce(
        (acc, m) => acc + parseInt(m.chapter)
        , 0
    )
    const totalChapter = manhwaList.reduce(
        (acc, m) => acc + parseInt(m.maxChapter)
        , 0
    ) 
    const nbNsfw = manhwaList.filter((manhwa) => manhwa.nsfw === 1).length

    const dataLuHover = ['#4d3ef5','#c5c1ac']
    const dataLuTemp = [
        { title: 'Lus', value: Math.round((totalChapterLu/totalChapter) * 100), color: '#7F77DD' },
        { title: 'Restants', value: Math.round(((totalChapter-totalChapterLu)/totalChapter) * 100), color: '#D3D1C7' }
    ]
    const dataLu = dataLuTemp.map((entry, index) => {
        if (hovered2 === index) {
            return {
                ...entry,
                color: dataLuHover[index]
            }
        }
        return entry
    })

    return (
        <div className="container-droite">
            <StatInfo info1={"Chapitres lus au total"} info2={totalChapterLu}/>
            <StatInfo info1={"Moyenne chap. lu"} info2={Math.round(totalChapterLu/totalManhwa)}/>
            <StatInfo info1={"Contenus adulte"} info2={`${Math.round((nbNsfw/totalManhwa) * 100)} %`}/>
            <div className="statInfo">
                <p>Avancement global</p>
                <div id='anchor-hover2'>
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
                        border={typeof hovered2 === 'number' && `1px solid ${dataLuHover[hovered2]}`}
                        style={{background: '#08090a'}}
                        content= {typeof hovered2 === 'number' && `${dataLu[hovered2].title} : ${dataLu[hovered2].value} %`}
                    />
                </div>
            </div>
        </div>
    )
}

export default CamembertLec