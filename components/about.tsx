"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Camera, Award, Users, Clock } from "lucide-react"

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Parallax values
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5])

  const stats = [
    { icon: <Camera className="h-6 w-6 text-blue-500" />, value: "500+", label: "Photo Sessions" },
    { icon: <Award className="h-6 w-6 text-purple-500" />, value: "10+", label: "Years Experience" },
    { icon: <Users className="h-6 w-6 text-pink-500" />, value: "200+", label: "Happy Clients" },
    { icon: <Clock className="h-6 w-6 text-blue-400" />, value: "24/7", label: "Support" },
  ]

  return (
    <section id="about" className="py-20 bg-black relative overflow-hidden parallax-container">
      {/* Background Beams */}
      <div className="background-beams"></div>

      <div ref={containerRef} className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            style={{ y: y1, opacity }}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative h-[500px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1554941829-202a0b2403b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Amogh Agrawal - Photographer"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4 rounded-lg">
              <p className="text-lg font-bold text-white">10+ Years Experience</p>
            </div>
          </motion.div>

          <motion.div
            style={{ y: y2 }}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              About <span className="gradient-text">Amogh Agrawal</span>
            </h2>
            <p className="text-white/70 mb-6">
              Amogh Agrawal is the creative force behind ARrT Photos, a premier photography studio specializing in
              weddings, events, and creative photography. With over a decade of experience, Amogh has developed a unique
              style that blends artistic vision with technical expertise.
            </p>
            <p className="text-white/70 mb-8">
              His passion for capturing authentic moments and transforming them into timeless memories has earned him a
              reputation as one of the most sought-after photographers in the region. Amogh's work is characterized by
              its emotional depth, attention to detail, and innovative approach to visual storytelling.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex justify-center mb-2">{stat.icon}</div>
                  <h3 className="text-2xl font-bold gradient-text">{stat.value}</h3>
                  <p className="text-white/70 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
            >
              Learn More
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
