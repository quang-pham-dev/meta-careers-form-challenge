'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface FadeUpProps {
  children: React.ReactNode
  delay?: number
  duration?: number
}

export function AnimatedFadeUp({
  children,
  delay = 0,
  duration = 0.5,
}: FadeUpProps) {
  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: 15,
        },
        visible: {
          opacity: 1,
          y: 0,
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay, type: 'spring', duration }}>
      {children}
    </motion.div>
  )
}
