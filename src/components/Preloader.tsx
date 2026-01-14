import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface PreloaderProps {
  onComplete: () => void
}

export const Preloader = ({ onComplete }: PreloaderProps) => {
  const [showText, setShowText] = useState(true)

  useEffect(() => {
    // Hide text after 2.5 seconds, then complete after fade out
    const textTimer = setTimeout(() => {
      setShowText(false)
    }, 2500)

    // Complete preloader after fade out animation
    const completeTimer = setTimeout(() => {
      onComplete()
    }, 3200)

    return () => {
      clearTimeout(textTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0f1221] overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: showText ? 1 : 0 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </motion.div>

      {/* Welcome Text Container */}
      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ 
          opacity: showText ? 1 : 0, 
          y: showText ? 0 : -50 
        }}
        transition={{ 
          duration: showText ? 0.8 : 0.7, 
          ease: showText ? "easeOut" : "easeIn" 
        }}
      >
        {/* Main Welcome Text */}
        <motion.h1
          className="text-6xl md:text-8xl font-bold text-primary mb-4 select-none"
          style={{
            textShadow: `
              0 0 20px rgba(0, 221, 255, 0.5),
              0 0 40px rgba(0, 221, 255, 0.3),
              0 0 60px rgba(0, 221, 255, 0.2)
            `
          }}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 1.2, 
            ease: "easeOut",
            delay: 0.2 
          }}
        >
          Welcome
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl text-gray-300 font-light tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            ease: "easeOut",
            delay: 0.8 
          }}
        >
          to my portfolio
        </motion.p>

        {/* Animated Dots */}
        <motion.div
          className="flex justify-center gap-2 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-2 h-2 bg-primary rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Animated Border */}
      <motion.div
        className="absolute inset-4 border border-primary/20 rounded-3xl pointer-events-none"
        initial={{ 
          pathLength: 0,
          opacity: 0 
        }}
        animate={{ 
          pathLength: 1,
          opacity: 0.3 
        }}
        transition={{ 
          duration: 2,
          ease: "easeInOut",
          delay: 0.5 
        }}
      />

      {/* Floating Particles */}
      {[...Array(6)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-1 h-1 bg-primary/40 rounded-full"
          style={{
            left: `${20 + index * 15}%`,
            top: `${30 + (index % 2) * 40}%`
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.2, 0.8, 0.2],
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 3 + index * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.3
          }}
        />
      ))}
    </motion.div>
  )
}