import { useRef, useState } from "react"
import { PieChart } from "react-minimal-pie-chart"
import StatLegend from "./StatLegend"
import TrailsDialog from "./TrailsDialog"


const CamembertTag = ({manhwaList}) => {
    const [hovered3,setHovered3] = useState(null)
    const [lecture, isLecture] = useState(false)
    const boxRef = useRef(null)
    const handleMouseMove = (e) => {
        if (boxRef.current) {
            boxRef.current.style.left = `${e.clientX}px`;
            boxRef.current.style.top = `${e.clientY}px`;
        }
    }

    let tagList, dataTag
    if (lecture) {
        const tabListLu = manhwaList.reduce(
            (acc, current) => current.status !== "Pas lu" ? acc.concat(current.tag?.split(/\s*(?:,|$)\s*/) ?? []) : acc,
            []
        )
        tagList = tabListLu.reduce(
            (acc, current) => !acc.includes(current) ? acc.concat(current) : acc,
            []
        )

        const temp = tagList.map(((tag) => {
            return {
                title: tag,
                value: manhwaList.filter((manhwa => manhwa.status !== "Pas lu" && manhwa.tag?.includes(tag))).length,
            }
        })).sort((a,b) => b.value - a.value)

        dataTag = temp.map(((obj,index) => {
            const hue = (index / tagList.length) * 360
            return {
                ...obj,
                color: `hsl(${hue}, 70%, 60%)`
            }
        }))
    } else {
        const tagListDuplicate = manhwaList.reduce(
            (acc, current) => acc.concat(current.tag?.split(/\s*(?:,|$)\s*/) ?? []),
            []
        )
        tagList = tagListDuplicate.reduce(
            (acc, current) => !acc.includes(current) ? acc.concat(current) : acc,
            []
        )

        const temp = tagList.map(((tag) => {
            return {
                title: tag,
                value: manhwaList.filter((manhwa => manhwa.tag?.includes(tag))).length,
            }
        })).sort((a,b) => b.value - a.value)

        dataTag = temp.map(((obj,index) => {
            const hue = (index / tagList.length) * 360
            return {
                ...obj,
                color: `hsl(${hue}, 70%, 60%)`
            }
        }))
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
                
                <div id="anchor-hover3" onMouseMove={handleMouseMove}>
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
                        className="statSVG"
                    />
                    {typeof hovered3 === 'number' &&
                        <div ref={boxRef} style={{position:'fixed'}}>
                            <TrailsDialog
                                nom={'Tag'}
                                texte={`${dataTag[hovered3].title} : ${dataTag[hovered3].value} %`}
                            />
                        </div>
                    }
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