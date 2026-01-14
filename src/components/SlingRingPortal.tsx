import { motion } from "framer-motion"

export const SlingRingPortal = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Outer Ring */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-4 border-dashed border-orange-400"
        style={{
          borderColor: "#ff8c00",
          filter: "drop-shadow(0 0 20px #ff8c00)",
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Inner Ring */}
      <motion.div
        className="absolute inset-2 rounded-2xl border-2 border-dashed border-orange-300"
        style={{
          borderColor: "#ffa500",
          filter: "drop-shadow(0 0 15px #ffa500)",
        }}
        animate={{ rotate: -360 }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Mystical Sparks */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-orange-400 rounded-full"
          style={{
            top: "50%",
            left: "50%",
            filter: "drop-shadow(0 0 8px #ff8c00)",
          }}
          animate={{
            x: [0, Math.cos(i * 45 * Math.PI / 180) * 200],
            y: [0, Math.sin(i * 45 * Math.PI / 180) * 200],
            opacity: [1, 0.3, 1],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}