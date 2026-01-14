import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

export const Navigation = () => {
  const [activeSection, setActiveSection] = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    // Use enhanced Lenis scrolling if available
    if ((window as any).lenisScrollTo) {
      (window as any).lenisScrollTo(`#${sectionId}`)
    } else {
      // Fallback to regular scroll
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setActiveSection(sectionId)
    setIsMobileMenuOpen(false)
  }

  // Auto-detect active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'skills', 'work', 'journey', 'testimonials', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'skills', label: 'Skills' },
    { id: 'work', label: 'Projects' },
    { id: 'journey', label: 'Journey' },
    { id: 'testimonials', label: 'Clients' },
    { id: 'contact', label: 'Contact' }
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 transition-all duration-300">
      <div className="glass-panel mx-auto max-w-7xl rounded-2xl px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF5E14] to-orange-600 text-white shadow-lg shadow-[#FF5E14]/20">
            <div className="flex flex-col gap-0.5">
              <div className="w-3 h-0.5 bg-white rounded"></div>
              <div className="w-3 h-0.5 bg-white rounded"></div>
              <div className="w-3 h-0.5 bg-white rounded"></div>
            </div>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">MD. ALAMIN</span>
        </div>
        
        <div className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-sm font-medium transition-colors cursor-pointer relative pb-1 ${
                activeSection === item.id 
                  ? 'text-[#FF5E14]' 
                  : 'text-gray-300 hover:text-[#FF5E14]'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF5E14] rounded-full"></div>
              )}
            </button>
          ))}
        </div>
        
        <Button 
          className="hidden md:flex items-center gap-2 rounded-xl bg-[#FF5E14] border border-[#FF5E14] px-5 py-2 text-sm font-bold text-white hover:bg-[#FF5E14]/90 hover:border-[#FF5E14]/90 transition-all duration-300 shadow-lg"
          onClick={() => scrollToSection('contact')}
        >
          Let's Talk 📞
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu className="text-3xl" />
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-2 mx-auto max-w-7xl">
          <div className="glass-panel rounded-2xl px-4 py-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-colors cursor-pointer text-left px-4 py-2 rounded-lg ${
                  activeSection === item.id 
                    ? 'text-[#FF5E14] bg-[#FF5E14]/10' 
                    : 'text-gray-300 hover:text-[#FF5E14] hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
            <Button 
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#FF5E14] border border-[#FF5E14] px-5 py-2 text-sm font-bold text-white hover:bg-[#FF5E14]/90 hover:border-[#FF5E14]/90 transition-all duration-300 shadow-lg"
              onClick={() => scrollToSection('contact')}
            >
              Let's Talk 📞
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}