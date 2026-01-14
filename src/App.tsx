import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Toaster } from "sonner"
import { useLenis } from "./hooks/useLenis"
import { Preloader } from "./components/Preloader"
import { Background } from "./components/Background"
import { Navigation } from "./components/Navigation"
import { HeroSection } from "./components/HeroSection"
import { AboutSection } from "./components/AboutSection"
import { ServicesSection } from "./components/ServicesSection"
import { SkillsSection } from "./components/SkillsSection"
import { ProjectsSection } from "./components/ProjectsSection"
import { JourneySection } from "./components/JourneySection"
import { TestimonialsSection } from "./components/TestimonialsSection"
import { ContactSection } from "./components/ContactSection"
import { Footer } from "./components/Footer"

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  // Initialize Lenis smooth scrolling only after content is shown
  useLenis(showContent)

  useEffect(() => {
    // Prevent scrolling during preloader
    if (isLoading) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('no-scroll')
    }
  }, [isLoading])

  const handlePreloaderComplete = () => {
    setIsLoading(false)
    // Small delay before showing content for smooth transition
    setTimeout(() => {
      setShowContent(true)
    }, 100)
  }

  return (
    <div className="font-display antialiased selection:bg-primary selection:text-black min-h-screen text-white overflow-x-hidden">
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader key="preloader" onComplete={handlePreloaderComplete} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showContent && (
          <motion.div
            key="main-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Background />
            <Navigation />
            
            <main className="relative z-10 mx-auto flex max-w-7xl flex-col gap-24 px-4 pb-20 pt-32 md:px-8">
              <div id="home">
                <HeroSection />
              </div>
              
              <div id="about">
                <AboutSection />
              </div>
              
              <div id="services">
                <ServicesSection />
              </div>
              
              <div id="skills">
                <SkillsSection />
              </div>
              
              <div id="work">
                <ProjectsSection />
              </div>
              
              <div id="journey">
                <JourneySection />
              </div>
              
              <div id="testimonials">
                <TestimonialsSection />
              </div>
              
              <div id="contact">
                <ContactSection />
              </div>
              
              <Footer />
            </main>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notifications - Always rendered */}
      <Toaster 
        position="top-right"
        theme="dark"
        richColors
        closeButton
        expand={true}
        toastOptions={{
          style: {
            background: 'rgba(17, 24, 39, 0.95)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            color: 'white',
            backdropFilter: 'blur(10px)',
          },
          className: 'toast-notification',
        }}
      />
    </div>
  )
}

export default App