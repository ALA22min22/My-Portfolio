import { Mail, MapPin, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { motion } from "framer-motion"
import emailjs from '@emailjs/browser'
import { toast } from 'sonner'

// Circular Pulse Component for Contact Icons
const PulsingIcon = ({ 
  icon: Icon, 
  color, 
  bgColor 
}: { 
  icon: any, 
  color: string, 
  bgColor: string 
}) => {
  return (
    <div className="relative">
      {/* Outer Pulse Ring */}
      <motion.div
        className={`absolute inset-0 rounded-full ${bgColor} opacity-30`}
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.3, 0.1, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Middle Pulse Ring */}
      <motion.div
        className={`absolute inset-0 rounded-full ${bgColor} opacity-50`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.2, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.3
        }}
      />
      
      {/* Main Icon Container */}
      <motion.div 
        className={`flex h-12 w-12 items-center justify-center rounded-full bg-white/5 ${color} relative z-10`}
        animate={{
          boxShadow: [
            `0 0 10px ${color.includes('cyan') ? '#00ddff' : '#a855f7'}40`,
            `0 0 20px ${color.includes('cyan') ? '#00ddff' : '#a855f7'}60`,
            `0 0 10px ${color.includes('cyan') ? '#00ddff' : '#a855f7'}40`,
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Icon />
      </motion.div>
    </div>
  )
}

// Enhanced Input Component with HUD Effects
const HUDInput = ({ 
  label, 
  name, 
  value, 
  onChange, 
  placeholder, 
  type = "text",
  isTextarea = false 
}: {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  placeholder: string
  type?: string
  isTextarea?: boolean
}) => {
  const [isFocused, setIsFocused] = useState(false)

  const inputProps = {
    name,
    value,
    onChange,
    placeholder,
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
    className: `w-full rounded-xl px-4 text-sm bg-white/5 border text-white placeholder-white/30 transition-all duration-300 ${
      isFocused 
        ? 'border-cyan-400 bg-white/10 shadow-[0_0_20px_rgba(0,221,255,0.3)] ring-2 ring-cyan-400/20' 
        : 'border-white/10 hover:border-white/20'
    } ${isTextarea ? 'h-32 resize-none p-4' : 'h-12'}`
  }

  return (
    <motion.div 
      className="flex flex-col gap-2"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.label 
        className="text-sm font-semibold text-purple-100/80 ml-1"
        animate={isFocused ? { color: '#00ddff' } : { color: 'rgba(196, 181, 253, 0.8)' }}
        transition={{ duration: 0.3 }}
      >
        {label}
      </motion.label>
      
      <motion.div
        animate={isFocused ? { scale: 1.02 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {isTextarea ? (
          <Textarea {...inputProps} />
        ) : (
          <Input {...inputProps} type={type} />
        )}
      </motion.div>
      
      {/* System Ping Visual Effect */}
      {isFocused && (
        <motion.div
          className="absolute inset-0 rounded-xl border border-cyan-400/50 pointer-events-none"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0.95, 1.05, 1.1]
          }}
          transition={{ 
            duration: 0.6,
            times: [0, 0.3, 1],
            ease: "easeOut"
          }}
        />
      )}
    </motion.div>
  )
}

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form fields
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields', {
        description: 'Name, email, and message are required.',
        duration: 4000,
      })
      return
    }

    setIsSubmitting(true)

    try {
      // EmailJS configuration
      const SERVICE_ID = 'service_wfbiswd'
      const TEMPLATE_ID = 'template_n19xjn3'
      const PUBLIC_KEY = "jy58gyg0tmFr9GCOH"

      // Prepare template parameters with current time
      const templateParams = {
        name: formData.name,
        email: formData.email,
        projectType: formData.projectType,
        message: formData.message,
        time: new Date().toLocaleString()
      }

      // Send email using EmailJS
      const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      
      console.log('Email sent successfully:', response)

      // Show success toast
      toast.success('Message sent successfully! 🚀', {
        description: 'Thank you for reaching out. I\'ll get back to you soon!',
        duration: 5000,
      })

      // Reset form state
      setFormData({
        name: '',
        email: '',
        projectType: '',
        message: ''
      })

    } catch (error) {
      console.error('EmailJS Error:', error)
      toast.error('Failed to send message', {
        description: 'Please try again or contact me directly via email.',
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.section 
      className="glass-panel relative overflow-hidden rounded-3xl p-8 md:p-16" 
      id="contact"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* HUD-style Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0,221,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,221,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }} />
      </div>

      <div className="relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Left Side - Slide in from Left */}
        <motion.div 
          className="flex flex-col justify-center"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <motion.h2 
            className="text-4xl font-bold leading-tight text-white md:text-5xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Let's build a <span className="text-cyan-400">scalable solution</span> together.
          </motion.h2>
          
          <motion.p 
            className="mt-6 text-lg text-gray-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Are you looking for a MERN stack developer to turn your idea into a robust web application? I'm
            ready to discuss how I can help with MongoDB, Express, React, and Node.js.
          </motion.p>

          <motion.div 
            className="mt-10 flex flex-col gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {/* Email Contact with Pulsing Icon */}
            <motion.div 
              className="flex items-center gap-4"
              whileHover={{ x: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <PulsingIcon 
                icon={Mail} 
                color="text-cyan-400" 
                bgColor="bg-cyan-400" 
              />
              <div>
                <p className="text-sm text-gray-400">Email Me</p>
                <p className="font-medium text-white">2213081052@uttarauniversity.edu.bd</p>
              </div>
            </motion.div>

            {/* Location Contact with Pulsing Icon */}
            <motion.div 
              className="flex items-center gap-4"
              whileHover={{ x: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <PulsingIcon 
                icon={MapPin} 
                color="text-purple-400" 
                bgColor="bg-purple-400" 
              />
              <div>
                <p className="text-sm text-gray-400">Location</p>
                <p className="font-medium text-white">Satkhira, Bangladesh</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right Side - Form Card sliding in from Right */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          {/* 3D Floating Form Card with Holographic Glow */}
          <motion.div
            animate={{ 
              y: [0, -8, 0],
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            whileHover={{
              boxShadow: [
                "0 20px 40px rgba(0,221,255,0.1), 0 0 40px rgba(168,85,247,0.1)",
                "0 25px 50px rgba(0,221,255,0.2), 0 0 60px rgba(168,85,247,0.2)",
                "0 20px 40px rgba(0,221,255,0.1), 0 0 40px rgba(168,85,247,0.1)"
              ],
              scale: 1.02
            }}
          >
            <Card className="rounded-3xl bg-purple-600/10 p-6 md:p-8 backdrop-blur-xl border border-purple-300/20 transition-all hover:bg-purple-600/20 relative overflow-hidden">
              {/* Holographic Corner Accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-cyan-400/50" />
              <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-cyan-400/50" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-cyan-400/50" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-cyan-400/50" />
              
              <CardContent className="p-0 relative z-10">
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {/* Name and Email Row */}
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <HUDInput
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Ex: MD. Alamin"
                    />
                    
                    <HUDInput
                      label="Your Email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="email@example.com"
                      type="email"
                    />
                  </div>

                  {/* Project Type */}
                  <HUDInput
                    label="Project Type"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    placeholder="Ex: Full-stack Web App / MERN Development"
                  />

                  {/* Message Textarea */}
                  <HUDInput
                    label="Brief Message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project..."
                    isTextarea={true}
                  />

                  {/* Power-up Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                  >
                    <motion.div
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 0 30px rgba(0,221,255,0.4)"
                      }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-2 group relative flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 text-sm font-bold text-white hover:bg-cyan-400 transition-all overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {/* Power-up Shimmer Effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          animate={{
                            x: ['-100%', '100%']
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        />
                        
                        <span className="relative z-10">
                          {isSubmitting ? 'Sending...' : 'Send Message'}
                        </span>
                        <motion.div
                          animate={isSubmitting ? { rotate: 360 } : { rotate: 0 }}
                          transition={{ duration: 1, repeat: isSubmitting ? Infinity : 0, ease: "linear" }}
                          className="relative z-10"
                        >
                          <Send className="text-lg" />
                        </motion.div>
                      </Button>
                    </motion.div>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
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
          className="w-2 h-2 rounded-full bg-green-400"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="w-2 h-2 rounded-full bg-cyan-400"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />
        <motion.div
          className="w-2 h-2 rounded-full bg-purple-400"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />
      </motion.div>
    </motion.section>
  )
}