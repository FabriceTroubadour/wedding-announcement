import CenterText from '../../components/centeredText/CenterText'
import ScratchCardWidget from '../../components/scratchCard/ScratchCardWidget'
import ScrollReveal from '../../components/scrollReveal/ScrollReveal'
import { useCurtain } from '../../contexts/CurtainContext'

const ScratchCards = () => {
  const { completeCard } = useCurtain()

  return (
    <>
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
      /></>
  )
}

export default ScratchCards