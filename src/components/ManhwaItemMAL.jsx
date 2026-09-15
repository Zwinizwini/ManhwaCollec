import '../styles/ManhwaItem.css'
import { Link } from 'react-router-dom'
import BtnAjouter from './BtnAjouter'


const ManhwaItemMAL = ({manhwa, isUser, manhwaNameList}) => {  
    return (
        <>
            <Link 
                className="manhwa-item" 
                style={{animationDelay: `${manhwa.index*0.05}s`}} 
                to={`/manhwa-p/${manhwa.id}/${encodeURIComponent(manhwa.title)}`}
                onClick={(e) => {
                    e.target.className === 'btnajout' && e.preventDefault()
                }}
            >
                <div
                    className='container-hover'
                >
                    {manhwa.cover && <img src={manhwa.cover} alt={`Cover de ${manhwa.title}`} className="manhwa-item-cover" id='img-item' style={{height:'100%'}}/>}
                    <span className="name-hover">{manhwa.title}</span>
                    {manhwa.nsfw===1 && <span className="nsfw" style={{top:'2px'}}>NSFW</span>}
                    <div className='info-hover' style={{background: 'linear-gradient(transparent, #1c1f27)'}}>
                        {isUser && <BtnAjouter title={manhwa.title} cover={manhwa.cover} maxChapter={manhwa.chapters} nsfw={manhwa.nsfw} manhwaListName={manhwaNameList} isPublic={true}/>}
                    </div>
                    {manhwa.score != null && <span className='note-hover'>{manhwa.score}★</span>}
                </div>
            </Link>
        </>

    )
}

export default ManhwaItemMAL