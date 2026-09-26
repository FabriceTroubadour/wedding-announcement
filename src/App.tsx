import './App.scss'
import ConfettiFullScreen from './components/confetti/ConfettiFullScreen'
import Curtain from './modules/curtain/Curtain'
import ScratchCards from './modules/scratchCards/ScratchCards'

function App() {
  return (
    <>
      <ConfettiFullScreen />
      <div className="full-screen-content">
        <Curtain />
      </div>

      <div className="full-screen-content scratch-card-section">
        <ScratchCards />
      </div>
    </>
  )
}

export default App
