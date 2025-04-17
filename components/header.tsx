"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const pathname = usePathname()
  
  // Set initial active state based on current path
  const [activeItem, setActiveItem] = useState("Home") // Default to Home for SSR
  
  // Update active item based on pathname after component mounts
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

  // Add a scroll handler function after the toggleMenu function
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Only apply smooth scrolling for hash links on the same page
    if (href.startsWith("/#") && window.location.pathname === "/") {
      e.preventDefault()
      const targetId = href.replace("/#", "")
      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
        setActiveItem(href.replace("/#", "").charAt(0).toUpperCase() + href.replace("/#", "").slice(1))
        if (isOpen) setIsOpen(false)
      }
    }
  }

  // Update the navItems array to include proper links
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
        scrolled ? "bg-black/90 backdrop-blur-md py-3 shadow-lg" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Update the Link component for the logo to properly navigate to home page */}
        <Link href="/" className="text-white font-bold text-2xl">
          <span className="gradient-text">ARrT</span> Photos
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {/* Update the Link components in the desktop navigation to use the scroll handler */}
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 transition-colors relative group",
                activeItem === item.name ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" : ""
              )}
              onClick={(e) => {
                handleScroll(e, item.href)
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
          >
            <nav className="container mx-auto px-4 py-6 flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Update the Link components in the mobile navigation to use the scroll handler */}
                  <Link
                    href={item.href}
                    className={cn(
                      "transition-colors py-2 block",
                      activeItem === item.name 
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" 
                        : "text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-blue-500"
                    )}
                    onClick={(e) => {
                      handleScroll(e, item.href)
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
