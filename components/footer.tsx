import Link from "next/link"
import { Instagram, Facebook, Twitter, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-white/70 py-12 relative overflow-hidden">
      {/* Background Beams */}
      <div className="background-beams"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-white font-bold text-2xl inline-block mb-4">
              <span className="gradient-text">ARrT</span> Photos
            </Link>
            <p className="mb-4 max-w-md">
              Capturing life's precious moments with artistic vision and technical excellence. Professional photography
              services for weddings, events, and more.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-white hover:text-blue-500 transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-white hover:text-purple-500 transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-white hover:text-blue-400 transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-white hover:text-pink-500 transition-colors">
                <Youtube size={20} />
                <span className="sr-only">Youtube</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="gradient-text font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-purple-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#portfolio" className="hover:text-pink-400 transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-blue-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-purple-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="gradient-text font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Wedding Photography
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-purple-400 transition-colors">
                  Pre-Wedding Shoots
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-pink-400 transition-colors">
                  Videography
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  Cinematography
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-purple-400 transition-colors">
                  Product Photography
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} ARrT Photos. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex gap-4">
            <Link href="#" className="hover:text-blue-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-purple-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
