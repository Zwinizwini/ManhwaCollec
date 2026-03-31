import ManhwaItem from './ManhwaItem'
import '../styles/ManhwaList.css'
import Filtre from './Filtre'
import { useContext, useState } from 'react'
import Searchbar from './Searchbar'
import Info from './Info'
import FormAjout from './FormAjout'
import Sort from './Sort'
import { UserContext } from '../utils/Context'


const ManhwaList = ({manhwaList, updateManhwalist, setAjoutList}) => {
    const [filtreStatus, setStatus] = useState('')
    const [isForm, setForm] = useState(false)
    const [isNsfw, setIsNsfw] = useState(2)
    const [search, setSearch] = useState('')
    const {isUser} = useContext(UserContext)

    const statusList = manhwaList.reduce(
        (acc, manhwa) => acc.includes(manhwa.status) ? acc : acc.concat(manhwa.status),
        []
    )
    const activeList = manhwaList.filter(m => m.title.toLowerCase().includes(search.toLocaleLowerCase()))


    return (
        <div className='container'>
            <div className='menu'>
                <Info manhwaList={manhwaList}/>
                <div className="filtre">
                    <Searchbar
                        search={search}
                        setSearch={setSearch}
                    />
                    <Filtre 
                        filtreStatus={filtreStatus}
                        setStatus={setStatus}
                        statusList={statusList}
                        isNsfw={isNsfw}
                        setIsNsfw={setIsNsfw}
                    />
                    {!isUser && <button className='ajouter-manhwa' onClick={() => setForm(true)}>+ Ajouter</button>}
                    {isForm && <FormAjout isForm={isForm} setForm={setForm} setAjoutList={setAjoutList}/>}
                </div>
                <Sort manhwaList={manhwaList} saveManhwaList={updateManhwalist}/>
            </div>
            <ul className='manhwa-list'>
                {activeList.map(({id, title, chapter, status, lastRead, lastReadCount, nsfw, cover,description,link, maxChapter, note}) => (
                    (!filtreStatus || filtreStatus === status) && (parseInt(isNsfw) === 2 || parseInt(isNsfw) === nsfw) ? 
                        <div key={id}>
                            <ManhwaItem 
                                id={id}
                                title={title}
                                chapter={chapter}
                                status={status}
                                lastRead={lastRead}
                                lastReadCount={lastReadCount}
                                nsfw={nsfw}
                                cover={cover}
                                description={description}
                                link={link}
                                maxChapter={maxChapter}
                                manhwaList={manhwaList}
                                updateManhwalist={updateManhwalist}
                                note={note}
                            />
                        </div>
                    : null ) 
                )}
            </ul>
        </div>
    ) 
}

export default ManhwaList