import './App.css'
import Curtain from './components/curtain/Curtain'
import { ScrollReveal } from './components/scrollReveal/ScrollReveal'

function App() {  
  return (
    <>
      <Curtain />
      <ScrollReveal childComponent={
        <div>
          <h2>Animate on Scroll with Framer Motion</h2>
          <p>This reveals gracefully when 20% of it rolls into the viewport.</p>
        </div>
      } />
    </>
  )
}

export default App
