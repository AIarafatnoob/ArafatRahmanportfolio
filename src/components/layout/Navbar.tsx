import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const links = ['Home', 'Projects', 'Experience', 'Contact']

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-6 pointer-events-none flex justify-center"
    >
      <div className="flex items-center justify-between md:justify-center bg-[rgba(255,91,34,0.1)] backdrop-blur-xl px-8 py-3 rounded-full pointer-events-auto shadow-2xl border border-white/30 min-w-[300px] sm:min-w-[400px] md:min-w-0">
        {/* Mobile Branding/Spacer (Only visible on mobile to push menu to right) */}
        <div className="md:hidden flex items-center">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40">Menu</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 items-center text-black">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-xs font-bold uppercase tracking-[0.2em] hover:text-black/70 transition-all hover:scale-105 inline-block"
            >
              {link}
            </a>
          ))}
          <a
            href="/CV/ARAFAT RAHMAN CV 2026 March.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 rounded-full bg-white text-[#FF5B22] text-xs font-bold uppercase tracking-widest hover:bg-white/90 transition-all ml-4"
          >
            Resume
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-black hover:text-black/80 transition-colors p-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        className={`absolute top-[100px] left-6 right-6 bg-[rgba(255,91,34,0.1)] backdrop-blur-xl rounded-2xl p-6 pointer-events-auto flex flex-col gap-6 md:hidden shadow-2xl border border-white/30 ${isOpen ? 'block' : 'hidden'}`}
      >
        {links.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            onClick={() => setIsOpen(false)}
            className="text-lg font-bold text-black uppercase tracking-[0.2em] hover:text-black/80 transition-colors"
          >
            {link}
          </a>
        ))}
        <div className="pt-2 border-t border-white/20">
          <a
            href="/CV/ARAFAT RAHMAN CV 2026 March.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="w-full text-center px-6 py-3 rounded-full bg-white text-[#FF5B22] text-sm font-bold uppercase tracking-widest hover:bg-white/90 transition-all block"
          >
            Resume
          </a>
        </div>
      </motion.div>
    </motion.nav>
  )
}
