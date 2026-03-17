import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Mail, Github, Linkedin, Phone, Quote } from 'lucide-react'


export function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  // Animation for the entire assembly falling from above
  const assemblyY = useTransform(scrollYProgress, [0, 0.4, 0.6], [-600, 0, 0])
  const assemblyRotate = useTransform(scrollYProgress, [0, 0.4], [-10, 0])
  const flipRotateY = useTransform(scrollYProgress, [0.4, 0.6], [0, 180])
  const lanyardHeight = useTransform(scrollYProgress, [0, 0.4], [100, 200])



  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative min-h-[120vh] flex flex-col items-center justify-start py-20 overflow-hidden"
    >
      {/* Background Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 text-center z-10"
      >
        <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-4">Get in Touch.</h2>
        <p className="text-foreground font-bold text-xs uppercase tracking-[0.3em] opacity-60">Let's build something amazing together</p>
      </motion.div>

      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* The "Assembly" (Lanyard + Card) */}
        <div className="relative flex flex-col items-center scale-[0.67]">

          {/* Lanyard/Ribbon */}
          <motion.div
            style={{
              y: assemblyY,
              height: lanyardHeight,
              rotate: assemblyRotate,
              backgroundImage: `
                repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 4px),
                repeating-linear-gradient(-45deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 4px)
              `
            }}
            className="w-10 md:w-12 bg-[#222] z-30 origin-top shadow-xl relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-black/20" />

            {/* Lanyard Clip */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-10 md:w-14 md:h-12 bg-[#333] rounded-sm shadow-md flex items-center justify-center z-40">
              <div className="w-4 h-4 md:w-5 md:h-5 rounded-full border-[2px] md:border-[3px] border-[#555] flex items-center justify-center">
                <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-secondary" />
              </div>
            </div>

            {/* Extension of lanyard */}
            <div className="absolute bottom-full left-0 w-full h-[100vh] bg-[#222]">
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-black/20" />
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 4px),
                  repeating-linear-gradient(-45deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 4px)
                `
              }} />
            </div>
          </motion.div>

          {/* Card Container */}
          <div className="relative flex items-center justify-center">
            {/* The ID Card */}
            <motion.div
              style={{
                y: assemblyY,
                rotate: assemblyRotate,
                rotateY: flipRotateY,
                transformStyle: "preserve-3d",
                perspective: 1200,
                marginTop: -8
              }}
              className="relative w-[320px] md:w-[380px] h-[500px] md:h-[580px] z-20"
            >
              {/* FRONT FACE */}
              <div
                className="absolute inset-0 w-full h-full rounded-[30px] md:rounded-[40px] overflow-hidden border-[6px] md:border-[8px] border-[#1a1a1a] bg-[#FF5B22] flex flex-col items-center justify-start shadow-2xl backface-hidden"
                style={{ backfaceVisibility: 'hidden' }}
              >
                {/* Badge Slot */}
                <div className="absolute top-4 md:top-6 left-1/2 -translate-x-1/2 w-12 md:w-16 h-2 md:h-2.5 bg-[#1a1a1a] rounded-full shadow-inner" />

                {/* Person Image Container */}
                <div className="mt-12 md:mt-14 w-[85%] aspect-[4/5] bg-[#e5e5e5] rounded-xl md:rounded-2xl overflow-hidden relative border border-black/10">
                  <img
                    src="/images/ID card.png"
                    alt="Arafat Rahman"
                    className="w-full h-full object-cover scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />

                  <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 text-white">
                    <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">Design/Automation</p>
                    <h3 className="text-xl md:text-2xl font-black tracking-tighter uppercase leading-none">PRODUCT<br />TRAINEE</h3>
                  </div>
                </div>

                <div className="flex-1 w-full px-8 pt-6 flex flex-col justify-between">
                  <h1 className="text-5xl font-black tracking-tighter text-white leading-none uppercase">ARAFAT<br />RAHMAN</h1>

                  <div className="flex flex-col gap-6 pb-6 md:pb-8">
                    <div className="flex items-end justify-between text-white/60 font-mono text-[8px] md:text-[9px] uppercase tracking-widest border-t border-white/20 pt-4">
                      <div className="space-y-1">
                        <p>Leveling up at.</p>
                        <p className="font-bold text-white/90 uppercase tracking-tighter">Bacbon LTD.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Texture Overlay */}
                <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-20 bg-[url('https://www.transparenttextures.com/patterns/scratched-metal.png')]" />
              </div>

              {/* BACK FACE */}
              <div
                className="absolute inset-0 w-full h-full rounded-[30px] md:rounded-[40px] overflow-hidden border-[6px] md:border-[8px] border-black bg-[#0d0d0d] flex flex-col items-center justify-between shadow-2xl"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  boxShadow: '0 0 50px rgba(0,0,0,0.8), inset 0 0 20px rgba(255,91,34,0.05)'
                }}
              >
                {/* Premium Dark Grid Detail */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                  style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '16px 16px' }} />

                {/* Badge Slot */}
                <div className="absolute top-4 md:top-6 left-1/2 -translate-x-1/2 w-12 md:w-16 h-2 md:h-2.5 bg-black rounded-full shadow-inner z-10" />

                <div className="flex-1 w-full flex flex-col items-center justify-center px-6 gap-6 pt-10 z-10">
                  <div className="text-center space-y-2">
                    <motion.div
                      className="w-12 h-12 bg-brand-orange/10 rounded-xl flex items-center justify-center mx-auto border border-brand-orange/20 mb-4"
                      animate={{
                        boxShadow: ['0 0 0 rgba(255,91,34,0)', '0 0 20px rgba(255,91,34,0.2)', '0 0 0 rgba(255,91,34,0)']
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Quote className="text-brand-orange w-6 h-6" />
                    </motion.div>
                    <h3 className="text-white text-2xl md:text-3xl font-black uppercase tracking-tighter leading-tight">
                      Ready to<br /><span className="text-brand-orange">Initiate?</span>
                    </h3>
                  </div>

                  <div className="w-full space-y-2.5">
                    {[
                      { icon: <Mail size={22} />, label: 'Email', value: 'arafatrahmann11@gmail.com', href: 'mailto:arafatrahmann11@gmail.com' },
                      { icon: <Phone size={22} />, label: 'Phone', value: '+8801718140698', href: 'tel:+8801718140698' },
                      { icon: <Linkedin size={22} />, label: 'LinkedIn', value: 'Arafat Rahman', href: 'https://www.linkedin.com/in/arafat-rahman-97898214b/' },
                      { icon: <Github size={22} />, label: 'GitHub', value: 'arafat-dev', href: 'https://github.com/AIarafatnoob' }
                    ].map((item, idx) => (
                      <motion.a
                        key={item.label}
                        href={item.href}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ delay: 0.4 + idx * 0.08, duration: 0.4 }}
                        className="flex w-full items-center text-left gap-4 bg-white/[0.03] backdrop-blur-md border border-white/10 p-3 pl-4 pr-12 rounded-full transition-all group relative overflow-hidden h-[72px]"
                      >
                        <div className="w-12 h-12 shrink-0 rounded-full bg-white/5 flex items-center justify-center text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-all duration-300">
                          {item.icon}
                        </div>
                        <div className="flex-1 min-w-0 pr-4">
                          <p className="text-[9px] uppercase font-black tracking-[0.2em] text-white/40 leading-none mb-1.5">{item.label}</p>
                          <p className="text-sm md:text-base font-bold text-white/90 truncate">{item.value}</p>
                        </div>

                        {/* Interactive hover indicator */}
                        <div className="absolute right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                          <div className="w-2.5 h-2.5 rounded-full bg-brand-orange shadow-[0_0_12px_#FF5B22]" />
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </div>

                <div className="w-full px-8 pb-8 z-10 flex flex-col items-center">
                  <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4" />
                  <div className="flex items-center gap-2 opacity-30">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-white">
                      AVAILABLE FOR PROJECTS
                    </p>
                  </div>
                </div>

                {/* Glass Scratch Texture */}
                <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-20 bg-[url('https://www.transparenttextures.com/patterns/scratched-metal.png')]" />
                <div className="absolute inset-x-0 top-0 h-[100%] bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
