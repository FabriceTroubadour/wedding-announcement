import { motion } from 'framer-motion'
import React from 'react'

const ScrollReveal: React.FC<{
  childComponent: React.ReactNode
}> = ({ childComponent }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="scroll-reveal"
    >
      {childComponent}
    </motion.div>
  )
}

export default ScrollReveal