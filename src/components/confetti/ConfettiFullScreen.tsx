import { useCurtain } from '../../contexts/CurtainContext'
import useWindowSize from '../../utilities/customHooks/useWindowSize'
import Confetti from 'react-confetti'

const ConfettiFullScreen = () => {
  const { width, height } = useWindowSize()
  const { cardsCompleted } = useCurtain()

  return (
    <>
      {cardsCompleted === 3 && (
        <Confetti
          width={width}
          height={height}
          colors={['#FFD700']}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2000,
            pointerEvents: 'none',
          }}
          recycle={false}
          numberOfPieces={600}
        />
      )}
    </>
  )
}

export default ConfettiFullScreen
