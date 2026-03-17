import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const GRID_SIZE = 40

export function GridBackground() {
  const [mounted, setMounted] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([])

  useEffect(() => {
    setMounted(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      const snappedX = Math.round(e.clientX / GRID_SIZE) * GRID_SIZE
      const snappedY = Math.round(e.clientY / GRID_SIZE) * GRID_SIZE
      
      setMousePos({ x: snappedX, y: snappedY })
      
      setTrail(prev => {
        // Only add if it's a new grid point
        const last = prev[prev.length - 1]
        if (last && last.x === snappedX && last.y === snappedY) return prev
        
        const newTrail = [...prev, { x: snappedX, y: snappedY, id: Date.now() }]
        if (newTrail.length > 8) newTrail.shift()
        return newTrail
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* The Base Grid Layer */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--color-foreground) 1px, transparent 1px),
            linear-gradient(to bottom, var(--color-foreground) 1px, transparent 1px)
          `,
          backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`
        }}
      />

      {/* Active Cursor Crosshair Lines */}
      <motion.div 
        className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-brand-orange/30 to-transparent"
        animate={{ left: mousePos.x }}
        transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.5 }}
      />
      <motion.div 
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-orange/30 to-transparent"
        animate={{ top: mousePos.y }}
        transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.5 }}
      />

      {/* Cursor Intersection Point */}
      <motion.div
        className="absolute w-4 h-4 border border-brand-orange rotate-45 bg-background shadow-[0_0_10px_rgba(255,91,34,0.3)] z-10"
        animate={{ left: mousePos.x - 8, top: mousePos.y - 8, scale: [1, 1.2, 1] }}
        transition={{ 
          left: { type: 'spring', damping: 30, stiffness: 200, mass: 0.5 },
          top: { type: 'spring', damping: 30, stiffness: 200, mass: 0.5 },
          scale: { duration: 2, repeat: Infinity }
        }}
      />

      {/* Cursor Path Highlight (The Trail) */}
      <svg className="absolute inset-0 w-full h-full overflow-visible">
        <AnimatePresence>
          {trail.map((point, i) => {
            const opacity = (i / trail.length) * 0.4
            return (
              <g key={point.id}>
                {i > 0 && (
                  <motion.line
                    x1={trail[i-1].x}
                    y1={trail[i-1].y}
                    x2={point.x}
                    y2={point.y}
                    stroke="var(--color-brand-orange)"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  />
                )}
                <motion.circle
                  cx={point.x}
                  cy={point.y}
                  r="2"
                  fill="var(--color-brand-orange)"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </g>
            )
          })}
        </AnimatePresence>
      </svg>

      {/* Hover Glow Effect */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        animate={{ left: mousePos.x - 200, top: mousePos.y - 200 }}
        transition={{ type: 'spring', damping: 30, stiffness: 150, mass: 0.8 }}
        style={{
          background: 'radial-gradient(circle at center, rgba(255, 91, 34, 0.08) 0%, transparent 70%)',
          filter: 'blur(40px)'
        }}
      />
    </div>
  )
}
