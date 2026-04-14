import { useEffect, useState } from 'react'
import '../styles/ManhwaItem.css'
import Popup from './Popup'
import { styleCouleur, colors } from '../utils/colors'
import { supabase } from '../supabase'
import {styled, keyframes} from 'styled-components'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`
const Loader = styled.div`
  padding: 10px;
  border: 6px solid ${colors.violet};
  border-bottom-color: transparent;
  border-radius: 22px;
  animation: ${rotate} 1s infinite linear;
  height: 0;
  width: 0;
  position: absolute;
  top: 25px;
  left: 2px;
`

const ManhwaItem = ({id, title, chapter, status, lastRead, nsfw, cover, lastReadCount, description,link, maxChapter, manhwaList, updateManhwalist, note, lastCheck}) => {
    const [isPopup, setPopup] = useState(false)
    const [receiveData, setRData] = useState(false)
    const [chaptUpdate, setChapUpdate] = useState(maxChapter)
    const [isLoading, setLoading] = useState(false)

    const dateNow = new Date()
    const lastReadDate = lastRead ? new Date(lastRead) : ""
    const dateTest = lastReadDate ? new Date(lastReadDate.getFullYear(), lastReadDate.getMonth(), lastReadDate.getDate()) : ""
    const lastReadCompter = Math.floor((dateNow - dateTest) / (1000 * 60 * 60 * 24))

    const lastCheckDate = lastCheck ? new Date(lastCheck) : ""
    const dateLastCheck = lastCheckDate ? new Date(lastCheckDate.getFullYear(), lastCheckDate.getMonth(), lastCheckDate.getDate()) : ""
    const lastCheckDiff = Math.floor((dateNow - dateLastCheck) / (1000 * 60 * 60 * 24))

    const gradientSeuil = Math.round((parseInt(chapter)/chaptUpdate) * 100)

    const progressionBar = () => {
        if (gradientSeuil < 100) return '#378ADD'
        if (lastReadCompter >= "7" && status !== "Fini") return colors.violet
        return '#1D9E75'
    }

    const updateManhwa = async (newMax) => {
        console.log(`Données reçu update pour ${title}`)
        setLoading(false)
        const { error } = await supabase
            .from('manhwas')
            .update({
                lastCheck: new Date().toISOString(),
                maxChapter: newMax
            })
            .eq('id', id)
        
        if (error) console.error(error)
    }

    const handleMAJ = (newMax) => {        
        const updateList = manhwaList.map((m) => (
            m.id === id ? {
                ...m,
                lastCheck: new Date().toISOString(),
                maxChapter: newMax
            } : m
        ))
        updateManhwa(newMax)
        updateManhwalist(updateList)
    }

    useEffect(() => {
        const apiCall = async () => {
            if (lastCheckDiff > 0 && (status === "En Cours" || status === "Hiatus") && nsfw === 0) {
                setLoading(true)
                console.log(`Passage API pour ${title}`)
                if (!receiveData) {
                    const response = await fetch(`/api/test?name=${title}`)
                    const data = await response.json()
                    const resultList = data.reduce(
                        (acc, site) => !site.done ? acc.concat(site.results) : acc
                        , []
                    )
                    setRData(true)
                    const chapList = resultList.reduce(
                        (acc, site) => site.title.toLowerCase().replaceAll(" ","") === title.toLowerCase().replaceAll(" ","") ? acc.concat(site.latestChapter) : acc
                        , []
                    )
                    const chapterAPI = chapList.length > 0 ? Math.round(Math.max(...chapList)) : maxChapter
                    const chapterF = chapterAPI < maxChapter ? maxChapter : chapterAPI
                    setChapUpdate(chapterF)
                    handleMAJ(chapterF)
                }
            }
        }
        apiCall()
    }, [id])

    return (
        <>
            <li className="manhwa-item">
                <div
                    className='container-hover'
                    onClick={() => setPopup(true)}
                >
                    {cover && <img src={cover} alt={`Cover de ${title}`} className="manhwa-item-cover" id='img-item'/>}
                    <span className="name-hover">{title}</span>
                    <span className="status" style={{background:styleCouleur(status)}}>{status}</span>
                    {isLoading && <Loader />}
                    {nsfw===1 && <span className="nsfw">18+</span>}
                    <div className='info-hover'>
                        <div>
                            {chapter !== "" && <span>Ch. {chapter}</span>}
                            {lastRead !== "" && lastReadCount !== "" && <span>{lastReadCompter} jours</span>}
                        </div>
                        <div className='progression-bar' style={{background: `linear-gradient(to right, ${progressionBar()} ${gradientSeuil}%, black ${gradientSeuil}%)`}}></div>
                    </div>
                    {note != null && <span className='note-hover'>{note}★</span>}
                </div>
            </li>
            {isPopup && 
                <Popup 
                    title={title}
                    chapter={chapter}
                    status={status}
                    lastRead={lastRead}
                    lastReadCompter={lastReadCompter}
                    nsfw={nsfw}
                    cover={cover}
                    description={description}
                    link={link}
                    setPopup={setPopup}
                    isPopup={isPopup}
                    maxChapter={chaptUpdate}
                    id={id}
                    manhwaList={manhwaList}
                    updateManhwalist={updateManhwalist}
                    note={note}
                    gradientSeuil={gradientSeuil}
                    setChapUpdate={setChapUpdate}
                />
            }
        </>

    )
}

export default ManhwaItem