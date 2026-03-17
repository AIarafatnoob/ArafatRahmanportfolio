import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const tools = [
  {
    name: 'Antigravity AI',
    description: 'Autonomous AI agent for complex coding & debugging.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <path d="M12 2L4 7v10l8 5 8-5V7l-8-5z" stroke="#FF5B22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 22V12" stroke="#34A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 12l8-5M12 12L4 7" stroke="#EA4335" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="3" fill="#FBBC05" fillOpacity="0.8"/>
      </svg>
    ),
    accent: 'from-[#FF5B22]/10 via-[#FBBC05]/10 to-[#EA4335]/10'
  },
  {
    name: 'Gemini',
    description: "Google's flagship multimodal AI model.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <defs>
          <linearGradient id="gemini-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF5B22" />
            <stop offset="33%" stopColor="#EA4335" />
            <stop offset="66%" stopColor="#FBBC05" />
            <stop offset="100%" stopColor="#34A853" />
          </linearGradient>
        </defs>
        <path d="M12 2C12 2 12.5 9.5 20 12C12.5 14.5 12 22 12 22C12 22 11.5 14.5 4 12C11.5 9.5 12 2 12 2Z" fill="url(#gemini-gradient)" />
      </svg>
    ),
    accent: 'from-orange-500/20 via-red-500/10 to-yellow-500/20'
  },
  {
    name: 'Google Stitch',
    description: 'AI-first professional UI design & prototyping.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <path d="M12 2L4 7v10l8 5 8-5V7l-8-5z" stroke="#FF5B22" strokeWidth="1.5"/>
        <path d="M9 12h6M12 9v6" stroke="#EA4335" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="12" cy="12" r="6" stroke="#34A853" strokeWidth="1" strokeDasharray="2 2" />
        <path d="M17 7l2 2M5 17l2 2" stroke="#FBBC05" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    accent: 'from-[#FF5B22]/10 to-[#34A853]/10'
  },
  {
    name: 'Claude Code',
    description: "Anthropic's safety-focused coding assistant.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <path d="M12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4ZM12 18C8.69 18 6 15.31 6 12C6 8.69 8.69 6 12 6C15.31 6 18 8.69 18 12C18 15.31 15.31 18 12 18Z" fill="#D97757"/>
        <path d="M10 10L14 14M14 10L10 14" stroke="#D97757" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    accent: 'from-[#D97757]/20 to-[#B1ADA1]/20'
  },
  {
    name: 'Figma',
    description: 'The standard for collaborative interface design.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <circle cx="7" cy="5" r="3.5" fill="#F24E1E"/>
        <circle cx="14" cy="5" r="3.5" fill="#FF7262"/>
        <circle cx="7" cy="12" r="3.5" fill="#A259FF"/>
        <circle cx="14" cy="12" r="3.5" fill="#1ABCFE"/>
        <path d="M3.5 19a3.5 3.5 0 013.5-3.5h3.5v3.5a3.5 3.5 0 01-3.5 3.5 3.5 3.5 0 01-3.5-3.5z" fill="#0ACF83"/>
      </svg>
    ),
    accent: 'from-[#F24E1E]/20 via-[#A259FF]/20 to-[#FF5B22]/20'
  },
  {
    name: 'Cursor AI',
    description: 'AI-native IDE for intelligent pair-programming.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <path d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" stroke="#F54E00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13 13L19 19" stroke="#F54E00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    accent: 'from-[#F54E00]/20 to-orange-400/20'
  },
  {
    name: 'n8n',
    description: 'Workflow automation for sophisticated AI pipelines.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <circle cx="12" cy="12" r="3" stroke="#EA4B71" strokeWidth="2"/>
        <path d="M12 9V2M12 22V15M19 12H22M2 12H5" stroke="#EA4B71" strokeWidth="2" strokeLinecap="round"/>
        <path d="M17 17L21 21M3 3L7 7M17 7L21 3M3 21L7 17" stroke="#EA4B71" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    accent: 'from-[#EA4B71]/20 to-pink-400/20'
  },
  {
    name: 'Framer Motion',
    description: 'Advanced animation and gesture library for React.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <path d="M12 22V15L5 8L12 1L19 8L12 15" fill="#BC4FD3"/>
      </svg>
    ),
    accent: 'from-[#BC4FD3]/20 to-purple-400/20'
  }
]


export function ToolsSection() {
  const targetRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  })

  // Increased distance for 8 items
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%'])


  return (
    <section ref={targetRef} id="tools" className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        {/* Section Header */}
        <div className="absolute top-32 left-8 md:left-24 z-10 w-full max-w-md">
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-foreground uppercase">
            Stack.
          </h2>
        </div>

        {/* Horizontal Scroll Track */}
        <motion.div style={{ x }} className="flex gap-12 px-8 md:px-24 pt-32 w-max">
          {tools.map((tool, idx) => (
            <div 
              key={idx} 
              className="relative w-[75vw] md:w-[45vw] lg:w-[35vw] h-[45vh] max-h-[450px] flex-shrink-0 rounded-[40px] overflow-hidden group bg-white border border-foreground/5 shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              {/* Animated Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${tool.accent} z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
              
              <div className="relative z-10 h-full w-full p-12 flex flex-col items-center justify-center text-center">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="mb-8 p-6 rounded-3xl bg-foreground/5 group-hover:bg-white transition-all duration-500 shadow-sm group-hover:shadow-xl"
                >
                  {tool.icon}
                </motion.div>
                
                <h3 className="text-3xl font-black text-foreground tracking-tighter uppercase mb-2">
                  {tool.name}
                </h3>
                <p className="text-sm text-muted font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100 group-hover:text-foreground transition-all leading-relaxed max-w-[280px]">
                  {tool.description}
                </p>
              </div>

              {/* Decorative Corner Element */}
              <div className="absolute top-8 right-8 w-2 h-2 rounded-full bg-foreground/10 group-hover:bg-[#FF5B22] transition-colors" />
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
