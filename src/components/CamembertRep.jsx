import { useState } from "react"
import { PieChart } from "react-minimal-pie-chart"
import StatLegend from "./StatLegend"
import { Tooltip } from "react-tooltip"
import styled from "styled-components"

const PieStyle = styled(PieChart)`

`

const CamembertRep = ({manhwaList, totalManhwa}) => {
    const [hovered1, setHovered1] = useState(null)

    const nbFini = manhwaList.filter((manhwa => manhwa.status === 'Fini')).length
    const nbFiniP = Math.round((nbFini/totalManhwa) * 100)
    const nbEnCours = manhwaList.filter((manhwa => manhwa.status === 'En Cours')).length
    const nbEnCoursP = Math.round((nbEnCours/totalManhwa) * 100)
    const nbPasLu = manhwaList.filter((manhwa => manhwa.status === 'Pas lu')).length
    const nbPasLuP = Math.round((nbPasLu/totalManhwa) * 100)
    const nbDrop = manhwaList.filter((manhwa => manhwa.status === 'Drop')).length
    const nbDropP = Math.round((nbDrop/totalManhwa) * 100)
    const nbHiatus = manhwaList.filter((manhwa => manhwa.status === 'Hiatus')).length
    const nbHiatusP = Math.round((nbHiatus/totalManhwa) * 100)
    
    
    const dataStatusTemp = [
        { title: 'Fini', value: nbFini, color: '#1D9E75', valueP: nbFiniP, colorHover: '#00a873'},
        { title: 'En Cours', value: nbEnCours, color: '#7F77DD', valueP: nbEnCoursP, colorHover: '#4d3ef5'},
        { title: 'Pas Lu', value: nbPasLu, color: '#5DCAA5', valueP: nbPasLuP, colorHover: '#28e1a4'},
        { title: 'Drop', value: nbDrop, color: '#888780', valueP: nbDropP, colorHover: '#7d7c71'},
        { title: 'Hiatus', value: nbHiatus, color: '#AFA9EC', valueP:nbHiatusP, colorHover: '#7c70fc'},
    ].sort((a,b) => b.value - a.value)
    .reduce(
        (acc, elem) => elem.value > 0 ? acc.concat(elem) : acc
        , []
    )

    const dataStatus = dataStatusTemp.map((entry, index) => {
        if (hovered1 === index) {
            return {
                ...entry,
                color: entry.colorHover
            }
        }
        return entry
    })

    return (
        <div className="container-gauche">
            <h2 style={{margin:0, color: 'white', textAlign: 'left', width:'100%'}}>liste de manhwa</h2>
            <p style={{color: "#ccc", textAlign: 'left', width:'100%'}}>{totalManhwa} manhwa au total</p>
            <div id="anchor-hover">
                <PieStyle
                    data={dataStatus}
                    label={({ dataEntry }) => `${dataEntry.valueP} %`}
                    labelStyle={{fontSize: '5px', fill: "white"}}
                    labelPosition={80}
                    animate={true}
                    animationDuration={600}
                    animationEasing="ease-in-out"
                    startAngle={280}
                    style={{width: '100%'}}
                    onMouseOver={(_, index) => {
                        setHovered1(index)
                    }}
                    onMouseOut={() => {
                        setHovered1(null)
                    }}
                />
                <Tooltip
                    anchorSelect="#anchor-hover"
                    border={typeof hovered1 === 'number' && `1px solid ${dataStatus[hovered1].colorHover}`}
                    style={{background: '#08090a'}}
                    opacity={1}
                    content= {typeof hovered1 === 'number' && `${dataStatus[hovered1].title} : ${dataStatus[hovered1].value}`}
                />
            </div>
            <div className="container-legend">
                {dataStatus.map((status) => (
                    <div key={status.title}>
                        <StatLegend info1={status.color} info2={status.title}/>
                    </div>
                ))}
            </div>
        </div>
)
}

export default CamembertRep