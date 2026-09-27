import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react'

type CurtainContextValue = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  videoTime: number
  setVideoTime: Dispatch<SetStateAction<number>>
  isVideoAtEnd: boolean
  setIsVideoAtEnd: Dispatch<SetStateAction<boolean>>
  cardsCompleted: number
  completeCard: (cardId: string) => void
}

const CurtainContext = createContext<CurtainContextValue | null>(null)

export function CurtainProvider({
  children,
}: {
  children: ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [videoTime, setVideoTime] = useState(0)
  const [isVideoAtEnd, setIsVideoAtEnd] = useState(false)
  const [completedCardIds, setCompletedCardIds] = useState<Set<string>>(
    () => new Set(),
  )
  const cardsCompleted = completedCardIds.size

  const completeCard = (cardId: string) => {
    setCompletedCardIds((current) => {
      if (current.has(cardId)) {
        return current
      }

      return new Set(current).add(cardId)
    })
  }

  useEffect(() => {
    const html = document.documentElement
    const previousOverflowY = html.style.overflowY
    const canScrollPage = isOpen && isVideoAtEnd
    const shouldClampAtScratchSection = canScrollPage && cardsCompleted < 3

    html.style.overflowY = canScrollPage ? 'auto' : 'hidden'

    const scratchSection = document.querySelector<HTMLElement>(
      '.scratch-card-section',
    )

    const clampToScratchSection = () => {
      if (!scratchSection || cardsCompleted === 3) {
        return
      }

      const sectionTop = scratchSection.getBoundingClientRect().top + window.scrollY
      const sectionBottom = sectionTop + scratchSection.offsetHeight
      const maxScrollY = Math.max(0, sectionBottom - window.innerHeight)

      if (window.scrollY > maxScrollY) {
        window.scrollTo(0, maxScrollY)
      }
    }

    if (shouldClampAtScratchSection) {
      window.addEventListener('scroll', clampToScratchSection, { passive: true })
    }

    return () => {
      window.removeEventListener('scroll', clampToScratchSection)
      html.style.overflowY = previousOverflowY
    }
  }, [isOpen, isVideoAtEnd, cardsCompleted])

  return (
    <CurtainContext.Provider
      value={{
        isOpen,
        setIsOpen,
        videoTime,
        setVideoTime,
        isVideoAtEnd,
        setIsVideoAtEnd,
        cardsCompleted,
        completeCard,
      }}
    >
      {children}
    </CurtainContext.Provider>
  )
}

export function useCurtain() {
  const context = useContext(CurtainContext)

  if (!context) {
    throw new Error('useCurtain must be used within CurtainProvider')
  }

  return context
}
