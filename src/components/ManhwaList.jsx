import ManhwaItem from './ManhwaItem'
import '../styles/ManhwaList.css'
import Filtre from './Filtre'
import { useState } from 'react'
import Searchbar from './Searchbar'
import Info from './Info'
import FormAjout from './FormAjout'


const handleClick = (manhwaList) => {
    localStorage.setItem("manhwaList", JSON.stringify(manhwaList))
}

const ManhwaList = ({manhwaList, updateManhwalist, activeList, setActiveList}) => {
    const [filtreStatus, setStatus] = useState('')
    const [isForm, setForm] = useState(false)
    const [isNsfw, setIsNsfw] = useState(2)
    const statusList = manhwaList.reduce(
        (acc, manhwa) => acc.includes(manhwa.status) ? acc : acc.concat(manhwa.status),
        []
    )


    return (
        <div className='container'>
            <div className='menu'>
                <Info 
                    manhwaList={manhwaList}    
                />
                <div className="filtre">
                    <Searchbar
                        activeList={activeList}
                        setActiveList={setActiveList}
                        manhwaList={manhwaList}
                    />
                    <Filtre 
                        filtreStatus={filtreStatus}
                        setStatus={setStatus}
                        statusList={statusList}
                        isNsfw={isNsfw}
                        setIsNsfw={setIsNsfw}
                    />
                    <button className='ajouter-manhwa' onClick={() => setForm(true)}>+ Ajouter</button>
                    {isForm && <FormAjout isForm={isForm} setForm={setForm} manhwaList={manhwaList} updateManhwalist={updateManhwalist}/>}
                </div>
            </div>
            <ul className='manhwa-list'>
                {activeList.map(({id, title, chapter, status, lastRead, lastReadCount, nsfw, cover,description,link, maxChapter}) => (
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
                            />
                        </div>
                    : null ) 
                )}
            </ul>
        </div>
    ) 
}

export default ManhwaList