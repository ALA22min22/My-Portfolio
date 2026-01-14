import { Brain, Wrench } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, useAnimation } from "framer-motion"
import { useEffect, useState } from "react"
import { 
  FaReact, 
  FaNodeJs, 
  FaFigma, 
  FaGitAlt, 
  FaFirefox 
} from "react-icons/fa"
import { 
  SiTailwindcss, 
  SiJavascript, 
  SiMongodb, 
  SiExpress,
  SiNextdotjs,
  SiVercel,
  SiNetlify,
  SiPostman
} from "react-icons/si"

// Animated Progress Bar Component
const AnimatedProgressBar = ({ 
  skill, 
  index 
}: { 
  skill: { name: string; percentage: number }, 
  index: number 
}) => {
  const [progress, setProgress] = useState(0)
  const controls = useAnimation()

  useEffect(() => {
    controls.start({
      width: `${skill.percentage}%`,
      transition: {
        duration: 1.5,
        delay: index * 0.2,
        ease: "easeOut"
      }
    })

    // Animate the number counter
    const timer = setTimeout(() => {
      let current = 0
      const increment = skill.percentage / 30
      const counter = setInterval(() => {
        current += increment
        if (current >= skill.percentage) {
          setProgress(skill.percentage)
          clearInterval(counter)
        } else {
          setProgress(Math.floor(current))
        }
      }, 50)
    }, index * 200)

    return () => clearTimeout(timer)
  }, [skill.percentage, index, controls])

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 * index }}
    >
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-200">{skill.name}</span>
        <motion.span 
          className="text-sm font-medium text-primary"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {progress}%
        </motion.span>
      </div>
      
      <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden relative">
        {/* Holographic Progress Fill */}
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full relative"
          initial={{ width: "0%" }}
          animate={controls}
          style={{
            boxShadow: "0 0 10px rgba(0,221,255,0.6), 0 0 20px rgba(0,221,255,0.4)",
            filter: "drop-shadow(0 0 5px #00ddff)"
          }}
        >
          {/* Inner Glow Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-cyan-300/50 to-blue-400/50 rounded-full"
            animate={{
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Scanning Line Effect */}
          <motion.div
            className="absolute top-0 right-0 w-1 h-full bg-white/80 rounded-full"
            animate={{
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: index * 0.2
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

// Holographic Tool Icon Component
const HolographicTool = ({ 
  tool, 
  index 
}: { 
  tool: { icon: React.ReactNode; name: string }, 
  index: number 
}) => {
  const [isHovered, setIsHovered] = useState(false)

  // Get glow color based on tool name
  const getGlowColor = (name: string) => {
    switch (name.toLowerCase()) {
      case 'react': return '#61dafb'
      case 'tailwind css': return '#06b6d4'
      case 'javascript': return '#f7df1e'
      case 'next.js': return '#ffffff'
      case 'node.js': return '#339933'
      case 'express.js': return '#ffffff'
      case 'mongodb': return '#47a248'
      case 'figma': return '#f24e1e'
      case 'git': return '#f05032'
      case 'firebase': return '#ffca28'
      case 'vercel': return '#ffffff'
      case 'netlify': return '#00c7b7'
      case 'postman': return '#ff6c37'
      default: return '#00ddff'
    }
  }

  const glowColor = getGlowColor(tool.name)

  return (
    <motion.div
      className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-primary/30 hover:bg-white/10 transition-all relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5, 
        delay: 0.05 * index,
        type: "spring",
        stiffness: 200
      }}
      whileHover={{ 
        scale: 1.15, 
        y: -5,
        boxShadow: `0 10px 30px ${glowColor}40, 0 0 40px ${glowColor}30`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Holographic Background Glow */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-xl opacity-20"
          style={{ backgroundColor: glowColor }}
          animate={{
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Icon Container */}
      <motion.div
        animate={isHovered ? {
          filter: `drop-shadow(0 0 10px ${glowColor}) drop-shadow(0 0 20px ${glowColor}40)`,
          textShadow: `0 0 10px ${glowColor}`
        } : {}}
        transition={{ duration: 0.3 }}
      >
        {tool.icon}
      </motion.div>
      
      <span className="text-xs text-gray-300 relative z-10">{tool.name}</span>

      {/* Holographic Corner Accents */}
      {isHovered && (
        <>
          <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 opacity-60" style={{ borderColor: glowColor }} />
          <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 opacity-60" style={{ borderColor: glowColor }} />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 opacity-60" style={{ borderColor: glowColor }} />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 opacity-60" style={{ borderColor: glowColor }} />
        </>
      )}
    </motion.div>
  )
}

const skills = [
  { name: "HTML & CSS", percentage: 95 },
  { name: "Tailwind CSS", percentage: 95 },
  { name: "JavaScript", percentage: 90 },
  { name: "React", percentage: 90 },
  { name: "Next.js", percentage: 70 },
  { name: "Node.js & Express.js", percentage: 85 },
  { name: "Firebase", percentage: 85 },
  { name: "MongoDB", percentage: 90 },
  { name: "UI/UX Design", percentage: 80 }
]

const tools = [
  { icon: <FaReact className="w-8 h-8 text-cyan-400" />, name: "React" },
  { icon: <SiTailwindcss className="w-8 h-8 text-cyan-400" />, name: "Tailwind CSS" },
  { icon: <SiJavascript className="w-8 h-8 text-yellow-400" />, name: "JavaScript" },
  { icon: <SiNextdotjs className="w-8 h-8 text-white" />, name: "Next.js" },
  { icon: <FaNodeJs className="w-8 h-8 text-green-500" />, name: "Node.js" },
  { icon: <SiExpress className="w-8 h-8 text-gray-400" />, name: "Express.js" },
  { icon: <SiMongodb className="w-8 h-8 text-green-500" />, name: "MongoDB" },
  { icon: <FaFigma className="w-8 h-8 text-purple-500" />, name: "Figma" },
  { icon: <FaGitAlt className="w-8 h-8 text-red-500" />, name: "Git" },
  { icon: <FaFirefox className="w-8 h-8 text-orange-500" />, name: "Firebase" },
  { icon: <SiVercel className="w-8 h-8 text-white" />, name: "Vercel" },
  { icon: <SiNetlify className="w-8 h-8 text-cyan-400" />, name: "Netlify" },
  { icon: <SiPostman className="w-8 h-8 text-orange-500" />, name: "Postman" }
]

export const SkillsSection = () => {
  return (
    <motion.section 
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative" 
      id="skills"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* HUD Background Grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0,221,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,221,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px'
        }} />
      </div>

      {/* Expertise Card - Slide from Left */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Card className="glass-panel rounded-3xl p-8 relative overflow-hidden">
          {/* Holographic Corner Accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-cyan-400/40" />
          <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-cyan-400/40" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-cyan-400/40" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-cyan-400/40" />

          <CardHeader className="p-0 pb-6">
            <CardTitle className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <Brain className="text-primary" />
              </motion.div>
              Expertise
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-0 space-y-5 relative z-10">
            {skills.map((skill, index) => (
              <AnimatedProgressBar key={index} skill={skill} index={index} />
            ))}
          </CardContent>

          {/* Holographic Glow Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-transparent to-blue-500/5 rounded-3xl pointer-events-none"
            animate={{
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </Card>
      </motion.div>

      {/* Toolbox Card - Slide from Right */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <Card className="glass-panel rounded-3xl p-8 relative overflow-hidden">
          {/* Holographic Corner Accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-pink-400/40" />
          <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-pink-400/40" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-pink-400/40" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-pink-400/40" />

          <CardHeader className="p-0 pb-6">
            <CardTitle className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <motion.div
                animate={{
                  rotate: [0, -360],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <Wrench className="text-pink-400" />
              </motion.div>
              Toolbox
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-0 relative z-10">
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
              {tools.map((tool, index) => (
                <HolographicTool key={index} tool={tool} index={index} />
              ))}
            </div>
          </CardContent>

          {/* Holographic Glow Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-pink-400/5 via-transparent to-purple-500/5 rounded-3xl pointer-events-none"
            animate={{
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </Card>
      </motion.div>

      {/* HUD Status Indicators */}
      <motion.div
        className="absolute top-4 right-4 flex gap-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1 }}
      >
        <motion.div
          className="w-2 h-2 rounded-full bg-green-400"
          animate={{ 
            opacity: [1, 0.3, 1],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="w-2 h-2 rounded-full bg-cyan-400"
          animate={{ 
            opacity: [1, 0.3, 1],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />
        <motion.div
          className="w-2 h-2 rounded-full bg-pink-400"
          animate={{ 
            opacity: [1, 0.3, 1],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />
      </motion.div>
    </motion.section>
  )
}