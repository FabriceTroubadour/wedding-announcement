import { useEffect, useMemo, useRef, useState } from 'react'
import useWindowSize from '../../utilities/customHooks/useWindowSize'
import landscapeVideo from '../../media/video/landscape.mp4'
import portraitVideo from '../../media/video/portrait.mp4'
import { useCurtain } from '../../contexts/CurtainContext'
import './Video.scss'
import { VideoTime } from '../../utilities/enums/VideoType'

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
      if (video.currentTime >= VideoTime.MaxTime) {
        video.currentTime = VideoTime.MaxTime
        video.pause()
      }

      const videoTime = Math.min(video.currentTime, VideoTime.MaxTime)
      setCurrentTime(videoTime)
      setVideoTime(videoTime)
      setIsVideoAtEnd(videoTime >= VideoTime.MaxTime)
    }
  }

  const handleLoadedMetadata = (
    event: React.SyntheticEvent<HTMLVideoElement>
  ) => {
    const video = event.currentTarget
    video.currentTime = Math.min(currentTime, VideoTime.MaxTime)
    setVideoTime(video.currentTime)
    setIsVideoAtEnd(video.currentTime >= VideoTime.MaxTime)

    if (video.currentTime >= VideoTime.MaxTime || !isCurtainOpen) {
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

    if (video.currentTime >= VideoTime.MaxTime) {
      video.currentTime = VideoTime.MaxTime
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
