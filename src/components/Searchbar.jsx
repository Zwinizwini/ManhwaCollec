import '../styles/Searchbar.css'

const Searchbar = ({search, setSearch}) => {
    return (
        <input 
            placeholder="Rechercher un manhwa"
            value={search}
            onChange={(e) => {
                setSearch(e.target.value)
            }}
        />

    )
}

export default Searchbar