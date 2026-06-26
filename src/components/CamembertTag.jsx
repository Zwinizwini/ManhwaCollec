import { useState } from "react"
import { PieChart } from "react-minimal-pie-chart"
import { Tooltip } from "react-tooltip"
import StatLegend from "./StatLegend"


const CamembertTag = ({manhwaList}) => {
    const [hovered3,setHovered3] = useState(null)
    const [lecture, isLecture] = useState(false)
    const [pos, setPos] = useState({x:0,y:0})

    const tagListDuplicate = manhwaList.reduce(
        (acc, current) => acc.concat(current.tag?.split(/\s*(?:,|$)\s*/) ?? []),
        []
    )

    let tagList, dataTag
    if (lecture) {
        tagList = tagListDuplicate.reduce(
            (acc, current) => current.status !== "Pas lu" && !acc.includes(current) ? acc.concat(current) : acc,
            []
        )

        dataTag = tagList.map(((tag,index) => {
            const hue = (index / tagList.length) * 360
            return {
                title: tag,
                value: manhwaList.filter((manhwa => manhwa.status !== "Pas lu" && manhwa.tag?.includes(tag))).length,
                color: `hsl(${hue}, 70%, 60%)`
            }
        })).sort((a,b) => b.value - a.value)
    } else {
        tagList = tagListDuplicate.reduce(
            (acc, current) => !acc.includes(current) ? acc.concat(current) : acc,
            []
        )

        dataTag = tagList.map(((tag,index) => {
            const hue = (index / tagList.length) * 360
            return {
                title: tag,
                value: manhwaList.filter((manhwa => manhwa.tag?.includes(tag))).length,
                color: `hsl(${hue}, 70%, 60%)`
            }
        })).sort((a,b) => b.value - a.value)
    }

    return (
        <>
            <div className="container-gauche">
                <h2 style={{margin:0, color: 'white', textAlign: 'left', width:"100%"}}>répartition des tag</h2>
                <label className="lectureTag" onChange={() => {isLecture(!lecture)}}>
                    Lecture uniquement : 
                    <div className="switchLecture"><div></div></div>
                    <input type="checkbox" id="inputNsfw"/>
                </label>
                
                <div id="anchor-hover3" onMouseMove={(e) => {setPos({x: e.clientX, y: e.clientY})}}>
                    <PieChart
                        data={dataTag}
                        animate={true}
                        animationDuration={600}
                        animationEasing="ease-in-out"
                        style={{width: '100%'}}
                        onMouseOver={(_, index) => {
                            setHovered3(index)
                        }}
                        onMouseOut={() => {
                            setHovered3(null)
                        }}
                    />
                    <Tooltip
                        anchorSelect="#anchor-hover3"
                        border={`1px solid black`}
                        style={{background: '#08090a'}}
                        opacity={1}
                        position={{x: pos.x, y: pos.y}}
                        content= {typeof hovered3 === 'number' && `${dataTag[hovered3].title} : ${dataTag[hovered3].value}`}
                    />
                </div>
            </div>

            <div className="container-droite statInfoTag" style={{alignItems:'start', justifyContent:"start", flexWrap:"wrap", maxHeight: '450px'}}>
                {dataTag.map((status) => (
                    <div key={status.title}>
                        <StatLegend info1={status.color} info2={status.title}/>
                    </div>
                ))}
            </div>
        </>
)
}

export default CamembertTag