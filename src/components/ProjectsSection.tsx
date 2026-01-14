import { ExternalLink } from "lucide-react"
import { FaGithub } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useState, useRef } from "react"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  technologies: string[]
  githubUrl: string
  liveUrl: string
  reverse?: boolean
}

// Tech Scanning Line Component
const TechScanningLine = ({ isActive }: { isActive: boolean }) => {
  if (!isActive) return null

  return (
    <motion.div 
      className="absolute left-0 w-full h-[2px] bg-cyan-400 shadow-[0_0_15px_#00ddff] z-20"
      initial={{ top: "0%" }}
      animate={{ 
        top: ["0%", "100%", "0%"] 
      }}
      transition={{ 
        duration: 2, 
        repeat: Infinity, 
        ease: "linear" 
      }}
    />
  )
}

// 3D Tilt Image Component
const TiltImage = ({ src, alt, isHovered }: { src: string, alt: string, isHovered: boolean }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const imageRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return
    
    const rect = imageRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const rotateX = (e.clientY - centerY) / 10
    const rotateY = (centerX - e.clientX) / 10
    
    setMousePosition({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={imageRef}
      className="aspect-video w-full lg:w-1/2 overflow-hidden relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: mousePosition.x,
        rotateY: mousePosition.y,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ 
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
    >
      {/* Tech Scanning Line */}
      <TechScanningLine isActive={isHovered} />
      
      <motion.img
        alt={alt}
        className="h-full w-full object-cover transition-transform duration-500"
        src={src}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* HUD Overlay Grid */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 opacity-20 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 0.3 }}
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,221,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,221,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />
      )}
    </motion.div>
  )
}

const ProjectCard = ({ title, description, image, technologies, githubUrl, liveUrl, reverse = false }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        x: reverse ? 100 : -100 
      }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -10 }}
    >
      <Card 
        className={`glass-panel group flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} overflow-hidden rounded-2xl transition-all hover:bg-glass-bg-hover relative`}
        style={{
          boxShadow: isHovered 
            ? "0 20px 40px rgba(0,221,255,0.2), 0 0 60px rgba(0,221,255,0.3), inset 0 0 20px rgba(0,221,255,0.1)"
            : "0 10px 30px rgba(0,0,0,0.3)"
        }}
      >
        {/* Holographic Border Glow */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-cyan-400/60 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}

        {/* Holographic Flicker Overlay */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent pointer-events-none"
            animate={{
              x: ['-100%', '100%'],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 1
            }}
          />
        )}

        {/* HUD Corner Accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-cyan-400/40" />
        <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-cyan-400/40" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-cyan-400/40" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-cyan-400/40" />

        <TiltImage src={image} alt={title} isHovered={isHovered} />
        
        <CardContent className={`flex flex-1 flex-col p-8 lg:p-12 justify-center items-start ${reverse ? 'text-left' : 'text-left'} bg-white/5 lg:bg-transparent relative z-10`}>
          <motion.h3 
            className="text-2xl font-bold text-white lg:text-3xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {title}
          </motion.h3>
          
          <motion.p 
            className="mt-4 text-base text-gray-400 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {description}
          </motion.p>
          
          {/* Staggered Technology Tags */}
          <motion.div 
            className="mt-6 flex flex-wrap gap-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {technologies.map((tech, index) => (
              <motion.span
                key={index}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-cyan-400 relative overflow-hidden"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.4, 
                  delay: 0.5 + index * 0.1,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 0 15px rgba(0,221,255,0.5)"
                }}
              >
                {tech}
                
                {/* Tag Inner Glow */}
                <motion.div
                  className="absolute inset-0 bg-cyan-400/10 rounded-full"
                  animate={isHovered ? {
                    opacity: [0.1, 0.3, 0.1]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.span>
            ))}
          </motion.div>
          
          <motion.div 
            className="mt-8 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Button
              variant="outline"
              className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-bold text-white hover:bg-white/10 hover:border-cyan-400/50 transition-all"
              asChild
            >
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <FaGithub />
                Git Code
              </a>
            </Button>
            
            {/* Pulsing Live Demo Button */}
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 10px rgba(0,221,255,0.3)",
                  "0 0 25px rgba(0,221,255,0.6)",
                  "0 0 10px rgba(0,221,255,0.3)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Button
                className="flex items-center gap-2 rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-bold text-black hover:bg-cyan-400 relative overflow-hidden"
                asChild
              >
                <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                  {/* Power Core Inner Glow */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-300/20 via-cyan-400/40 to-cyan-300/20"
                    animate={{
                      opacity: [0.3, 0.7, 0.3]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <span className="relative z-10">Live Demo</span>
                  <ExternalLink className="w-4 h-4 relative z-10" />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export const ProjectsSection = () => {
  const projects = [
    {
      title: "ScholarStream",
      description: "A comprehensive scholarship management platform for students to find and apply for opportunities.",
      image: "https://i.ibb.co.com/Kjjnjnyy/Pix-Verse-Image-Effect-prompt-Scholar-Stream.jpg?q=80&w=800",
      technologies: ["React", "Firebase", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Stripe", "Framer Motion"],
      githubUrl: "https://github.com/ALA22min22/clint-ScholarStream-",
      liveUrl: "https://scholarstream-2217c.web.app/home"
    },
    {
      title: "Study Mate",
      description: "Collaborative learning platform featuring peer-to-peer study sessions and resource sharing.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800",
      technologies: ["React", "Firebase", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Axios", "Framer Motion"],
      githubUrl: "https://github.com/ALA22min22/study-mate-clint-a10",
      liveUrl: "https://sturdy-mate.firebaseapp.com/",
      reverse: true
    },
    {
      title: "Winter Pet Care",
      description: "Essential tips and products for keeping pets healthy during winter.",
      image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=800",
      technologies: ["JavaScript", "Tailwind", "React", "Firebase", "React Router DOM", "React Hot Toast"],
      githubUrl: "https://github.com/ALA22min22/Pet-Care-in-Winter-A-9",
      liveUrl: "https://pet-care-in-winter-61597.web.app/"
    },
    {
      title: "Android Application Showcase",
      description: "E-commerce store for latest technology gadgets and accessories.",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800",
      technologies: ["React", "Vite", "JavaScript", "HTML", "CSS / Tailwind", "Context API"],
      githubUrl: "https://github.com/ALA22min22/assingment-8-all-apps",
      liveUrl: "https://jocular-hummingbird-726c25.netlify.app/",
      reverse: true
    },
    {
      title: "Green Earth",
      description: "Environmental awareness platform promoting eco-friendly habits and sustainable living.",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800",
      technologies: ["HTML5", "CSS3", "Tailwind CSS", "JavaScript (Vanilla)"],
      githubUrl: "https://github.com/ALA22min22/Green-Earth-VS",
      liveUrl: "https://stupendous-lebkuchen-9d1fcc.netlify.app/"
    },
    {
      title: "Dragon News",
      description: "A dynamic news portal delivering real-time updates across various categories.",
      image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800",
      technologies: ["React", "Vite", "Tailwind", "Firebase", "React Router Dom"],
      githubUrl: "https://github.com/ALA22min22/dragon-news-try-new-way-import",
      liveUrl: "https://dragon-ball-news.web.app/category/1",
      reverse: true
    }
  ]

  return (
    <motion.section 
      className="flex flex-col gap-8 relative" 
      id="work"
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
          backgroundSize: '50px 50px'
        }} />
      </div>

      <motion.div 
        className="flex items-end justify-between px-2 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">My Recent Projects</h2>
          <p className="mt-2 text-gray-400">A curation of my best digital works.</p>
        </div>

        {/* HUD Status Indicators */}
        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="w-3 h-3 rounded-full bg-green-400 border border-green-400/50"
            animate={{ 
              opacity: [1, 0.3, 1],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="w-3 h-3 rounded-full bg-cyan-400 border border-cyan-400/50"
            animate={{ 
              opacity: [1, 0.3, 1],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
          <motion.div
            className="w-3 h-3 rounded-full bg-blue-400 border border-blue-400/50"
            animate={{ 
              opacity: [1, 0.3, 1],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 gap-20 max-w-6xl mx-auto p-4 relative z-10">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 * index }}
          >
            <ProjectCard {...project} />
          </motion.div>
        ))}
      </div>

      {/* HUD Corner Accents for Section */}
      <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-cyan-400/30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-12 h-12 border-r-2 border-t-2 border-cyan-400/30 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-12 h-12 border-l-2 border-b-2 border-cyan-400/30 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-cyan-400/30 pointer-events-none" />
    </motion.section>
  )
}