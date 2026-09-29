import React from 'react'
import './Curtain.scss'
import Video from '../../components/video/Video'
import { useCurtain } from '../../contexts/CurtainContext'

const Curtain: React.FC = () => {
  const { isOpen, setIsOpen, videoTime } = useCurtain()
  const isButtonDimmed = videoTime >= 1 && videoTime < 12

  return (
    <>
      <div className={`stage ${isOpen ? 'open' : ''}`} id="stage">
        <div className="content">
          <Video isCurtainOpen={isOpen} />
        </div>
        <div className="curtain left">
          <div className="fabric"></div>
          <div className="pleats"></div>
        </div>
        <div className="curtain right">
          <div className="fabric"></div>
          <div className="pleats"></div>
        </div>
        <div className="center-shadow"></div>
        <button
          className={`curtain-toggle ${isButtonDimmed ? 'dimmed' : ''}`}
          type="button"
          aria-expanded={isOpen}
          aria-controls="stage"
          style={{ opacity: isButtonDimmed ? 0.1 : 1 }}
          onClick={() => setIsOpen((current) => !current)}
        >
          <span aria-hidden="true">✦</span>
          {isOpen ? 'Close' : 'Open'}
          <span aria-hidden="true">✦</span>
        </button>
      </div>
    </>
  )
}

export default Curtain
