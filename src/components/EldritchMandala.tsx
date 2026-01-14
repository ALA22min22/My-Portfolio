import { motion } from "framer-motion"

export const EldritchMandala = () => {
  return (
    <motion.svg
      width="600"
      height="600"
      viewBox="0 0 600 600"
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5"
      animate={{ rotate: 360 }}
      transition={{
        duration: 60,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      {/* Outer Ring */}
      <circle
        cx="300"
        cy="300"
        r="280"
        fill="none"
        stroke="#ff8c00"
        strokeWidth="2"
        strokeDasharray="10,5"
      />
      
      {/* Inner Geometric Patterns */}
      <g transform="translate(300,300)">
        {/* Central Hexagon */}
        <polygon
          points="-50,0 -25,-43.3 25,-43.3 50,0 25,43.3 -25,43.3"
          fill="none"
          stroke="#00ddff"
          strokeWidth="1.5"
        />
        
        {/* Radiating Lines */}
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={i}
            x1="0"
            y1="-100"
            x2="0"
            y2="-200"
            stroke="#ff8c00"
            strokeWidth="1"
            transform={`rotate(${i * 30})`}
            opacity="0.6"
          />
        ))}
        
        {/* Concentric Circles */}
        <circle cx="0" cy="0" r="80" fill="none" stroke="#00ddff" strokeWidth="1" opacity="0.4" />
        <circle cx="0" cy="0" r="120" fill="none" stroke="#ff8c00" strokeWidth="1" opacity="0.3" />
        <circle cx="0" cy="0" r="160" fill="none" stroke="#00ddff" strokeWidth="1" opacity="0.2" />
        
        {/* Mystical Symbols */}
        {Array.from({ length: 6 }).map((_, i) => (
          <g key={i} transform={`rotate(${i * 60}) translate(0,-140)`}>
            <circle cx="0" cy="0" r="8" fill="#ff8c00" opacity="0.4" />
            <polygon
              points="-6,0 0,-10 6,0 0,10"
              fill="#00ddff"
              opacity="0.3"
            />
          </g>
        ))}
      </g>
    </motion.svg>
  )
}