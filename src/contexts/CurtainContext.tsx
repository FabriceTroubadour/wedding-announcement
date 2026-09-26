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
  isVideoAtEnd: boolean
  setIsVideoAtEnd: Dispatch<SetStateAction<boolean>>
}

const CurtainContext = createContext<CurtainContextValue | null>(null)

export function CurtainProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isVideoAtEnd, setIsVideoAtEnd] = useState(false)

  useEffect(() => {
    const html = document.documentElement
    const previousOverflowY = html.style.overflowY

    html.style.overflowY = isOpen && isVideoAtEnd ? 'auto' : 'hidden'

    return () => {
      html.style.overflowY = previousOverflowY
    }
  }, [isOpen, isVideoAtEnd])

  return (
    <CurtainContext.Provider value={{ isOpen, setIsOpen, isVideoAtEnd, setIsVideoAtEnd }}>
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