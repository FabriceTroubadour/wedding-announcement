import './App.scss'
import ConfettiFullScreen from './components/confetti/ConfettiFullScreen'
import { useCurtain } from './contexts/CurtainContext'
import goldenScratchImage from './media/images/golden-scratch.jpg'
import Curtain from './modules/curtain/Curtain'
import DressCode from './modules/dressCode/DressCode'
import ScratchCards from './modules/scratchCards/ScratchCards'

function App() {
  const { videoTime } = useCurtain()

  return (
    <>
      <ConfettiFullScreen />
      <div className="full-screen-content">
        <Curtain />
      </div>

      {videoTime >= 13 && (
        <>
          <div
            className="scratch-card-section"
            style={
              {
                '--scratch-card-background': `url("${goldenScratchImage}")`,
              } as React.CSSProperties
            }
          >
            <ScratchCards />
          </div>

          <DressCode />
        </>
      )}
    </>
  )
}

export default App
