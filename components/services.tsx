"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Camera, Video, Users, ShoppingBag, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  const services = [
    {
      icon: <Camera className="h-8 w-8 sm:h-10 sm:w-10 text-blue-500" />,
      title: "Wedding Photography",
      description: "Capturing the magic and emotions of your special day with artistic flair and attention to detail.",
    },
    {
      icon: <Users className="h-8 w-8 sm:h-10 sm:w-10 text-purple-500" />,
      title: "Pre-Wedding Shoots",
      description: "Creative and romantic pre-wedding photoshoots that tell your unique love story.",
    },
    {
      icon: <Video className="h-8 w-8 sm:h-10 sm:w-10 text-pink-500" />,
      title: "Videography",
      description: "Professional video services that bring your memories to life with cinematic storytelling.",
    },
    {
      icon: <Sparkles className="h-8 w-8 sm:h-10 sm:w-10 text-blue-400" />,
      title: "Cinematography",
      description: "Artistic film-making that transforms your special moments into breathtaking visual narratives.",
    },
    {
      icon: <ShoppingBag className="h-8 w-8 sm:h-10 sm:w-10 text-purple-400" />,
      title: "Product Photography",
      description: "High-quality product photography that showcases your items in the best possible light.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  // 3D card effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`
  }

  return (
    <section id="services" className="py-16 md:py-20 bg-black relative overflow-hidden">
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
            Our <span className="gradient-text">Services</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/70 max-w-2xl mx-auto"
          >
            At ARrT Photos, we offer a wide range of professional photography and videography services to capture your
            most precious moments.
          </motion.p>
        </div>

        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card
                className="bg-zinc-900/80 backdrop-blur-sm border-zinc-800 hover:border-zinc-700 hover:shadow-lg hover:shadow-purple-900/10 transition-all duration-300 h-full card-3d overflow-hidden"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div className="card-3d-content">
                  <CardHeader className="pb-2">
                    <div className="mb-3 md:mb-4">{service.icon}</div>
                    <CardTitle className="text-lg sm:text-xl text-white">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-white/70 text-sm sm:text-base">{service.description}</CardDescription>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
