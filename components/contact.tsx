"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Phone, Mail, MapPin, Send } from "lucide-react"

// Import the server action and useToast at the top
import { submitContactForm } from "@/app/actions"
import { useToast } from "@/hooks/use-toast"

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  // Add loading state and toast
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  // Replace the handleSubmit function with this:
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await submitContactForm(formState)

      if (result.success) {
        toast({
          title: "Message Sent",
          description: "Thank you for your message. We'll get back to you soon!",
        })
        setFormState({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
      } else {
        toast({
          title: "Submission Failed",
          description: result.message || "Please try again later.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Submission Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Spotlight effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    containerRef.current.style.setProperty("--x", `${x}%`)
    containerRef.current.style.setProperty("--y", `${y}%`)
  }

  // 3D card effect
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 15
    const rotateY = (centerX - x) / 15

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`
  }

  return (
    <section
      id="contact"
      className="py-16 md:py-20 bg-black relative overflow-hidden spotlight"
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      {/* Background Beams */}
      <div className="background-beams"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
          >
            Get in <span className="gradient-text">Touch</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/70 max-w-2xl mx-auto"
          >
            Have a project in mind or want to inquire about our services? Reach out to us!
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-3d"
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
          >
            <div className="card-3d-content bg-zinc-900/80 backdrop-blur-sm p-6 sm:p-8 rounded-lg border border-zinc-800 h-full">
              <h3 className="text-xl md:text-2xl font-bold gradient-text mb-6">Contact Information</h3>
              <div className="space-y-5 md:space-y-6">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="bg-blue-500/10 p-2 md:p-3 rounded-lg flex-shrink-0">
                    <Phone className="h-5 w-5 md:h-6 md:w-6 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Phone</h4>
                    <p className="text-white/70">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="bg-purple-500/10 p-2 md:p-3 rounded-lg flex-shrink-0">
                    <Mail className="h-5 w-5 md:h-6 md:w-6 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Email</h4>
                    <p className="text-white/70">info@arrtphotos.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="bg-pink-500/10 p-2 md:p-3 rounded-lg flex-shrink-0">
                    <MapPin className="h-5 w-5 md:h-6 md:w-6 text-pink-500" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Location</h4>
                    <p className="text-white/70">123 Photography Lane, Creative District, Mumbai, India</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 md:mt-12">
                <h3 className="text-xl md:text-2xl font-bold gradient-text mb-4 md:mb-6">Working Hours</h3>
                <div className="space-y-2">
                  <p className="text-white/70">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-white/70">Saturday: 10:00 AM - 4:00 PM</p>
                  <p className="text-white/70">Sunday: Closed (Available for shoots by appointment)</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-3d"
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
          >
            <div className="card-3d-content bg-zinc-900/80 backdrop-blur-sm p-6 sm:p-8 rounded-lg border border-zinc-800">
              <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">
                      Your Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="bg-zinc-800/50 border-zinc-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">
                      Your Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="bg-zinc-800/50 border-zinc-700 text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-white">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    required
                    className="bg-zinc-800/50 border-zinc-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    required
                    className="min-h-32 bg-zinc-800/50 border-zinc-700 text-white"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      <span>Send Message</span>
                    </div>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
