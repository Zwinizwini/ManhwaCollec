import { useEffect, useRef } from 'react'


const Audio = ({isPlaying, audio}) => {

  const audioRef = useRef(null)
  
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying])

  return (
    <>
      <div id='boxShadow'></div>
      <audio loop src={audio} ref={audioRef}/>
    </>
  )
}

export default Audio
