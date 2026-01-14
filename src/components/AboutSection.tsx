import { Terminal, Layers, Code } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { motion } from "framer-motion";

export const AboutSection = () => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="glass-panel rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden" 
      id="about"
    >
      {/* Background Glow */}
      <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none"></div>

      <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
        
        {/* Left Side: Image with Dual Animations */}
        <div className="w-full md:w-5/12 lg:w-1/3 flex-shrink-0 relative group">
          
          {/* --- Sling Ring Portal শুরু --- */}
          <div className="absolute inset-0 pointer-events-none z-0">
            {/* ভেতরের ড্যাশড বর্ডার (ডান দিকে ঘোরে) */}
            <motion.div 
              className="absolute inset-[-15px] rounded-full border-2 border-dashed border-cyan-400/40 shadow-[0_0_15px_rgba(0,221,255,0.4)]"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            {/* বাইরের ডটেড বর্ডার (বাম দিকে ঘোরে) */}
            <motion.div 
              className="absolute inset-[-25px] rounded-full border-2 border-dotted border-cyan-400/20 shadow-[0_0_25px_rgba(0,221,255,0.2)]"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
          </div>
          {/* --- Sling Ring Portal শেষ --- */}
          
          <div className="aspect-[3/4] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative z-10 bg-[#0f1221]">
            
            {/* --- Tech Scanning Line শুরু --- */}
            <motion.div 
              className="absolute left-0 w-full h-[2px] bg-cyan-400 shadow-[0_0_15px_#00ddff] z-20"
              animate={{ 
                top: ["0%", "100%", "0%"] 
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            />
            {/* --- Tech Scanning Line শেষ --- */}

            <motion.img
              whileHover={{ scale: 1.05 }}
              src="https://i.ibb.co.com/HDNtgb4w/Gemini-Generated-Image-55pl5155pl5155pl.png"
              alt="MD. Alamin"
              className="w-full h-full object-cover transition-transform duration-500"
            />
            
            {/* Image Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f1221] via-transparent to-transparent opacity-50 z-10"></div>
          </div>

          {/* Floating Focus Badge */}
          <motion.div 
            className="absolute -right-6 bottom-8 glass-panel p-4 rounded-xl border border-white/20 shadow-lg hidden md:block z-20"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex items-center gap-3">
              <Terminal className="text-cyan-400 text-2xl animate-pulse" />
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em]">Current Focus</p>
                <p className="text-white font-bold text-sm">MERN ARCHITECT</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Content Part */}
        <div className="flex-1 space-y-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl mb-4">
              Transforming Ideas Into <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                Scalable Reality.
              </span>
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Hello! I'm <strong>MD. Alamin</strong>, a Junior Software Engineer passionate about 
              building robust web applications. I specialize in the MERN stack, turning complex logic into 
              seamless user experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.div whileHover={{ y: -5 }} className="glass-panel p-5 rounded-xl border border-white/5 bg-white/5">
              <Layers className="text-cyan-400 mb-3 text-2xl" />
              <h3 className="text-white font-bold mb-2">Full-Stack Development</h3>
              <p className="text-sm text-gray-400">Expertise in React, Node.js, and MongoDB.</p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="glass-panel p-5 rounded-xl border border-white/5 bg-white/5">
              <Code className="text-purple-400 mb-3 text-2xl" />
              <h3 className="text-white font-bold mb-2">Problem Solving</h3>
              <p className="text-sm text-gray-400">Efficient and clean code for complex challenges.</p>
            </motion.div>
          </div>

          {/* Social Links */}
          <div className="pt-4 flex items-center gap-6">
            <div className="flex gap-5">
              <a className="text-gray-400 hover:text-white transition-all hover:scale-110" href="https://github.com/ALA22min22" target="_blank" rel="noopener noreferrer">
                <FaGithub className="w-6 h-6" />
              </a>
              <a className="text-gray-400 hover:text-blue-400 transition-all hover:scale-110" href="https://bd.linkedin.com/in/md-alamin-dev/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="w-6 h-6" />
              </a>
              <a className="text-gray-400 hover:text-red-400 transition-all hover:scale-110" href="mailto:2213081052@uttarauniversity.edu.bd">
                <MdEmail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};