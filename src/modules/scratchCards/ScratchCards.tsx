import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import CenterText from '../../components/centeredText/CenterText'
import ScratchCardWidget from '../../components/scratchCard/ScratchCardWidget'
import ScrollReveal from '../../components/scrollReveal/ScrollReveal'
import { useCurtain } from '../../contexts/CurtainContext'

const ScratchCards = () => {
  const { completeCard, cardsCompleted } = useCurtain()
  const shouldReduceMotion = useReducedMotion()
  const transition = {
    duration: shouldReduceMotion ? 0 : 0.9,
    ease: 'easeInOut' as const,
  }

  return (
    <AnimatePresence initial={false} mode="sync">
      {cardsCompleted === 3 ? (
        <motion.section
          key="invitation"
          className="invitation-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transition}
          aria-labelledby="invitation-title"
        >
          <p className="invitation-eyebrow text-white">SAVE THE DATE</p>
          <h1 id="invitation-title">You're invited</h1>
          <p className="invitation-date">24 December 2027</p>
          <p className="invitation-copy">Join us for a day of celebration.</p>
        </motion.section>
      ) : (
        <motion.div
          key="scratch-cards"
          className="scratch-card-date"
          exit={{ opacity: 0 }}
          transition={transition}
        >
          <h2 className="scratch-card-heading">Reveal the date</h2>
          <h3 className="scratch-card-heading-small">Scratch the cards</h3>
          <ScrollReveal
            childComponent={
              <div>
                <ScratchCardWidget
                  content={<CenterText text="24" />}
                  onComplete={() => completeCard('day')}
                />
              </div>
            }
          />
          <ScrollReveal
            childComponent={
              <div>
                <ScratchCardWidget
                  content={<CenterText text="December" />}
                  onComplete={() => completeCard('month')}
                />
              </div>
            }
          />
          <ScrollReveal
            childComponent={
              <div>
                <ScratchCardWidget
                  content={<CenterText text="2027" />}
                  onComplete={() => completeCard('year')}
                />
              </div>
            }
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ScratchCards