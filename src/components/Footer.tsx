import { Code } from "lucide-react"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { MdEmail } from "react-icons/md"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

// Typewriter effect component for copyright text
const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }
    }, delay + currentIndex * 50)

    return () => clearTimeout(timer)
  }, [currentIndex, text, delay])

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)

    return () => clearInterval(cursorTimer)
  }, [])

  return (
    <span className="font-mono">
      {displayText}
      {showCursor && currentIndex <= text.length && (
        <span className="text-cyan-400 animate-pulse">|</span>
      )}
    </span>
  )
}

// Magnetic effect component for social icons
const MagneticIcon = ({ 
  children, 
  href, 
  glowColor, 
  hoverColor,
  delay = 0 
}: { 
  children: React.ReactNode
  href: string
  glowColor: string
  hoverColor: string
  delay?: number
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const deltaX = (e.clientX - centerX) * 0.3
    const deltaY = (e.clientY - centerY) * 0.3
    setMousePosition({ x: deltaX, y: deltaY })
  }

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 })
    setIsHovered(false)
  }

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 transition-all ${hoverColor}`}
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6, 
        delay: delay,
        type: "spring",
        stiffness: 200,
        damping: 15
      }}
      animate={{
        x: mousePosition.x,
        y: mousePosition.y,
        scale: isHovered ? 1.15 : 1,
      }}
      whileHover={{
        boxShadow: `0 0 20px ${glowColor}40, 0 0 40px ${glowColor}20`,
        borderColor: `${glowColor}80`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        filter: isHovered ? `drop-shadow(0 0 10px ${glowColor})` : 'none',
      }}
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {children}
      </motion.div>
    </motion.a>
  )
}

export const Footer = () => {
  return (
    <motion.footer 
      className="mt-12 flex flex-col items-center justify-between gap-8 border-t border-white/10 pt-10 pb-8 md:flex-row"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Logo Section with Tech Terminal Feel */}
      <motion.div 
        className="flex items-center gap-3"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Spinning Logo with Hover Glow */}
        <motion.div 
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary relative"
          animate={{ 
            rotate: 360,
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          whileHover={{
            scale: 1.1,
            filter: "drop-shadow(0 0 15px #00ddff) drop-shadow(0 0 25px #00ddff40)",
            boxShadow: "0 0 20px #00ddff40, inset 0 0 20px #00ddff20",
          }}
        >
          <motion.div
            whileHover={{
              textShadow: "0 0 10px #00ddff, 0 0 20px #00ddff, 0 0 30px #00ddff",
            }}
          >
            <Code className="font-bold" />
          </motion.div>
          
          {/* Pulsing Ring Effect on Hover */}
          <motion.div
            className="absolute inset-0 rounded-xl border-2 border-cyan-400/0"
            whileHover={{
              borderColor: "#00ddff60",
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 0.6, repeat: Infinity }}
          />
        </motion.div>

        {/* Brand Text with Terminal Styling */}
        <div className="flex flex-col">
          <motion.span 
            className="text-lg font-bold text-white tracking-wide font-mono"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Alamin<span className="text-primary">.Dev</span>
          </motion.span>
          
          {/* Typewriter Copyright Text */}
          <motion.span 
            className="text-xs text-gray-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <TypewriterText 
              text="© 2024 MD. Alamin. All rights reserved." 
              delay={800}
            />
          </motion.span>
        </div>
      </motion.div>

      {/* Social Icons with Magnetic Effects */}
      <motion.div 
        className="flex gap-5"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {/* GitHub Icon */}
        <MagneticIcon
          href="https://github.com/ALA22min22"
          glowColor="#00ddff"
          hoverColor="hover:text-cyan-400 hover:border-cyan-400/50"
          delay={0.1}
        >
          <span className="sr-only">GitHub</span>
          <FaGithub className="h-6 w-6" />
        </MagneticIcon>

        {/* LinkedIn Icon */}
        <MagneticIcon
          href="https://bd.linkedin.com/in/md-alamin-dev/"
          glowColor="#0ea5e9"
          hoverColor="hover:text-blue-400 hover:border-blue-500/50"
          delay={0.2}
        >
          <span className="sr-only">LinkedIn</span>
          <FaLinkedin className="h-6 w-6" />
        </MagneticIcon>

        {/* Email Icon */}
        <MagneticIcon
          href="mailto:2213081052@uttarauniversity.edu.bd"
          glowColor="#ef4444"
          hoverColor="hover:text-red-500 hover:border-red-500/50"
          delay={0.3}
        >
          <span className="sr-only">Email</span>
          <MdEmail className="h-6 w-6" />
        </MagneticIcon>
      </motion.div>

      {/* Terminal-style Background Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.05 }}
        viewport={{ once: true }}
        transition={{ duration: 2, delay: 1 }}
      >
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
      </motion.div>
    </motion.footer>
  )
}