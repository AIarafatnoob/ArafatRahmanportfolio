import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const presentations = [
  {
    id: 1,
    title: 'BSRM Pitch Deck',
    subtitle: 'Grey BD',
    date: 'June 2022',
    image: 'images/Presentations/BSRM.Jpg',
    link: 'https://drive.google.com/drive/folders/1_dd5CP0_VbBY4vSaby-hDgiYTHZHa19W?usp=drive_link',
    accent: 'from-orange-600/20 to-amber-600/20'
  },
  {
    id: 2,
    title: 'Daraz 11.11 Pitch Deck',
    subtitle: 'Grey BD',
    date: 'July 2022',
    image: 'images/Presentations/Daraz.png',
    link: 'https://drive.google.com/drive/folders/1_dd5CP0_VbBY4vSaby-hDgiYTHZHa19W?usp=drive_link',
    accent: 'from-purple-500/20 to-pink-500/20'
  },
  {
    id: 3,
    title: 'BacBon Business Portfolio',
    subtitle: 'BacBon Limited',
    date: 'January 2026',
    image: 'images/Presentations/BacBon.png',
    link: 'https://drive.google.com/drive/folders/1_dd5CP0_VbBY4vSaby-hDgiYTHZHa19W?usp=drive_link',
    accent: 'from-orange-500/20 to-red-500/20'
  },
  {
    id: 4,
    title: 'Honda Moodboard',
    subtitle: 'High-Performance Systems Design',
    date: 'June 2022',
    image: 'images/Presentations/Honda.png',
    link: 'https://drive.google.com/drive/folders/1_dd5CP0_VbBY4vSaby-hDgiYTHZHa19W?usp=drive_link',
    accent: 'from-orange-500/20 to-red-500/20'
  }
]

export function PresentationsSection() {
  const targetRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: targetRef,
  })

  // Horizontal scroll transform
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%'])

  return (
    <section ref={targetRef} id="presentations" className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">

        {/* Section Header */}
        <div className="absolute top-32 left-8 md:left-24 z-10">
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-foreground uppercase">
            Visual storytelling.
          </h2>
        </div>

        {/* Slides Track */}
        <motion.div style={{ x }} className="flex gap-16 px-8 md:px-24 pt-32 w-max items-center">
          {presentations.map((slide) => (
            <div
              key={slide.id}
              className="group relative w-[75vw] md:w-[45vw] lg:w-[35vw] h-[45vh] max-h-[450px] flex-shrink-0 rounded-[40px] overflow-hidden bg-white border border-foreground/5 shadow-2xl transition-all duration-500 hover:-translate-y-4"
            >
              {/* Image with overlay */}
              <div className="absolute inset-0 z-0">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${slide.accent} mix-blend-multiply opacity-60 group-hover:opacity-20 transition-opacity duration-500`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 group-hover:opacity-40 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="relative z-10 h-full w-full p-8 md:p-12 flex flex-col justify-end">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2 block">
                      {slide.date}
                    </span>
                    <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase mb-2">
                      {slide.title}
                    </h3>
                    <p className="text-white/80 font-medium text-sm md:text-lg max-w-md">
                      {slide.subtitle}
                    </p>
                  </div>

                  <motion.a
                    href={slide.link}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="hidden md:flex items-center justify-center w-20 h-20 rounded-full bg-white text-black text-xs font-black uppercase tracking-tighter hover:bg-[#FF5B22] hover:text-white transition-colors duration-300 shadow-xl"
                  >
                    View
                  </motion.a>
                </div>
              </div>

              {/* Decorative Index */}
              <div className="absolute top-8 right-8 text-8xl font-black text-white/5 pointer-events-none">
                0{slide.id}
              </div>
            </div>
          ))}

        </motion.div>


      </div>
    </section>
  )
}
