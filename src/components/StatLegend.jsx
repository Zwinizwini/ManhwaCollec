import '../styles/Stat.css'

const StatLegend = ({info1, info2}) => {
    return (
        <div className='legend'>
            <div style={{background: info1}}></div>
            <p>{info2}</p>
        </div>
    )
}

export default StatLegend