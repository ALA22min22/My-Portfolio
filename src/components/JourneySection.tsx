import { Card, CardContent } from "@/components/ui/card"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"

interface JourneyItemProps {
  period: string
  title: string
  institution: string
  description: string
  color: string
  position: 'left' | 'right'
}

// Energy Node Component
const EnergyNode = ({ color, position }: { color: string, position: 'left' | 'right' }) => {
  // Extract color for glow effect
  const getGlowColor = (colorClass: string) => {
    if (colorClass.includes('primary')) return '#FF5E14'
    if (colorClass.includes('purple')) return '#a855f7'
    if (colorClass.includes('blue')) return '#3b82f6'
    if (colorClass.includes('pink')) return '#ec4899'
    return '#00ddff' // default cyan
  }

  const glowColor = getGlowColor(color)

  return (
    <motion.div
      className={`absolute ${position === 'right' ? 'left-[23px] md:-left-[10px]' : 'left-[23px] md:-right-[10px] md:left-auto'} top-8 z-10`}
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {/* Outer Energy Ring */}
      <motion.div
        className="absolute inset-0 w-8 h-8 rounded-full border-2 opacity-30"
        style={{ borderColor: glowColor }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.1, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Middle Energy Ring */}
      <motion.div
        className="absolute inset-0 w-8 h-8 rounded-full border-2 opacity-50"
        style={{ borderColor: glowColor }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.2, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />

      {/* Core Energy Node */}
      <motion.div
        className={`w-8 h-8 rounded-full border-2 ${color} bg-[#0f1221] relative z-10`}
        animate={{
          boxShadow: [
            `0 0 10px ${glowColor}60`,
            `0 0 25px ${glowColor}80`,
            `0 0 10px ${glowColor}60`,
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Inner Core */}
        <motion.div
          className={`h-3 w-3 rounded-full ${color.replace('border-', 'bg-').replace('/80', '')} absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.7, 1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </motion.div>
  )
}

const JourneyItem = ({ period, title, institution, description, color, position }: JourneyItemProps) => {
  const [isHovered, setIsHovered] = useState(false)

  // Extract color for glow effect
  const getGlowColor = (colorClass: string) => {
    if (colorClass.includes('primary')) return '#FF5E14'
    if (colorClass.includes('purple')) return '#a855f7'
    if (colorClass.includes('blue')) return '#3b82f6'
    if (colorClass.includes('pink')) return '#ec4899'
    return '#00ddff' // default cyan
  }

  const glowColor = getGlowColor(color)

  return (
    <motion.div 
      className={`relative mb-16 ${position === 'right' ? 'md:w-1/2 md:ml-auto md:pl-16 pl-20' : 'md:w-1/2 md:mr-auto md:pr-16 md:ml-0 pl-20 md:text-right'}`}
      initial={{ 
        opacity: 0, 
        x: position === 'right' ? 100 : -100 
      }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <EnergyNode color={color} position={position} />
      
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ 
          y: -5, 
          scale: 1.02,
          boxShadow: `0 20px 40px ${glowColor}20, 0 0 60px ${glowColor}30`
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Card 
          className="glass-panel group relative overflow-hidden rounded-2xl p-8 transition-all hover:bg-glass-bg-hover"
          style={{
            boxShadow: isHovered 
              ? `0 10px 30px ${glowColor}40, 0 0 40px ${glowColor}20`
              : `0 5px 15px ${glowColor}10`
          }}
        >
          {/* Holographic Flicker Effect */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"
              animate={{
                x: ['-100%', '100%'],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                repeatDelay: 2
              }}
            />
          )}

          {/* Holographic Corner Accents */}
          <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 opacity-40" style={{ borderColor: glowColor }} />
          <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 opacity-40" style={{ borderColor: glowColor }} />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 opacity-40" style={{ borderColor: glowColor }} />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 opacity-40" style={{ borderColor: glowColor }} />

          <CardContent className={`relative z-10 p-0 ${position === 'left' ? 'flex flex-col md:items-end' : ''}`}>
            <motion.div 
              className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* Neon Glowing Period Badge */}
              <motion.span 
                className={`inline-flex items-center gap-1.5 rounded-full ${color.replace('border-', 'bg-').replace('/80', '/10')} px-3 py-1 text-xs font-bold ${color.replace('border-', 'text-').replace('/80', '-400')} ring-1 ring-inset ${color.replace('border-', 'ring-').replace('/80', '/20')} relative`}
                animate={{
                  boxShadow: [
                    `0 0 5px ${glowColor}40`,
                    `0 0 15px ${glowColor}60`,
                    `0 0 5px ${glowColor}40`,
                  ],
                  textShadow: [
                    `0 0 5px ${glowColor}60`,
                    `0 0 10px ${glowColor}80`,
                    `0 0 5px ${glowColor}60`,
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {period}
                
                {/* Badge Inner Glow */}
                <motion.div
                  className="absolute inset-0 rounded-full opacity-20"
                  style={{ backgroundColor: glowColor }}
                  animate={{
                    opacity: [0.1, 0.3, 0.1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.span>
            </motion.div>
            
            <motion.h3 
              className="text-2xl font-bold text-white mb-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {title}
            </motion.h3>
            
            <motion.h4 
              className={`text-base font-medium ${color.replace('border-', 'text-').replace('/80', '-300')} mb-4`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {institution}
            </motion.h4>
            
            <motion.p 
              className="text-gray-300 text-sm leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              {description}
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

export const JourneySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  // Transform scroll progress to timeline height
  const timelineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  const journeyItems = [
    {
      period: "2021 - 2025",
      title: "B.Sc. in Computer Science & Engineering",
      institution: "Uttara University, Dhaka",
      description: "Currently pursuing a Bachelor of Science degree in CSE. Gaining essential knowledge to handle challenging software engineering tasks and flourish in my professional career.",
      color: "border-primary/80",
      position: 'right' as const
    },
    {
      period: "Current Focus",
      title: "Full-Stack Web Development",
      institution: "MERN Stack",
      description: "Developed dynamic applications like StudyMate and Dragon News using React, Node.js, and MongoDB. Passionate about technology and eager to gain real-world experience as a skilled software engineer.",
      color: "border-purple-500/80",
      position: 'left' as const
    },
    {
      period: "2020",
      title: "Higher Secondary Certificate",
      institution: "BTEB, Dhaka",
      description: "Completed Higher Secondary Certificate in the Computer group with a result of 3.87. This phase provided a solid technical foundation for further studies in engineering.",
      color: "border-blue-500/80",
      position: 'right' as const
    },
    {
      period: "2017",
      title: "Secondary School Certificate",
      institution: "BTEB, Dhaka",
      description: "Passed the Secondary School Certificate in the Computer group with a result of 4.36. Initiated my journey in technical education and computers during this period.",
      color: "border-pink-500/80",
      position: 'left' as const
    }
  ]

  return (
    <motion.section 
      ref={sectionRef}
      className="relative py-8" 
      id="journey"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <motion.div 
        className="mb-12 text-center md:mb-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">My Personal Journey</h2>
        <p className="mt-4 text-lg text-gray-400">Milestones that define my professional path</p>
      </motion.div>

      <div className="relative mx-auto max-w-5xl px-4 md:px-0">
        {/* Static Timeline Background */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 -ml-px bg-gray-800/30" />
        
        {/* Animated Timeline Line with Cyan-Blue Gradient */}
        <motion.div 
          className="absolute left-8 md:left-1/2 top-0 w-0.5 -ml-px bg-gradient-to-b from-cyan-400 via-blue-500 to-cyan-400 shadow-[0_0_10px_#00ddff]"
          style={{ 
            height: timelineHeight,
            filter: "drop-shadow(0 0 5px #00ddff)"
          }}
          initial={{ height: "0%" }}
        />

        {/* Holographic Timeline Glow Effect */}
        <motion.div 
          className="absolute left-8 md:left-1/2 top-0 w-1 -ml-0.5 bg-gradient-to-b from-cyan-400/20 via-blue-500/20 to-cyan-400/20 blur-sm"
          style={{ height: timelineHeight }}
          initial={{ height: "0%" }}
        />
        
        {journeyItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 * index }}
          >
            <JourneyItem {...item} />
          </motion.div>
        ))}
      </div>

      {/* Holographic Status Indicators */}
      <motion.div
        className="absolute top-4 right-4 flex flex-col gap-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1 }}
      >
        <motion.div
          className="w-3 h-3 rounded-full bg-cyan-400/50 border border-cyan-400/30"
          animate={{ 
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity 
          }}
        />
        <motion.div
          className="w-2 h-2 rounded-full bg-blue-400/50 border border-blue-400/30"
          animate={{ 
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            delay: 0.5 
          }}
        />
        <motion.div
          className="w-1 h-1 rounded-full bg-purple-400/50 border border-purple-400/30"
          animate={{ 
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            delay: 1 
          }}
        />
      </motion.div>
    </motion.section>
  )
}