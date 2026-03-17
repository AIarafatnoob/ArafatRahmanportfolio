import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, ExternalLink, Github } from 'lucide-react'
import { useEffect } from 'react'

interface ProjectModalProps {
  project: {
    id: number
    title: string
    category: string
    image: string
    color: string
    challenge: string
    solution: string
    outcome: string
    links?: {
      live?: string
      github?: string
    }
  } | null
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden'
      document.body.classList.add('modal-open')
      // @ts-ignore
      window.lenis?.stop()
    } else {
      document.body.style.overflow = 'unset'
      document.body.classList.remove('modal-open')
      // @ts-ignore
      window.lenis?.start()
    }
    return () => {
      document.body.style.overflow = 'unset'
      document.body.classList.remove('modal-open')
      // @ts-ignore
      window.lenis?.start()
    }
  }, [project])

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  return (
    <AnimatePresence>
      {project && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 lg:p-12"
          data-lenis-prevent
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Content */}
          <motion.div
            layoutId={`project-card-${project.id}`}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-background w-full max-w-6xl h-full max-h-[90vh] rounded-[40px] overflow-hidden shadow-2xl border border-white/10 flex flex-col relative z-10"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-8 right-8 z-[110] p-4 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors"
            >
              <X size={24} />
            </button>

            {/* Scrollable Content Container */}
            <div 
              className="flex-1 overflow-y-auto custom-scrollbar"
              data-lenis-prevent
            >
              
              {/* Hero Section */}
              <div className="relative h-[40vh] md:h-[50vh] min-h-[300px] w-full">
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} z-10 mix-blend-multiply opacity-60`} />
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-20" />
                
                <div className="absolute bottom-12 left-8 md:left-16 z-30">
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-secondary font-bold text-xs uppercase tracking-[0.3em] mb-4"
                  >
                    0{project.id} — {project.category}
                  </motion.p>
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl md:text-7xl font-black text-foreground tracking-tighter uppercase leading-none"
                  >
                    {project.title}
                  </motion.h2>
                </div>
              </div>

              {/* Case Study Grid */}
              <div className="px-8 md:px-16 pt-12 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24">
                
                {/* Left Side: Metadata & Links */}
                <div className="lg:col-span-4 space-y-12">
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-secondary">Role / Context</h4>
                    <p className="text-sm text-foreground/70 uppercase tracking-wider font-bold">Concept Design & Development</p>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-secondary">Timeline</h4>
                    <p className="text-sm text-foreground/70 uppercase tracking-wider font-bold">8 Weeks Project</p>
                  </div>

                  <div className="flex flex-col gap-4 pt-4">
                    {project.links?.live && (
                      <a 
                        href={project.links.live} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
                      >
                        <span className="text-xs font-black uppercase tracking-widest">Live Site</span>
                        <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </a>
                    )}
                    {project.links?.github && (
                      <a 
                        href={project.links.github} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center justify-between p-6 rounded-2xl bg-foreground text-background hover:opacity-90 transition-opacity group"
                      >
                        <span className="text-xs font-black uppercase tracking-widest">Repository</span>
                        <Github size={18} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Side: Narrative */}
                <div className="lg:col-span-8 space-y-20">
                  
                  <section className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-[2px] bg-secondary" />
                      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary">The Challenge</h4>
                    </div>
                    <p className="text-lg md:text-xl leading-relaxed text-foreground/80 font-medium">
                      {project.challenge}
                    </p>
                  </section>

                  <section className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-[2px] bg-secondary" />
                      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary">The Solution</h4>
                    </div>
                    <p className="text-lg md:text-xl leading-relaxed text-foreground/80 font-medium">
                      {project.solution}
                    </p>
                  </section>

                  <section className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-[2px] bg-secondary" />
                      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary">The Outcome</h4>
                    </div>
                    <p className="text-lg md:text-xl leading-relaxed text-foreground/80 font-medium">
                      {project.outcome}
                    </p>
                  </section>

                  <div className="pt-12">
                    <button 
                      onClick={onClose}
                      className="group flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em] hover:text-secondary transition-colors"
                    >
                      Back to Overview
                      <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
