import ManhwaItem from './ManhwaItem'
import '../styles/ManhwaList.css'
import Filtre from './Filtre'
import { useContext, useState } from 'react'
import Searchbar from './Searchbar'
import Info from './Info'
import FormAjout from './FormAjout'
import Sort from './Sort'
import { UserContext } from '../utils/Context'


const ManhwaList = ({manhwaList, updateManhwalist}) => {
    const [filtreStatus, setStatus] = useState('')
    const [isForm, setForm] = useState(false)
    const [isNsfw, setIsNsfw] = useState(2)
    const [search, setSearch] = useState('')
    const {isUser} = useContext(UserContext)
    const trierLocal = localStorage.getItem("trier")
    const [trie, setTrie] = useState(trierLocal ? JSON.parse(trierLocal) : 0)

    const statusList = manhwaList.reduce(
        (acc, manhwa) => acc.includes(manhwa.status) ? acc : acc.concat(manhwa.status),
        []
    )

    const activeList = manhwaList
        .filter(m => m.title.toLowerCase().includes(search.toLowerCase()))
        .sort((a,b) => {
            if (trie === "1") {
                return (b?.note ?? 0) - (a?.note ?? 0)
            }
            else if (trie === "2") {
                return (a?.note ?? 0) - (b?.note ?? 0)
            }
            else if (trie === "3") {
                return (b.maxChapter - b.chapter) - (a.maxChapter - a.chapter)
            }
    })


    return (
        <div className='container'>
            <div className='menu'>
                <Info manhwaList={manhwaList}/>
                <div className="filtre">
                    <Searchbar
                        search={search}
                        setSearch={setSearch}
                    />
                    <div className='sous-filtre'>
                        <Filtre 
                            filtreStatus={filtreStatus}
                            setStatus={setStatus}
                            statusList={statusList}
                            isNsfw={isNsfw}
                            setIsNsfw={setIsNsfw}
                        />
                        <Sort trie={trie} setTrie={setTrie}/>
                    </div>
                </div>
                {!isUser && <button className='ajouter-manhwa' onClick={() => setForm(true)}>+ Ajouter</button>}
                {isForm && <FormAjout isForm={isForm} setForm={setForm}/>}
            </div>
            <ul className='manhwa-list'>
                {activeList.map(({id, title, chapter, status, lastRead, lastReadCount, nsfw, cover,description,link, maxChapter, note, lastCheck}) => (
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
                                lastCheck={lastCheck}
                                isUser={isUser}
                            />
                        </div>
                    : null ) 
                )}
            </ul>
        </div>
    ) 
}

export default ManhwaList