import ManhwaItemMAL from './ManhwaItemMAL'
import '../styles/ManhwaList.css'
import { Link } from 'react-router-dom'
import { AjoutListContext } from '../utils/Context'
import { useContext } from 'react'
import PopupToast from './PopupToast'

const ManhwaListMAL = ({manhwaList, loading, page, isNsfw, setIsNsfw, setBL, isSearch, titre, tailleSearch, manhwaNameList, user}) => {
    const { ajoutList } = useContext(AjoutListContext)

    return (
        <div className='container'>
            {ajoutList && <PopupToast msg={"ajouté à la bibliothèque"}/>}
            <div className='menu'>
                <div className="filtre" style={{justifyContent: 'center'}}>
                        <select
                            value={isNsfw}
                            onChange={(e) => {
                                setIsNsfw(e.target.value)
                                }}
                            name='nsfw' 
                        >
                            <option value={2}>All</option>
                            <option value={1} key="true0">NSFW</option>
                            <option value={0} key="flase1">Tout Public</option>
                        </select>
                        <label>
                            <div onChange={(e) => {e.target.checked ? setBL(false) : setBL(true)}}
                                className="divNsfw"
                                id='BL'
                            >
                                <div>
                                    Boys Love
                                </div> 
                                <div className="switchNSFW"><div></div></div>
                                <input type="checkbox" id="inputNsfw"/>
                            </div>
                        </label>
                </div>
            </div>
            {
                loading ? <div className="loader"></div>
                :
                <>
                    <ul className='manhwa-list'>
                        {manhwaList.map((manhwa, index) => (
                            (parseInt(isNsfw) === 2 || parseInt(isNsfw) === manhwa.nsfw) ? 
                                <div key={index}>
                                    <ManhwaItemMAL
                                        manhwa={manhwa}
                                        manhwaNameList={manhwaNameList}
                                        isUser={user}
                                    />
                                </div>
                            : null ) 
                        )}
                    </ul>
                    <div className='div-nav'>
                        <Link to={isSearch ? `/search/${titre}?page=${page-1}` 
                        : `/manhwa-liste?page=${page-1}`}
                            onClick={(e) => {
                                page-1 === 0 && e.preventDefault()
                            }}
                            style={{
                                pointerEvents: page-1 === 0 ? 'none' : 'auto',
                                opacity: page-1 === 0 ? 0.5 : 1}}
                        >Previous</Link>
                        {isSearch ? <Link to={`/search/${titre}?page=${page+1}`}
                            onClick={(e) => {
                                tailleSearch < 50 && e.preventDefault()
                            }}
                            style={{
                                pointerEvents: tailleSearch < 50 ? 'none' : 'auto',
                                opacity: tailleSearch < 50 ? 0.5 : 1
                            }}
                            >Next</Link>
                        : <Link to={`/manhwa-liste?page=${page+1}`}>Next</Link>
                        }
                    </div>
                </>
            }
        </div>
    ) 
}

export default ManhwaListMAL