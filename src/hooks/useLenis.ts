import { useEffect } from 'react'
import Lenis from 'lenis'

export const useLenis = (isEnabled: boolean = true) => {
  useEffect(() => {
    if (!isEnabled) return

    // Initialize Lenis with optimized settings to reduce lag
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    } as any)

    // Optimized animation frame loop
    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    // Add lenis class to html for CSS integration
    document.documentElement.classList.add('lenis', 'lenis-smooth')

    // Enhanced scroll-to functionality for navigation
    const scrollToSection = (target: string) => {
      const element = document.querySelector(target) as HTMLElement
      if (element) {
        lenis.scrollTo(element, {
          duration: 1.5,
          easing: (t) => 1 - Math.pow(1 - t, 3),
          offset: -80,
        })
      }
    }

    // Make scrollToSection globally available
    ;(window as any).lenisScrollTo = scrollToSection

    // Prevent scroll during animations or modals
    const preventScroll = () => lenis.stop()
    const allowScroll = () => lenis.start()

    // Make control functions globally available
    ;(window as any).lenisStop = preventScroll
    ;(window as any).lenisStart = allowScroll

    // Cleanup
    return () => {
      document.documentElement.classList.remove('lenis', 'lenis-smooth')
      cancelAnimationFrame(rafId)
      lenis.destroy()
      delete (window as any).lenisScrollTo
      delete (window as any).lenisStop
      delete (window as any).lenisStart
    }
  }, [isEnabled])
}