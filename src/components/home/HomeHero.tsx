import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { useRef } from 'react'


interface RollingTextProps {
  text: string;
  delay?: number;
  className?: string;
}

function RollingText({ text, delay = 0, className = "" }: RollingTextProps) {
  const words = text.split(" ");

  return (
    <div className={`flex flex-wrap gap-x-2 overflow-hidden ${className}`}>
      {words.map((word, wordIdx) => (
        <div key={wordIdx} className="relative overflow-hidden h-[1.2em] flex flex-col">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + wordIdx * 0.1
            }}
            className="flex flex-col"
          >
            {/* The "Rolling" effect: 3 copies of the word */}
            <span className="opacity-0">{word}</span>
            <span className="absolute inset-0">{word}</span>
            <span className="absolute top-[100%] inset-0">{word}</span>
          </motion.div>
        </div>
      ))}
    </div>
  );
}

export function HomeHero() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Mouse tracking for swaying effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth springs for mouse movement
  const springConfig = { damping: 25, stiffness: 150 }
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [12, -12]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-12, 12]), springConfig)
  const badgeSpringX = useSpring(useTransform(mouseX, [-300, 300], [-20, 20]), springConfig)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const bgTextY = useTransform(scrollYProgress, [0, 1], [0, -200])
  const badgeY = useTransform(scrollYProgress, [0, 1], [0, 300])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative h-[150vh] overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200 }}
    >
      {/* Large Background Typography */}
      <motion.div
        style={{ y: bgTextY, opacity }}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-0"
      >
        <h2 className="text-[15vw] font-black leading-none -mt-40 tracking-tighter opacity-40 bg-clip-text text-transparent bg-gradient-to-r from-accent via-foreground/20 to-accent bg-[length:200%_auto] animate-gradient-slow">
          PRODUCT
        </h2>
        <h2 className="text-[15vw] font-black leading-none tracking-tighter opacity-40 bg-clip-text text-transparent bg-gradient-to-r from-accent via-foreground/20 to-accent bg-[length:200%_auto] animate-gradient-slow">
          DEV
        </h2>
      </motion.div>

      <motion.div
        style={{ scale, opacity }}
        className="sticky top-0 h-screen w-full flex items-center justify-center px-6 z-10"
      >
        {/* Scale Container for the Asset */}
        <div className="absolute inset-0 flex items-center justify-center scale-[0.67] pointer-events-none">
          <motion.div 
            className="relative w-full h-full flex items-center justify-center pointer-events-auto"
            style={{ y: badgeY, x: badgeSpringX }}
            initial={{ y: -800, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >

            {/* Lanyard/Ribbon */}
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-12 bg-[#222] z-0 origin-top shadow-xl"
              style={{
                height: 'calc(50vh - 220px)',
                rotateZ: useTransform(badgeSpringX, [-20, 20], [3, -3]),
                backgroundImage: `
                  repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 4px),
                  repeating-linear-gradient(-45deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 4px),
                  linear-gradient(90deg, rgba(255,255,255,0.05) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)
                `,
              }}
            >
              {/* Lanyard Extension to prevent gap when scaled */}
              <div className="absolute bottom-full left-0 w-full h-[150vh] bg-[#222]" 
              style={{ 
                backgroundImage: `
                  repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 4px),
                  repeating-linear-gradient(-45deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 4px),
                  linear-gradient(90deg, rgba(255,255,255,0.05) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)
                ` 
              }} />

              {/* Lanyard Clip/Connector */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-14 h-8 bg-[#333] rounded-sm shadow-md flex items-center justify-center">
                <div className="w-4 h-4 rounded-full border-[3px] border-[#555]" />
              </div>
            </motion.div>

            <motion.div
              style={{
                rotateX,
                rotateY,
                rotateZ: useTransform(badgeSpringX, [-20, 20], [-3, 3]),
                transformStyle: "preserve-3d"
              }}
              className="relative w-[320px] md:w-[380px] h-[500px] md:h-[580px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] rounded-[40px] overflow-hidden group border-[8px] border-[#1a1a1a] bg-[#FF5B22] flex flex-col items-center justify-start"
            >
              {/* Badge Slot */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-16 h-2.5 bg-[#1a1a1a] rounded-full shadow-inner" />

          {/* Person Image Container */}
          <div className="mt-16 w-[85%] aspect-[4/5] bg-[#e5e5e5] rounded-2xl overflow-hidden relative border border-black/10">
            <img
              src="/images/ID card.png"
              alt="Arafat Rahman"
              className="w-full h-full object-cover scale-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />

            {/* Overlay Text like the reference */}
            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">Design/Automation</p>
              <h3 className="text-2xl font-black leading-tight tracking-tighter">PRODUCT<br />TRAINEE</h3>
            </div>
          </div>

          <div className="flex-1 w-full px-8 pt-6 flex flex-col justify-between">
            <h1 className="text-5xl font-black tracking-tighter text-white leading-none uppercase">ARAFAT<br />RAHMAN</h1>

            <div className="flex flex-col gap-6 pb-8">
              <div className="flex items-end justify-between text-white/60 font-mono text-[9px] uppercase tracking-widest border-t border-white/20 pt-4">
                <div className="space-y-1">
                  <p>Leveling up at.</p>
                  <p className="font-bold text-white/90 uppercase tracking-tighter">Bacbon LTD.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Plastic Shine Effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-500"
            style={{
              background: useTransform(
                [rotateX, rotateY],
                ([rx, ry]) => {
                  const x = 50 + (ry as number) * 2
                  const y = 50 + (rx as number) * 2
                  return `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.9) 0%, transparent 50%)`
                }
              )
            }}
          />

          {/* Surface Scratches Texture Overlay */}
          <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-20 bg-[url('https://www.transparenttextures.com/patterns/scratched-metal.png')]" />
        </motion.div>

          </motion.div>
        </div>

        {/* Floating Callouts */}
        <div className="absolute left-6 md:left-24 top-24 md:top-1/3 flex flex-col items-start gap-4 z-20">
          <RollingText
            text="(HELLO! I'M ARAFAT)"
            delay={1.2}
            className="text-2xl md:text-5xl font-black text-foreground tracking-tighter max-w-[200px] md:max-w-[400px]"
          />
        </div>

        <div className="absolute right-6 md:right-24 bottom-32 md:bottom-auto md:top-1/2 flex flex-col items-end gap-4 z-20">
          <RollingText
            text="SOLVING PROBLEMS WITH AESTHETICS AND EMPATHY"
            delay={1.5}
            className="text-lg md:text-4xl font-black text-foreground tracking-tighter max-w-[250px] md:max-w-[500px] justify-end text-right"
          />
        </div>

      </motion.div>
    </section>
  )
}
