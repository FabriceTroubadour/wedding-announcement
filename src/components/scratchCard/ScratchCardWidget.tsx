import { ScratchCard } from 'next-scratchcard'
import GoldenTicket from '../../media/images/golden-scratch.jpg'
import useWindowSize from '../../utilities/useWindowSize'

const LANDSCAPE_CARD_ASPECT_RATIO = 1.45
const MAX_CARD_WIDTH = 600

const ScratchCardWidget: React.FC<{ content: React.ReactNode, onComplete?: () => void }> = ({ content, onComplete }) => {
  const { width: windowWidth, height: windowHeight } = useWindowSize()
  const isWideLayout = windowWidth >= 900 && windowWidth > windowHeight
  const availableWidth = isWideLayout
    ? (windowWidth - 128) / 3
    : windowWidth - 48
  const cardWidth = Math.max(1, Math.min(MAX_CARD_WIDTH, availableWidth))
  const cardHeight = Math.round(cardWidth / LANDSCAPE_CARD_ASPECT_RATIO)

  return (
    <div className="scratch-card-widget">
      <ScratchCard
        width={cardWidth}
        height={cardHeight}
        finishPercent={isWideLayout ? 80 : 70}
        image={GoldenTicket}
        brushSize={isWideLayout ? 60 : 25}
        onComplete={onComplete}
      >
        {content}
      </ScratchCard>
    </div>
  )
}

export default ScratchCardWidget
