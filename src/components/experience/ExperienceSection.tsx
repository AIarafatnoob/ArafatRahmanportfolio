import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const experiences = [
  {
    id: 1,
    year: 'Aug 2022 – Present',
    role: 'Communication Executive',
    company: 'BacBon LTD | Dhaka, Bangladesh',
    descriptions: [
      'Coordinated daily operations between Japanese teachers, correctors, and developers, maintaining detailed progress reporting logs.',
      'Collaborated with Japanese stakeholders to ensure alignment on content quality, delivery timelines, and project expectations.',
      'Designed and implemented workflow improvements that significantly enhanced overall team efficiency.',
      'Developed a custom Chrome Extension that successfully reduced correction errors by 30% by displaying real-time instructions.',
      'Built dynamic KPI Monitoring Dashboards utilizing Google Sheets and Excel for comprehensive performance evaluation and competitor analysis.',
      'Created and reviewed educational content to accurately assess student language proficiency.'
    ]
  },
  {
    id: 2,
    year: 'Jan 2022 – Aug 2022',
    role: 'Client Service Intern',
    company: 'Grey BD | Dhaka, Bangladesh',
    descriptions: [
      'Assisted in campaign planning, interpreted client briefings, and contributed to pitch deck development.',
      'Conducted comprehensive research, competitive analysis, and data-driven reporting for multiple marketing campaigns.',
      'Collaborated cross-functionally with creative and strategy teams to ensure smooth project execution.',
      'Prepared visually engaging presentations and research decks to support successful client pitches.'
    ]
  },
  {
    id: 3,
    year: 'Aug 2019 – Aug 2021',
    role: 'SLC Corrector',
    company: 'BacBon LTD | Dhaka, Bangladesh',
    descriptions: [
      'Proofread over 50 student essays daily, delivering detailed and actionable feedback to enhance learning outcomes.',
      'Guided students to improve writing and speaking accuracy by providing structured, constructive comments.'
    ]
  },
  {
    id: 4,
    year: 'Feb 2018 – Aug 2019',
    role: 'Sales Representative',
    company: 'Imprint Dhaka LTD | Dhaka, Bangladesh',
    descriptions: [
      'Managed international client accounts based in Houston, Texas, via cold calling and efficient order processing.',
      'Expanded the customer base and coordinated with overseas suppliers to guarantee timely product deliveries.',
      'Resolved customer issues promptly, maintaining high satisfaction rates and fostering repeat business.'
    ]
  }
]

export function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  })

  // The line scales down based on scroll progress
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="experience" ref={containerRef} className="py-32 relative max-w-7xl mx-auto px-6 overflow-hidden">
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-24 text-center"
      >
        <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase">Journey.</h2>
        <p className="text-foreground font-bold text-xs uppercase tracking-[0.3em] mt-4 max-w-2xl mx-auto opacity-60">Career Timeline</p>
      </motion.div>

      <div className="relative mx-auto max-w-4xl">
        {/* The central timeline line background */}
        <div className="absolute top-0 bottom-0 left-[28px] md:left-1/2 w-[1px] bg-foreground/10 -translate-x-1/2" />
        
        {/* The active scrolling timeline line */}
        <motion.div 
          style={{ scaleY: lineScaleY, transformOrigin: 'top' }}
          className="absolute top-0 bottom-0 left-[28px] md:left-1/2 w-[2px] bg-secondary -translate-x-1/2 z-10 shadow-[0_0_10px_rgba(255,91,34,0.3)]"
        />

        <div className="flex flex-col gap-16 md:gap-24 relative z-20">
          {experiences.map((exp, index) => {
            const isEven = index % 2 === 0
            return (
              <div 
                key={exp.id}
                className={`flex flex-col md:flex-row items-start ${isEven ? 'md:flex-row-reverse' : ''} gap-8 md:gap-0`}
              >
                {/* 50% width spacer for desktop */}
                <div className="hidden md:block w-1/2" />
                
                {/* The Timeline Dot */}
                <div className="absolute left-[28px] md:left-1/2 w-4 h-4 rounded-full bg-white border-[3px] border-secondary -translate-x-1/2 mt-1.5 shadow-lg" />
                
                {/* Content Card */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? 50 : -50, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className={`w-full md:w-1/2 pl-16 md:px-12 ${isEven ? 'md:text-left' : 'md:text-right'}`}
                >
                  <div className="group bg-white border border-foreground/5 p-8 rounded-[32px] shadow-sm hover:shadow-xl hover:border-secondary/20 transition-all duration-300">
                    <span className="text-secondary font-bold text-xs uppercase tracking-widest mb-2 block">{exp.year}</span>
                    <h3 className="text-2xl font-black text-foreground mb-1 uppercase tracking-tight">{exp.role}</h3>
                    <h4 className="text-lg font-bold text-muted mb-4">{exp.company}</h4>
                    <ul className={`space-y-3 ${isEven ? 'text-left' : 'md:text-right'}`}>
                      {exp.descriptions.map((desc, i) => (
                        <li key={i} className="flex gap-3 text-foreground/60 leading-relaxed text-sm font-medium group-hover:text-foreground/80 transition-colors">
                          <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-secondary/40 mt-1.5" />
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
