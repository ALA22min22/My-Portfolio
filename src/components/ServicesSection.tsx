import { Globe, Server, Layers, Terminal, ChevronDown } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const ServiceCard = ({ icon, title, description, details, iconColor }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(0,221,255,0.2), 0 0 60px rgba(168,85,247,0.3)"
      }}
    >
      <Card 
        className="glass-panel rounded-2xl p-6 transition-all hover:bg-glass-bg-hover group relative overflow-hidden"
        style={{
          boxShadow: isHovered 
            ? "0 10px 30px rgba(0,221,255,0.3), 0 0 40px rgba(168,85,247,0.2)"
            : "0 5px 15px rgba(0,0,0,0.2)"
        }}
      >
        {/* Holographic Corner Accents */}
        <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-cyan-400/40" />
        <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-cyan-400/40" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-purple-400/40" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-purple-400/40" />

        {/* Holographic Glow Background */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-transparent to-purple-400/5 rounded-2xl pointer-events-none"
            animate={{
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}

        <CardHeader className="p-0 pb-4 relative z-10">
          <motion.div 
            className={`h-12 w-12 rounded-xl ${iconColor} flex items-center justify-center mb-4 relative`}
            whileHover={{ 
              rotate: 360,
              scale: 1.1,
              boxShadow: "0 0 20px rgba(0,221,255,0.6)"
            }}
            transition={{ duration: 0.6 }}
            animate={isHovered ? {
              boxShadow: [
                "0 0 10px rgba(0,221,255,0.4)",
                "0 0 25px rgba(0,221,255,0.8)",
                "0 0 10px rgba(0,221,255,0.4)"
              ]
            } : {}}
          >
            <motion.div
              animate={isHovered ? {
                filter: "drop-shadow(0 0 10px #00ddff)"
              } : {}}
              transition={{ duration: 0.3 }}
            >
              {icon}
            </motion.div>
            
            {/* Icon Pulse Ring */}
            {isHovered && (
              <motion.div
                className="absolute inset-0 rounded-xl border-2 border-cyan-400/50"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0.1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}
          </motion.div>
          
          <CardTitle className="text-xl font-bold text-white mb-2">{title}</CardTitle>
          <CardDescription className="text-gray-400 text-sm mb-4">{description}</CardDescription>
        </CardHeader>
        
        <CardContent className="p-0 relative z-10">
          <motion.button
            className="cursor-pointer font-medium text-primary text-sm flex items-center gap-1 hover:text-cyan-300 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Show details</span>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="text-sm" />
            </motion.div>
          </motion.button>
          
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ 
                  duration: 0.4,
                  ease: "easeInOut"
                }}
                className="overflow-hidden"
              >
                <motion.div 
                  className="mt-3 text-xs text-gray-300 space-y-1 pl-2 border-l border-white/10"
                  initial={{ y: -10 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {details.map((detail, index) => (
                    <motion.p 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: 0.1 + index * 0.05,
                        duration: 0.3
                      }}
                    >
                      • {detail}
                    </motion.p>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>

        {/* Holographic Flicker Effect */}
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
              repeatDelay: 2
            }}
          />
        )}
      </Card>
    </motion.div>
  )
}

export const ServicesSection = () => {
  const services = [
    {
      icon: <Globe className="text-2xl" />,
      title: "Frontend",
      description: "Responsive and interactive UI using React, Next-js, and modern CSS.",
      details: [
        "SPA Development",
        "Accessibility (a11y)",
        "Performance Optimization",
        "Design System Implementation"
      ],
      iconColor: "bg-blue-500/20 text-blue-400"
    },
    {
      icon: <Server className="text-2xl" />,
      title: "Backend",
      description: "Robust server-side architecture using Node.js, Express.js, and MongoDB.",
      details: [
        "RESTful API Design",
        "Database Management",
        "Authentication & Authorization; Security",
        "Server Deployment"
      ],
      iconColor: "bg-purple-500/20 text-purple-400"
    },
    {
      icon: <Layers className="text-2xl" />,
      title: "Fullstack",
      description: "End-to-end application development seamlessly connecting UI to DB.",
      details: [
        "MERN Stack",
        "React.js/Next.js Applications",
        "Scalable Architecture",
        "Cloud Integration"
      ],
      iconColor: "bg-pink-500/20 text-pink-400"
    },
    {
      icon: <Terminal className="text-2xl" />,
      title: "API & Server Environment",
      description: "Architecting robust RESTful services and managing server-side workflows for scalable MERN apps.",
      details: [
        "RESTful API Design (Express.js)",
        "JWT & OAuth Authentication",
        "Postman & API Documentation",
        "Git & Version Control Workflow"
      ],
      iconColor: "bg-green-500/20 text-green-400"
    }
  ]

  return (
    <motion.section 
      className="flex flex-col gap-8 relative" 
      id="services"
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
          backgroundSize: '40px 40px'
        }} />
      </div>

      <motion.div 
        className="text-center md:text-left relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">My Services</h2>
        <p className="mt-2 text-gray-400">Specialized technical solutions for modern digital needs.</p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.6, 
              delay: 0.1 * index,
              type: "spring",
              stiffness: 100
            }}
          >
            <ServiceCard {...service} />
          </motion.div>
        ))}
      </div>

      {/* HUD Status Indicators */}
      <motion.div
        className="absolute top-4 right-4 flex gap-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1 }}
      >
        <motion.div
          className="w-2 h-2 rounded-full bg-blue-400"
          animate={{ 
            opacity: [1, 0.3, 1],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="w-2 h-2 rounded-full bg-purple-400"
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
        <motion.div
          className="w-2 h-2 rounded-full bg-green-400"
          animate={{ 
            opacity: [1, 0.3, 1],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
        />
      </motion.div>

      {/* Section Corner Accents */}
      <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-cyan-400/30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-12 h-12 border-r-2 border-t-2 border-purple-400/30 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-12 h-12 border-l-2 border-b-2 border-pink-400/30 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-green-400/30 pointer-events-none" />
    </motion.section>
  )
}