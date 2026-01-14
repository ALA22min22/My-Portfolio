
import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// ১. Eldritch Mandala (এটি আগের মতোই আছে)
const EldritchMandala = () => (
  <motion.div 
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] opacity-[0.08] pointer-events-none -z-10"
    animate={{ rotate: 360 }}
    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
  >
    <svg viewBox="0 0 200 200" fill="none" stroke="#00ddff" strokeWidth="0.5">
      <circle cx="100" cy="100" r="90" strokeDasharray="4 2" />
      <circle cx="100" cy="100" r="70" />
      <rect x="50" y="50" width="100" height="100" transform="rotate(45 100 100)" />
      <polygon points="100,20 180,160 20,160" />
      <polygon points="100,180 20,40 180,40" />
    </svg>
  </motion.div>
);

// ২. Magnetic Button
const MagneticButton = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
    >
      {children}
    </motion.div>
  );
};

export const HeroSection = () => {
  const handleDownloadCV = () => {
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = "/Resume-suitable.pdf";
    link.download = 'Resume-suitable.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      className="glass-panel rounded-3xl p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden"
      id="home"
    >
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl"></div>
      
      {/* Left Content */}
      <motion.div 
        className="flex-1 flex flex-col gap-6 relative z-10"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative">
          <EldritchMandala />
          <motion.div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-md mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative h-2 w-2 rounded-full bg-cyan-400"></span>
            </span>
            <span className="text-xs font-medium text-cyan-400 uppercase tracking-widest">System Online</span>
          </motion.div>

          <h1 className="text-5xl font-bold leading-[1.1] text-white md:text-6xl lg:text-7xl">
            Scalable{" "}
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-500 to-blue-600 relative inline-block"
              animate={{ 
                filter: [
                  "drop-shadow(0 0 5px rgba(0,221,255,0.5))",
                  "drop-shadow(0 0 25px rgba(0,221,255,0.9))",
                  "drop-shadow(0 0 5px rgba(0,221,255,0.5))"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              MERN
            </motion.span>
            <br />
            Solutions.
          </h1>
        </div>
        
        <p className="max-w-xl text-lg text-gray-300 md:text-xl leading-relaxed">
          I develop robust web applications with the precision of a master sorcerer. 
        </p>
        
        <div className="mt-4 flex flex-wrap gap-4">
          <MagneticButton>
            <Button 
              className="group bg-cyan-500 px-8 py-6 rounded-xl font-bold text-black hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,221,255,0.4)]"
              onClick={handleDownloadCV}
            >
              DOWNLOAD CV <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </MagneticButton>
          
          <Button variant="outline" className="border-white/20 bg-white/5 px-8 py-6 rounded-xl text-white hover:bg-white/10" asChild>
            <a href="#contact">Let's Talk</a>
          </Button>
        </div>
      </motion.div>
      
      {/* Right Image Section (Animations removed, Hover Zoom added) */}
      <motion.div 
        className="relative w-full max-w-[400px] flex-shrink-0 md:w-1/3"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.div 
          className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/10 group shadow-2xl shadow-cyan-500/10 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Zooming Image */}
          <motion.img
            src="https://i.ibb.co.com/jkJGLLjp/AI-Image-Editor-2026-01-08-13-40-07.png"
            alt="MD. Alamin"
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1221] to-transparent opacity-60 z-10"></div>
        </motion.div>
      </motion.div>
    </section>
  );
};