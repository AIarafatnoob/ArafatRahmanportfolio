import { motion, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { Check } from 'lucide-react'

interface ContactButtonProps {
  icon: React.ReactNode;
  value: string;
  href: string;
  label: string;
  className?: string;
}

export function ContactButton({ icon, value, href, label, className = "" }: ContactButtonProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const holdTimer = useRef<any>(null);

  const handleStart = () => {
    setIsHolding(true);
    holdTimer.current = setTimeout(() => {
      navigator.clipboard.writeText(value);
      setIsCopied(true);
      setIsHolding(false);
      if (window.navigator.vibrate) window.navigator.vibrate(50);
      setTimeout(() => setIsCopied(false), 2000);
    }, 800);
  };

  const handleEnd = () => {
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
    setIsHolding(false);
  };

  return (
    <div className={`relative group ${className}`}>
      <motion.a
        href={href}
        onMouseDown={handleStart}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchEnd={handleEnd}
        onClick={(e) => {
          if (isCopied || isHolding) e.preventDefault();
        }}
        className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white backdrop-blur-md transition-all duration-300 relative overflow-hidden"
        whileTap={{ scale: 0.9 }}
      >
        <div className="relative z-10">
          {isCopied ? <Check className="w-4 h-4" /> : icon}
        </div>
        
        <AnimatePresence>
          {isHolding && (
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: '100%' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "linear" }}
              className="absolute bottom-0 left-0 w-full bg-white/30 z-0"
            />
          )}
        </AnimatePresence>
      </motion.a>
      
      {/* Tooltip */}
      <div className="absolute -top-9 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 backdrop-blur px-2 py-1 rounded text-[8px] font-bold text-white uppercase tracking-tighter pointer-events-none whitespace-nowrap z-50">
        {isCopied ? 'Copied!' : `Hold to copy ${label}`}
      </div>
    </div>
  );
}
