"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useState } from "react" // Import useState
import BookingModal from "@/components/booking-modal"

export default function VideographyPage() {
  // Add state for the booking modal
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)

  // Sample videography portfolio items
  const portfolioItems = [
    {
      id: 1,
      title: "Wedding Films",
      description: "Cinematic wedding films that tell your love story.",
      image:
        "https://images.unsplash.com/photo-1604016553934-3e8b0d48ddbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "Event Coverage",
      description: "Professional video coverage for all types of events.",
      image:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      title: "Corporate Videos",
      description: "High-quality videos for corporate events and marketing.",
      image:
        "https://images.unsplash.com/photo-1551817958-d9d86fb29431?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      title: "Music Videos",
      description: "Creative music videos with artistic direction.",
      image:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
  ]

  const features = [
    "4K video recording",
    "Professional audio capture",
    "Drone aerial footage",
    "Custom editing and color grading",
    "Multiple camera setups",
    "Quick turnaround options",
  ]

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        {/* Background Beams */}
        <div className="background-beams"></div>

        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1540655037529-dec987208707?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
            alt="Videography"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              <span className="gradient-text">Videography</span> Services
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl">
              Professional video services that bring your memories to life with cinematic storytelling.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                onClick={() => setIsBookingModalOpen(true)}
              >
                Book a Consultation
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

      {/* About Videography */}
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
                Our <span className="gradient-text">Videography Approach</span>
              </h2>
              <p className="text-white/70 mb-6">
                At ARrT Photos, we believe that video is one of the most powerful ways to tell a story. Our videography
                services are designed to capture the essence of your event or project with cinematic quality and
                storytelling expertise.
              </p>
              <p className="text-white/70 mb-6">
                Whether you're looking for wedding films, event coverage, corporate videos, or creative projects, our
                team of experienced videographers will work with you to create stunning visual content that exceeds your
                expectations.
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center text-white/70">
                    <span className="text-pink-500 mr-2">✓</span> {feature}
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
                  src="https://images.unsplash.com/photo-1579965342575-16428a7c8881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="Videography"
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
              Videography <span className="gradient-text">Portfolio</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white/70 max-w-2xl mx-auto"
            >
              Browse through our collection of stunning videography projects.
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
              Videography <span className="gradient-text">Packages</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white/70 max-w-2xl mx-auto"
            >
              Choose the perfect package for your video project.
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
                <div className="text-3xl font-bold gradient-text mb-6">₹35,000</div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-white/70">
                    <span className="text-pink-500 mr-2">✓</span> 4 Hours of Coverage
                  </li>
                  <li className="flex items-center text-white/70">
                    <span className="text-pink-500 mr-2">✓</span> Single Camera Setup
                  </li>
                  <li className="flex items-center text-white/70">
                    <span className="text-pink-500 mr-2">✓</span> Basic Editing
                  </li>
                  <li className="flex items-center text-white/70">
                    <span className="text-pink-500 mr-2">✓</span> 5-7 Minute Highlight Video
                  </li>
                </ul>
                <Button className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">Book Now</Button>
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
                <div className="text-3xl font-bold gradient-text mb-6">₹60,000</div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-white/70">
                    <span className="text-pink-500 mr-2">✓</span> 8 Hours of Coverage
                  </li>
                  <li className="flex items-center text-white/70">
                    <span className="text-pink-500 mr-2">✓</span> Dual Camera Setup
                  </li>
                  <li className="flex items-center text-white/70">
                    <span className="text-pink-500 mr-2">✓</span> Professional Editing
                  </li>
                  <li className="flex items-center text-white/70">
                    <span className="text-pink-500 mr-2">✓</span> 10-15 Minute Feature Film
                  </li>
                  <li className="flex items-center text-white/70">
                    <span className="text-pink-500 mr-2">✓</span> 3-5 Minute Highlight Reel
                  </li>
                </ul>
                <Button className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">Book Now</Button>
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
                <div className="text-3xl font-bold gradient-text mb-6">₹90,000</div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-white/70">
                    <span className="text-pink-500 mr-2">✓</span> Full Day Coverage
                  </li>
                  <li className="flex items-center text-white/70">
                    <span className="text-pink-500 mr-2">✓</span> Multiple Camera Setup
                  </li>
                  <li className="flex items-center text-white/70">
                    <span className="text-pink-500 mr-2">✓</span> Drone Aerial Footage
                  </li>
                  <li className="flex items-center text-white/70">
                    <span className="text-pink-500 mr-2">✓</span> 20-30 Minute Feature Film
                  </li>
                  <li className="flex items-center text-white/70">
                    <span className="text-pink-500 mr-2">✓</span> 5-7 Minute Highlight Reel
                  </li>
                  <li className="flex items-center text-white/70">
                    <span className="text-pink-500 mr-2">✓</span> Social Media Teasers
                  </li>
                </ul>
                <Button className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">Book Now</Button>
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
              Ready to <span className="gradient-text">Bring Your Story to Life?</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white/70 mb-8"
            >
              Contact us today to discuss your videography needs and schedule a consultation.
            </motion.p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                onClick={() => setIsBookingModalOpen(true)}
              >
                Book a Consultation
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
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        defaultService="Videography"
      />
    </div>
  )
}
