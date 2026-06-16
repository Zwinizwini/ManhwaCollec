import '../styles/Stat.css'

const StatLegend = ({info1, info2}) => {
    return (
        <div className='legend'>
            <div style={{background: info1}}></div>
            <p style={{marginBottom:0}}>{info2}</p>
        </div>
    )
}

export default StatLegend