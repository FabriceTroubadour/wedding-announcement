import useWindowSize from '../../utilities/useWindowSize'
import DressCodeFull from '../../media/images/dress-code.png'
import DressCodeTitle from '../../media/images/dress-code-title.png'
import ManWomanDressCode from '../../media/images/man-woman-dress-code.png'
import ChildrenDressCode from '../../media/images/children-dress-code.png'

import './DressCode.scss'

const DressCode = () => {
  const { width } = useWindowSize()
  const useSplitImages = width < 600

  return (
    <section className="dress-code-section">
      {useSplitImages ? (
        <div className="dress-code-split">
          <img
            className="dress-code-title-image"
            src={DressCodeTitle}
            alt="Dress code"
          />
          <img
            className="dress-code-illustration"
            src={ManWomanDressCode}
            alt="Illustration of a man and woman in wedding attire"
          />
          <img
            className="dress-code-illustration"
            src={ChildrenDressCode}
            alt="Illustration of children in wedding attire"
          />
        </div>
      ) : (
        <img
          className="dress-code-image"
          src={DressCodeFull}
          alt="Wedding dress code guide"
        />
      )}
    </section>
  )
}

export default DressCode
