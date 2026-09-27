import './App.scss'
import ConfettiFullScreen from './components/confetti/ConfettiFullScreen'
import goldenScratchImage from './media/images/golden-scratch.jpg'
import Curtain from './modules/curtain/Curtain'
import DressCode from './modules/dressCode/DressCode'
import ScratchCards from './modules/scratchCards/ScratchCards'

function App() {
  return (
    <>
      <ConfettiFullScreen />
      <div className="full-screen-content">
        <Curtain />
      </div>

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
  )
}

export default App
