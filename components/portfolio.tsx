"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("all")
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  const categories = [
    { id: "all", label: "All Work" },
    { id: "weddings", label: "Weddings" },
    { id: "pre-wedding", label: "Pre-Wedding" },
    { id: "events", label: "Events" },
    { id: "products", label: "Products" },
  ]

  // Sample portfolio items with real images
  const portfolioItems = [
    {
      id: 1,
      title: "Elegant Wedding",
      category: "weddings",
      image:
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "Beach Pre-Wedding",
      category: "pre-wedding",
      image:
        "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      title: "Corporate Event",
      category: "events",
      image:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      title: "Luxury Watch",
      category: "products",
      image:
        "https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 5,
      title: "Garden Wedding",
      category: "weddings",
      image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 6,
      title: "Mountain Pre-Wedding",
      category: "pre-wedding",
      image:
        "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 7,
      title: "Fashion Product",
      category: "products",
      image:
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 8,
      title: "Birthday Celebration",
      category: "events",
      image:
        "https://images.unsplash.com/photo-1533135347859-2d6eabddd7d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
  ]

  const filteredItems =
    activeTab === "all" ? portfolioItems : portfolioItems.filter((item) => item.category === activeTab)

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % filteredItems.length)
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length)
  }

  // 3D card effect for portfolio items
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`
  }

  return (
    <section id="portfolio" className="py-16 md:py-20 bg-zinc-950 relative overflow-hidden">
      {/* Background Beams */}
      <div className="background-beams"></div>

      <div ref={containerRef} className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
          >
            Our <span className="gradient-text">Portfolio</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/70 max-w-2xl mx-auto"
          >
            Browse through our collection of stunning photography across various categories.
          </motion.p>
        </div>

        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <div className="flex justify-center mb-8 md:mb-12 overflow-x-auto pb-2 -mx-4 px-4">
            <TabsList className="bg-zinc-900/80 backdrop-blur-sm flex-nowrap">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:via-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white whitespace-nowrap"
                  onClick={() => setActiveIndex(0)}
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value={activeTab} className="mt-0">
            {/* Grid View for Tablet and Desktop */}
            <div className="hidden sm:block">
              <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="group relative overflow-hidden rounded-lg card-3d"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="aspect-square relative overflow-hidden card-3d-content">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center">
                        <div className="text-center p-4 md:p-6">
                          <h3 className="text-white text-lg md:text-xl font-semibold">{item.title}</h3>
                          <p className="gradient-text capitalize">{item.category}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Improved Mobile Carousel */}
            <div className="sm:hidden relative">
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-full bg-zinc-800/50 backdrop-blur-sm text-white hover:bg-zinc-700/50 transition-colors"
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="text-white/70 text-sm">
                  {activeIndex + 1} / {filteredItems.length}
                </div>
                <button
                  onClick={nextSlide}
                  className="p-2 rounded-full bg-zinc-800/50 backdrop-blur-sm text-white hover:bg-zinc-700/50 transition-colors"
                  aria-label="Next slide"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              <div className="overflow-hidden w-full px-4 -mx-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, rotateY: -20, scale: 0.9 }}
                    animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                    exit={{ opacity: 0, rotateY: 20, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    className="apple-carousel-item"
                  >
                    <div className="aspect-square relative overflow-hidden rounded-lg shadow-lg mx-auto max-w-sm">
                      <Image
                        src={filteredItems[activeIndex].image || "/placeholder.svg"}
                        alt={filteredItems[activeIndex].title}
                        fill
                        sizes="(max-width: 640px) 100vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-center">
                        <div className="text-center p-6">
                          <h3 className="text-white text-xl font-semibold">{filteredItems[activeIndex].title}</h3>
                          <p className="gradient-text capitalize">{filteredItems[activeIndex].category}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* Mobile Navigation Dots */}
              <div className="flex justify-center mt-4 space-x-2">
                {filteredItems.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === activeIndex 
                        ? "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 w-4" 
                        : "bg-zinc-600"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
