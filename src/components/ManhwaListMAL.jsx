import ManhwaItemMAL from './ManhwaItemMAL'
import '../styles/ManhwaList.css'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const SabreLaserDiv = styled.div`
    width: 20px;
    height: 30px;
    background: rgb(87, 85, 85);
    position: relative;
    border-radius: 5px;
    &::after {
        content: '';
        position: absolute;
        border-top: 3px solid black;
        border-bottom: 3px solid black;
        width: 20px;
        height: 20px;
        top: 0;
    }
    &::before {
        content: '';
        position: absolute;
        background: red;
        width: 5px;
        height: 5px;
        transition: all .2s ease-in-out;
    }
`

const Faisseau = styled.div`
    width: 15px;
    height: 0;
    box-shadow: 0 0 5px #02e022;
    background: #a7f6a4;
    transition: all 1s ease-in-out;
    border-radius: 5px 5px 0 0;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &:has(input:checked) #faisseau {
        height: 50px;
    }
    &:has(input:checked) #sabre::before {
        width: 2px;
    }
`

const ManhwaListMAL = ({manhwaList, loading, page, isNsfw, setIsNsfw, setBL, isSearch, titre, tailleSearch, manhwaNameList, user}) => {

    return (
        <div className='container'>
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
            {/* <label>
                <Container>
                    <Faisseau id='faisseau'/>
                    <SabreLaserDiv id='sabre'/>
                    <input type="checkbox" id="inputNsfw"/>
                </Container>
            </label> */}
        </div>
    ) 
}

export default ManhwaListMAL