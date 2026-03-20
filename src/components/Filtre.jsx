import '../styles/Filtre.css'

const Filtre = ({filtreStatus, setStatus, statusList, isNsfw, setIsNsfw}) => {
    return (
        <div className='sous-filtre'>
            <select
                value={filtreStatus}
                onChange={(e) => setStatus(e.target.value)}
                name='status'
            >
                <option value=''>Tous Status</option>
                {statusList.map((stat) => (
                    <option key={stat} value={stat}>{stat}</option>
                ))}
            </select>
            <select
                value={isNsfw}
                onChange={(e) => {
                    setIsNsfw(e.target.value)
                    console.log(`Nouvelle valeur ${e.target.value}`)
                }}
                name='nsfw' 
            >
                <option value={2}>All</option>
                <option value={1} key="true0">NSFW</option>
                <option value={0} key="flase1">Tout Public</option>
            </select>
        </div>
    )
}

export default Filtre