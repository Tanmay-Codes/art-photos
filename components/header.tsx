"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Menu, X, Home, Image as ImageIcon, UserRound, Star, MessageSquare, BookOpen, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

// Custom mobile menu that doesn't rely on sheet.tsx to avoid issues
const MobileMenu = ({ 
  isOpen, 
  onClose,
  navItems, 
  activeItem,
  onNavItemClick 
}: { 
  isOpen: boolean, 
  onClose: () => void,
  navItems: any[],
  activeItem: string,
  onNavItemClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          
          {/* Sidebar */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              mass: 1
            }}
            className="fixed top-0 right-0 h-full w-4/5 max-w-sm z-50 overflow-hidden"
          >
            <div className="h-full flex flex-col bg-gradient-to-br from-black to-zinc-900 border-l border-zinc-800 overflow-hidden">
              {/* Header */}
              <div className="p-6 flex items-center justify-between border-b border-zinc-800/50">
                <h2 className="text-xl font-bold">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                    Menu
                  </span>
                </h2>
                <button 
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700/50 hover:text-white transition-colors"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>
              
              {/* Navigation */}
              <div className="flex-1 overflow-y-auto py-6">
                <nav className="space-y-1.5 px-3">
                  {navItems.map((item) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      whileHover={{ x: 5 }}
                      className="overflow-hidden"
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center justify-between py-3 px-4 rounded-xl transition-all duration-200 group",
                          activeItem === item.name 
                            ? "bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border-l-4 border-purple-500" 
                            : "border-l-4 border-transparent text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                        )}
                        onClick={(e) => onNavItemClick(e, item.href)}
                      >
                        <div className="flex items-center">
                          <div className={cn(
                            "mr-3 w-9 h-9 rounded-full flex items-center justify-center transition-colors",
                            activeItem === item.name 
                              ? "bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 text-white" 
                              : "bg-zinc-800/30 text-zinc-400 group-hover:text-white group-hover:bg-zinc-700/30"
                          )}>
                            {item.icon}
                          </div>
                          <span className={cn(
                            "font-medium",
                            activeItem === item.name ? "text-white" : "group-hover:text-white"
                          )}>
                            {item.name}
                          </span>
                        </div>
                        <ChevronRight size={16} className="text-zinc-500 group-hover:text-zinc-300 transition-colors" />
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>
              
              {/* Footer */}
              <motion.div 
                className="p-6 border-t border-zinc-800/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Button
                  variant="default"
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 font-medium"
                >
                  Book Now
                </Button>
              </motion.div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

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

  // Handle body scroll lock when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

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

  // Update the navItems array to include proper links and icons
  const navItems = [
    { name: "Home", href: "/", icon: <Home className="w-5 h-5" /> },
    { name: "Services", href: "/#services", icon: <BookOpen className="w-5 h-5" /> },
    { name: "Portfolio", href: "/portfolio", icon: <ImageIcon className="w-5 h-5" /> },
    { name: "About", href: "/#about", icon: <UserRound className="w-5 h-5" /> },
    { name: "Testimonials", href: "/#testimonials", icon: <Star className="w-5 h-5" /> },
    { name: "Contact", href: "/#contact", icon: <MessageSquare className="w-5 h-5" /> },
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

  // Close sheet when navigation happens
  const handleMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    handleScroll(e, href)
    setActiveItem(href.includes("#") ? href.split("#")[1].charAt(0).toUpperCase() + href.split("#")[1].slice(1) : href === "/" ? "Home" : "Portfolio")
    setIsOpen(false)
  }

  return (
    <>
      <header
        ref={headerRef}
        onMouseMove={handleMouseMove}
        className={cn(
          "w-full transition-all duration-300 spotlight z-40 fixed top-0 left-0 right-0",
          scrolled 
            ? "bg-black/90 backdrop-blur-md py-3 shadow-lg" 
            : "bg-black/40 backdrop-blur-sm py-5"
        )}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
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
            className="md:hidden h-10 w-10 flex items-center justify-center rounded-full bg-zinc-900/50 backdrop-blur-md border border-zinc-800/50 text-white hover:bg-zinc-800 hover:border-zinc-700/50 transition-colors z-50"
            onClick={toggleMenu}
            aria-label="Toggle mobile menu"
          >
            {isOpen ? (
              <X size={20} className="text-zinc-100" />
            ) : (
              <Menu size={20} className="text-zinc-100" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Navigation with custom implementation */}
      <MobileMenu 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        navItems={navItems}
        activeItem={activeItem}
        onNavItemClick={handleMobileNavClick}
      />
    </>
  )
}
