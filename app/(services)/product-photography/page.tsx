"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import BookingModal from "@/components/booking-modal"

export default function ProductPhotographyPage() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)

  // Sample product photography portfolio items
  const portfolioItems = [
    {
      id: 1,
      title: "E-commerce Products",
      description: "Professional product photography for online stores.",
      image:
        "https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "Food Photography",
      description: "Appetizing food photography for restaurants and menus.",
      image:
        "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      title: "Jewelry & Accessories",
      description: "Detailed photography of jewelry and accessories.",
      image:
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      title: "Lifestyle Products",
      description: "Lifestyle product photography that tells a story.",
      image:
        "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
  ]

  const features = [
    "Professional studio setup",
    "Custom lighting techniques",
    "White background options",
    "Lifestyle product shots",
    "360° product views",
    "Post-processing and retouching",
  ]

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        {/* Background Beams */}
        <div className="background-beams"></div>

        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
            alt="Product Photography"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              <span className="gradient-text">Product</span> Photography
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl">
              High-quality product photography that showcases your items in the best possible light.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                onClick={() => setIsBookingModalOpen(true)}
              >
                Book a Session
              </Button>
              <Link href="/portfolio">
                <Button size="lg" variant="outline" className="border-white/20 backdrop-blur-sm hover:bg-white/10">
                  View Portfolio
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Product Photography */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6 text-white">
                Our <span className="gradient-text">Product Photography Approach</span>
              </h2>
              <p className="text-white/70 mb-6">
                In today's digital marketplace, high-quality product photography is essential for showcasing your
                products and driving sales. At ARrT Photos, we specialize in creating stunning product images that
                highlight the features, quality, and appeal of your items.
              </p>
              <p className="text-white/70 mb-6">
                Our professional studio is equipped with state-of-the-art lighting and equipment to ensure your products
                look their best. Whether you need clean white background images for e-commerce, lifestyle shots for
                marketing, or creative product photography for advertising, our team has the expertise to deliver
                exceptional results.
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center text-white/70">
                    <span className="text-purple-500 mr-2">✓</span> {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative h-[500px] rounded-lg overflow-hidden card-3d">
                <Image
                  src="https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="Product Photography"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 bg-zinc-950 relative">
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
              Product Photography <span className="gradient-text">Portfolio</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white/70 max-w-2xl mx-auto"
            >
              Browse through our collection of stunning product photography.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolioItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group relative overflow-hidden rounded-lg card-3d"
              >
                <div className="aspect-video relative overflow-hidden card-3d-content">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center">
                    <div className="text-center p-6">
                      <h3 className="text-white text-xl font-semibold">{item.title}</h3>
                      <p className="text-white/70">{item.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/portfolio">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
              >
                View Full Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-4 text-white"
            >
              Product Photography <span className="gradient-text">Packages</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white/70 max-w-2xl mx-auto"
            >
              Choose the perfect package for your product photography needs.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Package */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-lg overflow-hidden card-3d"
            >
              <div className="p-8 card-3d-content">
                <h3 className="text-2xl font-bold text-white mb-4">Basic</h3>
                <div className="text-3xl font-bold gradient-text mb-6">₹15,000</div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-white/70">
                    <span className="text-purple-500 mr-2">✓</span> Up to 10 Products
                  </li>
                  <li className="flex items-center text-white/70">
                    <span className="text-purple-500 mr-2">✓</span> White Background
                  </li>
                  <li className="flex items-center text-white/70">
                    <span className="text-purple-500 mr-2">✓</span> 2 Angles Per Product
                  </li>
                  <li className="flex items-center text-white/70">
                    <span className="text-purple-500 mr-2">✓</span> Basic Retouching
                  </li>
                </ul>
                <Button
                  className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                  onClick={() => setIsBookingModalOpen(true)}
                >
                  Book Now
                </Button>
              </div>
            </motion.div>

            {/* Standard Package */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-lg overflow-hidden relative card-3d"
            >
              <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-4 py-1 text-sm font-bold">
                POPULAR
              </div>
              <div className="p-8 card-3d-content">
                <h3 className="text-2xl font-bold text-white mb-4">Standard</h3>
                <div className="text-3xl font-bold gradient-text mb-6">₹30,000</div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-white/70">
                    <span className="text-purple-500 mr-2">✓</span> Up to 20 Products
                  </li>
                  <li className="flex items-center text-white/70">
                    <span className="text-purple-500 mr-2">✓</span> White or Custom Background
                  </li>
                  <li className="flex items-center text-white/70">
                    <span className="text-purple-500 mr-2">✓</span> 3-4 Angles Per Product
                  </li>
                  <li className="flex items-center text-white/70">
                    <span className="text-purple-500 mr-2">✓</span> Advanced Retouching
                  </li>
                  <li className="flex items-center text-white/70">
                    <span className="text-purple-500 mr-2">✓</span> 2 Lifestyle Shots
                  </li>
                </ul>
                <Button
                  className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                  onClick={() => setIsBookingModalOpen(true)}
                >
                  Book Now
                </Button>
              </div>
            </motion.div>

            {/* Premium Package */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-lg overflow-hidden card-3d"
            >
              <div className="p-8 card-3d-content">
                <h3 className="text-2xl font-bold text-white mb-4">Premium</h3>
                <div className="text-3xl font-bold gradient-text mb-6">₹50,000</div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-white/70">
                    <span className="text-purple-500 mr-2">✓</span> Up to 30 Products
                  </li>
                  <li className="flex items-center text-white/70">
                    <span className="text-purple-500 mr-2">✓</span> Multiple Background Options
                  </li>
                  <li className="flex items-center text-white/70">
                    <span className="text-purple-500 mr-2">✓</span> 5+ Angles Per Product
                  </li>
                  <li className="flex items-center text-white/70">
                    <span className="text-purple-500 mr-2">✓</span> Premium Retouching
                  </li>
                  <li className="flex items-center text-white/70">
                    <span className="text-purple-500 mr-2">✓</span> 5 Lifestyle Shots
                  </li>
                  <li className="flex items-center text-white/70">
                    <span className="text-purple-500 mr-2">✓</span> 360° Product Views
                  </li>
                </ul>
                <Button
                  className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                  onClick={() => setIsBookingModalOpen(true)}
                >
                  Book Now
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-zinc-950 relative">
        {/* Background Beams */}
        <div className="background-beams"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-6 text-white"
            >
              Ready to <span className="gradient-text">Showcase Your Products?</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white/70 mb-8"
            >
              Contact us today to discuss your product photography needs and elevate your brand.
            </motion.p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                onClick={() => setIsBookingModalOpen(true)}
              >
                Book a Session
              </Button>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white/20 backdrop-blur-sm hover:bg-white/10">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        defaultService="Product Photography"
      />
    </div>
  )
}
