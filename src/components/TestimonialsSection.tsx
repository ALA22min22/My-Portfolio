import { Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useState } from "react"

interface TestimonialProps {
  quote: string
  name: string
  position: string
  gradient: string
}

const TestimonialCard = ({ quote, name, position, gradient }: TestimonialProps) => {
  const [isHovered, setIsHovered] = useState(false)
  
  // Extract colors from gradient for glow effect
  const getGlowColor = (gradient: string) => {
    if (gradient.includes('cyan')) return '#00ddff'
    if (gradient.includes('purple')) return '#a855f7'
    if (gradient.includes('pink')) return '#ec4899'
    if (gradient.includes('blue')) return '#3b82f6'
    return '#00ddff' // default
  }

  const glowColor = getGlowColor(gradient)

  return (
    <motion.div
      className="flex-shrink-0 w-[400px] mx-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        scale: 1.05,
        boxShadow: `0 20px 40px ${glowColor}20, 0 0 60px ${glowColor}30`,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card 
        className="glass-panel rounded-2xl p-8 relative h-full transition-all hover:bg-glass-bg-hover overflow-hidden"
        style={{
          boxShadow: isHovered 
            ? `0 10px 30px ${glowColor}40, 0 0 40px ${glowColor}20, inset 0 0 20px ${glowColor}10`
            : `0 5px 15px ${glowColor}20, 0 0 20px ${glowColor}10`
        }}
      >
        {/* Large Pulsing Quote Background */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <Quote className="text-[200px] text-white" />
        </motion.div>

        {/* Holographic Border Effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 opacity-30 pointer-events-none"
          style={{ borderColor: glowColor }}
          animate={isHovered ? {
            opacity: [0.3, 0.6, 0.3],
          } : {}}
          transition={{ duration: 1, repeat: Infinity }}
        />

        {/* Small Quote Icon */}
        <div className="absolute top-6 right-6 opacity-10">
          <Quote className="text-6xl text-white" />
        </div>
        
        <CardContent className="p-0 relative z-10">
          <motion.p 
            className="text-gray-300 italic relative z-10 mb-6 text-sm leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            "{quote}"
          </motion.p>
          
          <motion.div 
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div 
              className={`h-10 w-10 rounded-full ${gradient} relative`}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              style={{
                boxShadow: isHovered ? `0 0 20px ${glowColor}60` : `0 0 10px ${glowColor}30`
              }}
            >
              {/* Avatar glow ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 opacity-50"
                style={{ borderColor: glowColor }}
                animate={isHovered ? {
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </motion.div>
            <div>
              <h4 className="text-white font-bold text-sm">{name}</h4>
              <p className="text-gray-500 text-xs">{position}</p>
            </div>
          </motion.div>
        </CardContent>

        {/* Holographic Corner Accents */}
        <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 opacity-40" style={{ borderColor: glowColor }} />
        <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 opacity-40" style={{ borderColor: glowColor }} />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 opacity-40" style={{ borderColor: glowColor }} />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 opacity-40" style={{ borderColor: glowColor }} />
      </Card>
    </motion.div>
  )
}

export const TestimonialsSection = () => {
  const [isPaused, setIsPaused] = useState(false)

  const testimonials = [
    {
      quote: "Alamin's expertise in the MERN stack was evident when he developed our collaborative learning platform. His ability to integrate Firebase authentication with a complex MongoDB database made the application both secure and highly efficient.",
      name: "James Wilson",
      position: "Product Manager, EdTech Solutions",
      gradient: "bg-gradient-to-tr from-cyan-400 to-blue-500"
    },
    {
      quote: "Working with Alamin was a fantastic experience. He transformed our e-commerce vision into a pixel-perfect React application. His use of Tailwind CSS for smooth animations and responsive design truly set our brand apart in the watch industry.",
      name: "Sophia Martinez",
      position: "CEO, EliteTime Luxury",
      gradient: "bg-gradient-to-tr from-purple-400 to-pink-500"
    }
  ]

  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials]

  return (
    <motion.section 
      id="testimonials"
      className="overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <motion.h2 
        className="text-3xl font-bold tracking-tight text-white md:text-4xl mb-8 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        My Clients Say
      </motion.h2>
      
      {/* Infinite Horizontal Slider Container */}
      <div className="relative">
        {/* Gradient Fade Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0f1221] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0f1221] to-transparent z-10 pointer-events-none" />
        
        {/* Scrolling Container */}
        <motion.div
          className="flex"
          animate={isPaused ? {} : { x: [0, -100 * testimonials.length + "%"] }}
          transition={isPaused ? {} : {
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20, // Adjust speed here
              ease: "linear",
            },
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          style={{ width: `${duplicatedTestimonials.length * 400 + duplicatedTestimonials.length * 32}px` }}
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <TestimonialCard key={`${testimonial.name}-${index}`} {...testimonial} />
          ))}
        </motion.div>
      </div>

      {/* Holographic Status Indicators */}
      <motion.div
        className="flex justify-center mt-8 gap-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1 }}
      >
        {testimonials.map((_, index) => (
          <motion.div
            key={index}
            className="w-2 h-2 rounded-full bg-cyan-400/50"
            animate={{ 
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              delay: index * 0.5 
            }}
          />
        ))}
      </motion.div>

      {/* Pause Indicator */}
      {isPaused && (
        <motion.div
          className="absolute top-4 right-4 bg-cyan-400/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-cyan-400 font-mono"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          PAUSED
        </motion.div>
      )}
    </motion.section>
  )
}