"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Footer from "@/components/footer"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

// Custom header for portfolio page with transparent background
const PortfolioHeader = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const pathname = usePathname()
  
  // Set initial active state based on current path - use a simple default value for SSR
  const [activeItem, setActiveItem] = useState("Portfolio")
  
  // Update active state after component mounts
  useEffect(() => {
    if (pathname === "/") {
      setActiveItem("Home")
    } else if (pathname === "/portfolio") {
      setActiveItem("Portfolio")
    } else {
      // Check if pathname contains a hash that matches a nav item
      const hash = pathname.includes("#") ? pathname.split("#")[1] : ""
      if (hash) {
        setActiveItem(hash.charAt(0).toUpperCase() + hash.slice(1))
      }
    }
  }, [pathname])
  
  // Add scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    // Initial check on mount
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  
  const toggleMenu = () => setIsOpen(!isOpen)

  // Add a scroll handler function
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Only apply smooth scrolling for hash links on the same page
    if (href.startsWith("#")) {
      e.preventDefault()
      const targetId = href.replace("#", "")
      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
        if (isOpen) setIsOpen(false)
      }
    }
  }

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/#services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "About", href: "/#about" },
    { name: "Testimonials", href: "/#testimonials" },
    { name: "Contact", href: "/#contact" },
  ]

  // Spotlight effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!headerRef.current) return
    const rect = headerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    headerRef.current.style.setProperty("--x", `${x}px`)
    headerRef.current.style.setProperty("--y", `${y}px`)
  }

  return (
    <header
      ref={headerRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "w-full transition-all duration-300 spotlight z-50",
        scrolled ? "bg-black/90 backdrop-blur-md py-3 shadow-lg" : "bg-black/30 backdrop-blur-sm py-3"
      )}
      suppressHydrationWarning
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-white font-bold text-2xl">
          <span className="gradient-text">ARrT</span> Photos
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 transition-colors relative group",
                activeItem === item.name ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" : ""
              )}
              onClick={(e) => {
                if (item.href.startsWith("#")) {
                  handleScroll(e, item.href)
                }
                setActiveItem(item.name)
              }}
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          <Button
            variant="default"
            size="sm"
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
          >
            Book Now
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none z-20" 
          onClick={toggleMenu}
          aria-label="Toggle mobile menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mobile-menu md:hidden"
            suppressHydrationWarning
          >
            <nav className="container mx-auto px-4 py-6 flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  suppressHydrationWarning
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "transition-colors py-2 block",
                      activeItem === item.name 
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" 
                        : "text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-blue-500"
                    )}
                    onClick={(e) => {
                      if (item.href.startsWith("#")) {
                        handleScroll(e, item.href)
                      }
                      setActiveItem(item.name)
                      toggleMenu()
                    }}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                suppressHydrationWarning
              >
                <Button
                  variant="default"
                  size="sm"
                  className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:via-purple-500 hover:to-blue-500"
                >
                  Book Now
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

// Aceternity UI inspired components
const BackgroundBeams = ({ className }: { className?: string }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} suppressHydrationWarning>
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-black [mask-image:radial-gradient(transparent,white)]" />
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center">
          <div className="w-[40rem] h-[40rem] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-20 blur-3xl animate-pulse" />
        </div>
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center">
          <div
            className="w-[30rem] h-[30rem] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full opacity-20 blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>
      </div>
    </div>
  )
}

// 3D Card component
const Card3D = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 15
    const rotateY = (centerX - x) / 15

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`
    cardRef.current.style.transition = "transform 0.5s ease"
  }

  return (
    <div
      ref={cardRef}
      className={`card-3d transition-transform duration-200 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-3d-content">{children}</div>
    </div>
  )
}

// Apple Carousel component
const AppleCarousel = ({ items }: { items: any[] }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const nextSlide = () => {
    setDirection(1)
    setActiveIndex((prev) => (prev + 1) % items.length)
  }

  const prevSlide = () => {
    setDirection(-1)
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.5,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.5,
      rotateY: direction > 0 ? -45 : 45,
      transition: {
        duration: 0.5,
      },
    }),
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto perspective-1000" suppressHydrationWarning>
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={prevSlide}
          className="p-3 rounded-full bg-zinc-800/50 backdrop-blur-sm text-white hover:bg-zinc-700/50 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="text-white/70 text-sm">
          {activeIndex + 1} / {items.length}
        </div>
        <button
          onClick={nextSlide}
          className="p-3 rounded-full bg-zinc-800/50 backdrop-blur-sm text-white hover:bg-zinc-700/50 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="relative h-[500px] overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
            suppressHydrationWarning
          >
            <div className="w-full h-full rounded-2xl overflow-hidden">
              <Image
                src={items[activeIndex].image || "/placeholder.svg"}
                alt={items[activeIndex].title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-white text-2xl font-bold mb-2">{items[activeIndex].title}</h3>
                <p className="text-white/80">{items[activeIndex].description}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function PortfolioPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Check if client-side rendering is active
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Parallax values
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -300])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6])

  // Portfolio categories
  const categories = [
    {
      id: "wedding",
      title: "Wedding Photography",
      description: "Capturing the magic and emotions of your special day with artistic flair and attention to detail.",
      image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      link: "/wedding-photography",
      featured: [
        {
          id: 1,
          title: "Traditional Wedding",
          description: "Capturing the beauty of traditional ceremonies and rituals.",
          image:
            "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        },
        {
          id: 2,
          title: "Modern Wedding",
          description: "Contemporary wedding photography with a creative twist.",
          image:
            "https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        },
        {
          id: 3,
          title: "Destination Wedding",
          description: "Beautiful ceremonies in exotic and picturesque locations.",
          image:
            "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        },
      ],
    },
    {
      id: "pre-wedding",
      title: "Pre-Wedding Shoots",
      description: "Creative and romantic pre-wedding photoshoots that tell your unique love story.",
      image:
        "https://images.unsplash.com/photo-1529636798458-92182e662485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      link: "/pre-wedding-shoots",
      featured: [
        {
          id: 1,
          title: "Beach Romance",
          description: "Romantic pre-wedding photoshoot at beautiful beaches.",
          image:
            "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        },
        {
          id: 2,
          title: "Urban Love",
          description: "Modern pre-wedding shoots in urban settings.",
          image:
            "https://images.unsplash.com/photo-1591604466107-ec97de577aff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        },
        {
          id: 3,
          title: "Mountain Escape",
          description: "Breathtaking pre-wedding photos in mountain landscapes.",
          image:
            "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        },
      ],
    },
    {
      id: "videography",
      title: "Videography",
      description: "Professional video services that bring your memories to life with cinematic storytelling.",
      image:
        "https://images.unsplash.com/photo-1540655037529-dec987208707?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      link: "/videography",
      featured: [
        {
          id: 1,
          title: "Wedding Films",
          description: "Cinematic wedding films that tell your love story.",
          image:
            "https://images.unsplash.com/photo-1604016553934-3e8b0d48ddbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        },
        {
          id: 2,
          title: "Event Coverage",
          description: "Professional video coverage for all types of events.",
          image:
            "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        },
        {
          id: 3,
          title: "Corporate Videos",
          description: "High-quality videos for corporate events and marketing.",
          image:
            "https://images.unsplash.com/photo-1551817958-d9d86fb29431?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        },
      ],
    },
    {
      id: "cinematography",
      title: "Cinematography",
      description: "Artistic film-making that transforms your special moments into breathtaking visual narratives.",
      image:
        "https://images.unsplash.com/photo-1616469829581-73993eb86b02?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      link: "/cinematography",
      featured: [
        {
          id: 1,
          title: "Wedding Cinema",
          description: "Artistic wedding films with cinematic storytelling.",
          image:
            "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        },
        {
          id: 2,
          title: "Documentary Style",
          description: "Documentary-style films that capture authentic moments.",
          image:
            "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        },
        {
          id: 3,
          title: "Aerial Cinematography",
          description: "Breathtaking aerial shots that add a unique perspective.",
          image:
            "https://images.unsplash.com/photo-1506947411487-a56738267384?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        },
      ],
    },
    {
      id: "product",
      title: "Product Photography",
      description: "High-quality product photography that showcases your items in the best possible light.",
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      link: "/product-photography",
      featured: [
        {
          id: 1,
          title: "E-commerce Products",
          description: "Professional product photography for online stores.",
          image:
            "https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        },
        {
          id: 2,
          title: "Food Photography",
          description: "Appetizing food photography for restaurants and menus.",
          image:
            "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        },
        {
          id: 3,
          title: "Jewelry & Accessories",
          description: "Detailed photography of jewelry and accessories.",
          image:
            "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        },
      ],
    },
  ]

  // Spotlight effect for mouse tracking
  const [mousePosition, setMousePosition] = useState<{ x: number, y: number } | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <>
      <PortfolioHeader />
      <main className="min-h-screen bg-black pt-[60px]" ref={containerRef} suppressHydrationWarning>
        {/* Render only on client side for animations */}
        {isClient ? (
          <>
            {/* Hero Section with Parallax */}
            <section className="relative h-screen overflow-hidden" suppressHydrationWarning>
              <BackgroundBeams />

              <motion.div style={{ y: y1 }} className="absolute inset-0 z-0" suppressHydrationWarning>
                <Image
                  src="https://images.unsplash.com/photo-1554941829-202a0b2403b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
                  alt="Portfolio"
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/60" />
              </motion.div>

              <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  style={{ y: y2 }}
                  suppressHydrationWarning
                >
                  <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                    Our{" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                      Portfolio
                    </span>
                  </h1>
                  <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto">
                    Explore our diverse collection of photography and videography work across various categories. Each image
                    tells a unique story captured with passion and precision.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    {categories.map((category) => (
                      <a
                        key={category.id}
                        href={`#${category.id}`}
                        className="px-6 py-3 rounded-full bg-zinc-800/50 backdrop-blur-sm text-white hover:bg-gradient-to-r hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-300"
                      >
                        {category.title}
                      </a>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Scroll Indicator */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10" suppressHydrationWarning>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                  className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
                  suppressHydrationWarning
                >
                  <motion.div
                    animate={{ y: [0, 15, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                    className="w-1 h-3 bg-white rounded-full mt-2"
                    suppressHydrationWarning
                  />
                </motion.div>
              </div>
            </section>

            {/* Portfolio Categories */}
            {categories.map((category, index) => (
              <section
                key={category.id}
                id={category.id}
                className={`py-24 relative ${index % 2 === 0 ? "bg-black" : "bg-zinc-950"}`}
                suppressHydrationWarning
              >
                <BackgroundBeams className={`opacity-${index % 2 === 0 ? "30" : "20"}`} />

                <div className="container mx-auto px-4 relative z-10">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      suppressHydrationWarning
                    >
                      <h2 className="text-4xl font-bold mb-6 text-white">
                        {category.title.split(" ").map((word, i, arr) =>
                          i === arr.length - 1 ? (
                            <span
                              key={i}
                              className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                            >
                              {" "}
                              {word}
                            </span>
                          ) : (
                            <span key={i}>{word} </span>
                          ),
                        )}
                      </h2>
                      <p className="text-white/70 mb-8 text-lg">{category.description}</p>
                      <Link href={category.link}>
                        <Button
                          size="lg"
                          className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                        >
                          View {category.title} Portfolio
                        </Button>
                      </Link>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      suppressHydrationWarning
                    >
                      <Card3D className="rounded-2xl overflow-hidden">
                        <div className="aspect-video relative overflow-hidden">
                          <Image
                            src={category.image || "/placeholder.svg"}
                            alt={category.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                            <div className="p-6">
                              <h3 className="text-white text-xl font-semibold">{category.title}</h3>
                            </div>
                          </div>
                        </div>
                      </Card3D>
                    </motion.div>
                  </div>

                  {/* Featured Work Carousel */}
                  <div className="mt-20">
                    <h3 className="text-2xl font-bold text-white text-center mb-10">
                      Featured{" "}
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                        Work
                      </span>
                    </h3>
                    <AppleCarousel items={category.featured} />
                  </div>
                </div>
              </section>
            ))}

            {/* Call to Action */}
            <section className="py-24 relative">
              <BackgroundBeams />

              <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                  <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-bold mb-6 text-white"
                  >
                    Ready to{" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                      Create
                    </span>{" "}
                    Together?
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-white/70 mb-10 text-lg"
                  >
                    Let's collaborate to capture your special moments with our artistic vision and technical expertise.
                  </motion.p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 text-lg px-8"
                    >
                      Book a Session
                    </Button>
                    <Link href="/contact">
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-white/20 backdrop-blur-sm hover:bg-white/10 text-lg px-8"
                      >
                        Contact Us
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          <div className="h-screen flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border-4 border-t-transparent border-blue-500 animate-spin"></div>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
