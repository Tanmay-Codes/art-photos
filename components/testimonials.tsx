"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  const testimonials = [
    {
      id: 1,
      name: "Sarah & David",
      role: "Wedding Clients",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      quote:
        "Amogh captured our wedding day perfectly. His attention to detail and ability to capture genuine emotions made our photos truly special. We couldn't be happier with the results!",
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Corporate Client",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      quote:
        "ARrT Photos delivered exceptional product photography for our brand. The images were professional, creative, and perfectly showcased our products. Highly recommended!",
    },
    {
      id: 3,
      name: "Raj & Meera",
      role: "Pre-Wedding Clients",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      quote:
        "Our pre-wedding photoshoot with Amogh was an amazing experience. He made us feel comfortable and captured our relationship beautifully. The photos exceeded our expectations!",
    },
    {
      id: 4,
      name: "Vikram Malhotra",
      role: "Event Organizer",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      quote:
        "We've worked with ARrT Photos for multiple corporate events, and they consistently deliver outstanding results. Professional, reliable, and incredibly talented!",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  // Spotlight effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    containerRef.current.style.setProperty("--x", `${x}%`)
    containerRef.current.style.setProperty("--y", `${y}%`)
  }

  return (
    <section
      id="testimonials"
      className="py-20 bg-zinc-950 relative overflow-hidden spotlight"
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      {/* Background Beams */}
      <div className="background-beams"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
          >
            Client <span className="gradient-text">Testimonials</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/70 max-w-2xl mx-auto"
          >
            Hear what our clients have to say about their experience with ARrT Photos.
          </motion.p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute -top-10 left-0 text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text opacity-20">
            <Quote size={80} />
          </div>

          <div className="relative z-10 min-h-[300px] flex items-center">
            <AnimatePresence mode="wait">
              {testimonials.map(
                (testimonial, index) =>
                  activeIndex === index && (
                    <motion.div
                      key={testimonial.id}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 20,
                      }}
                      className="w-full"
                    >
                      <Card className="bg-zinc-900/80 backdrop-blur-sm border-zinc-800 overflow-hidden">
                        <CardContent className="pt-6">
                          <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="relative w-24 h-24 rounded-full overflow-hidden">
                              <Image
                                src={testimonial.image || "/placeholder.svg"}
                                alt={testimonial.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 text-center md:text-left">
                              <p className="text-white/80 mb-4 italic text-lg">"{testimonial.quote}"</p>
                              <h3 className="gradient-text font-semibold text-xl">{testimonial.name}</h3>
                              <p className="text-white/70">{testimonial.role}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ),
              )}
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 w-6"
                    : "bg-zinc-700"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
