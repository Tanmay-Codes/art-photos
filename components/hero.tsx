"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform } from "framer-motion"
import BookingModal from "./booking-modal"

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)

  // Array of background images
  const images = [
    "https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
  ]

  // Parallax effect values
  const y1 = useTransform(scrollY, [0, 500], [0, 150])
  const y2 = useTransform(scrollY, [0, 500], [0, -150])
  const opacity = useTransform(scrollY, [0, 300, 500], [1, 0.5, 0])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [images.length])

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
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full overflow-hidden spotlight parallax-container -mt-[76px] md:-mt-[80px]"
    >
      {/* Background Beams */}
      <div className="background-beams"></div>

      {/* Background Images with Parallax */}
      <div className="absolute inset-0 z-0">
        {images.map((src, index) => (
          <motion.div
            key={index}
            style={{ y: y1 }}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentImage === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={src || "/placeholder.svg"}
              alt={`ARrT Photos showcase ${index + 1}`}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>
        ))}
      </div>

      {/* Content with Parallax */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
        <motion.div
          style={{ y: y2, opacity }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
            Capturing Life's <span className="gradient-text">Precious Moments</span>
          </h1>
          <p className="text-xl text-white/80 mb-8">
            Amogh Agrawal, professional photographer and founder of ARrT Photos, specializing in weddings, events, and
            creative photography.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="text-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
            >
              View Portfolio
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg border-white/20 backdrop-blur-sm hover:bg-white/10"
              onClick={() => setIsBookingModalOpen(true)}
            >
              Book a Session
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            className="w-1 h-3 bg-white rounded-full mt-2"
          />
        </motion.div>
      </div>
      <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
    </section>
  )
}
