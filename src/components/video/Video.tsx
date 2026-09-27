import { useEffect, useMemo, useRef, useState } from 'react'
import useWindowSize from '../../utilities/useWindowSize'
import landscapeVideo from '../../media/video/landscape.mp4'
import portraitVideo from '../../media/video/portrait.mp4'
import { useCurtain } from '../../contexts/CurtainContext'
import './Video.scss'

const VIDEO_END_TIME = 13

const Video: React.FC<{ isCurtainOpen: boolean }> = ({
  isCurtainOpen,
}) => {
  const { setIsVideoAtEnd, setVideoTime } = useCurtain()
  const windowSize = useWindowSize()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [currentTime, setCurrentTime] = useState(0)

  const currentPath = useMemo(() => {
    if (windowSize.width < windowSize.height) {
      return portraitVideo
    } else {
      return landscapeVideo
    }
  }, [windowSize.width, windowSize.height])

  const handleTimeUpdate = () => {
    const video = videoRef.current

    if (video) {
      if (video.currentTime >= VIDEO_END_TIME) {
        video.currentTime = VIDEO_END_TIME
        video.pause()
      }

      const videoTime = Math.min(video.currentTime, VIDEO_END_TIME)
      setCurrentTime(videoTime)
      setVideoTime(videoTime)
      setIsVideoAtEnd(videoTime >= VIDEO_END_TIME)
    }
  }

  const handleLoadedMetadata = (
    event: React.SyntheticEvent<HTMLVideoElement>
  ) => {
    const video = event.currentTarget
    video.currentTime = Math.min(currentTime, VIDEO_END_TIME)
    setVideoTime(video.currentTime)
    setIsVideoAtEnd(video.currentTime >= VIDEO_END_TIME)

    if (video.currentTime >= VIDEO_END_TIME || !isCurtainOpen) {
      video.pause()
    } else {
      void video.play().catch(() => undefined)
    }
  }

  useEffect(() => {
    const video = videoRef.current

    if (!video) {
      return
    }

    if (video.currentTime >= VIDEO_END_TIME) {
      video.currentTime = VIDEO_END_TIME
      video.pause()
    } else if (isCurtainOpen) {
      void video.play().catch(() => undefined)
    } else {
      video.pause()
    }
  }, [isCurtainOpen, currentPath])

  return (
    <div className="video-container">
      <video
        ref={videoRef}
        key={currentPath}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        width="100%"
        muted
        playsInline
        autoPlay={isCurtainOpen}
      >
        <source src={currentPath} type="video/mp4" />
      </video>
    </div>
  )
}

export default Video
