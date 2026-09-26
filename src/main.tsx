import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CurtainProvider } from './contexts/CurtainContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CurtainProvider>
      <App />
    </CurtainProvider>
  </StrictMode>
)
