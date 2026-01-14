import { motion } from "framer-motion"

export const TechScanningLine = () => {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
      {/* Main Scanning Line */}
      <motion.div
        className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
        style={{
          filter: "drop-shadow(0 0 8px #00ddff)",
          boxShadow: "0 0 20px #00ddff, 0 0 40px #00ddff",
        }}
        animate={{
          y: ["-100%", "100%", "100%", "-100%"]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.5, 0.7, 1]
        }}
      />
      
      {/* Secondary Scanning Line */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent opacity-60"
        style={{
          filter: "drop-shadow(0 0 4px #00ddff)",
        }}
        animate={{
          y: ["-100%", "100%", "100%", "-100%"]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.1,
          times: [0, 0.5, 0.7, 1]
        }}
      />
      
      {/* HUD Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 221, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 221, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px"
        }}
      />
      
      {/* Corner HUD Elements */}
      <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-cyan-400 opacity-60" />
      <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-cyan-400 opacity-60" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-cyan-400 opacity-60" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-cyan-400 opacity-60" />
    </div>
  )
}