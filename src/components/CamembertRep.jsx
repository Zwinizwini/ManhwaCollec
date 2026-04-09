import { useState } from "react"
import { PieChart } from "react-minimal-pie-chart"
import StatLegend from "./StatLegend"
import { Tooltip } from "react-tooltip"

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
    
    
    const dataHover = [
        {c: '#00a873', value: nbFini},
        {c: '#4d3ef5', value: nbEnCours},
        {c: '#28e1a4', value: nbPasLu},
        {c: '#7d7c71', value: nbDrop},
        {c: '#7c70fc', value: nbHiatus}
    ].sort((a,b) => b.value - a.value)
    const dataStatusTemp = [
        { title: 'Fini', value: nbFini, color: '#1D9E75', ch: nbFiniP },
        { title: 'En Cours', value: nbEnCours, color: '#7F77DD', ch: nbEnCoursP },
        { title: 'Pas Lu', value: nbPasLu, color: '#5DCAA5', ch: nbPasLuP },
        { title: 'Drop', value: nbDrop, color: '#888780', ch: nbDropP },
        { title: 'Hiatus', value: nbHiatus, color: '#AFA9EC', ch:nbHiatusP },
    ].sort((a,b) => b.value - a.value)
    const dataStatus = dataStatusTemp.map((entry, index) => {
        if (hovered1 === index) {
            return {
                ...entry,
                color: dataHover[index].c
            }
        }
        return entry
    })

    return (
        <div className="container-gauche">
            <h2 style={{margin:0, color: 'white', textAlign: 'left', width:'100%'}}>liste de manhwa</h2>
            <p style={{color: "#ccc", textAlign: 'left', width:'100%'}}>{totalManhwa} manhwa au total</p>
            <div id="anchor-hover">
                <PieChart
                    data={dataStatus}
                    label={({ dataEntry }) => `${dataEntry.ch} %`}
                    labelStyle={{fontSize: '5px', fill: "white"}}
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
                    border={typeof hovered1 === 'number' && `1px solid ${dataHover[hovered1].c}`}
                    style={{background: '#08090a'}}
                    opacity={1}
                    content= {typeof hovered1 === 'number' && `${dataStatus[hovered1].title} : ${dataStatus[hovered1].value}`}
                />
            </div>
            <div className="container-legend">
                <StatLegend info1={'#7F77DD'} info2={'En Cours'}/>
                <StatLegend info1={'#1D9E75'} info2={'Fini'} />
                <StatLegend info1={'#5DCAA5'} info2={'Pas Lu'} />
                <StatLegend info1={'#AFA9EC'} info2={'Hiatus'} />
                <StatLegend info1={'#888780'} info2={'Drop'} />
            </div>
        </div>
)
}

export default CamembertRep