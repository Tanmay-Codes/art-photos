"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { submitBookingForm } from "@/app/actions"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  defaultService?: string
}

export default function BookingModal({ isOpen, onClose, defaultService = "Wedding Photography" }: BookingModalProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    service: defaultService,
    message: "",
  })

  if (!isOpen) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, service: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await submitBookingForm(formData)

      if (result.success) {
        toast({
          title: "Booking Request Submitted",
          description: "We'll get back to you shortly to confirm your booking.",
        })
        onClose()
      } else {
        toast({
          title: "Submission Failed",
          description: result.message || "Please try again later.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Submission Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-md max-h-[90vh] overflow-auto bg-zinc-900 rounded-lg shadow-xl p-6 border border-zinc-800">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">
          Book a <span className="gradient-text">Session</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              className="bg-zinc-800/50 border-zinc-700"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
              className="bg-zinc-800/50 border-zinc-700"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              required
              className="bg-zinc-800/50 border-zinc-700"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Preferred Date</Label>
            <Input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="bg-zinc-800/50 border-zinc-700"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="service">Service</Label>
            <Select defaultValue={formData.service} onValueChange={handleSelectChange}>
              <SelectTrigger className="bg-zinc-800/50 border-zinc-700">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Wedding Photography">Wedding Photography</SelectItem>
                <SelectItem value="Pre-Wedding Shoots">Pre-Wedding Shoots</SelectItem>
                <SelectItem value="Videography">Videography</SelectItem>
                <SelectItem value="Cinematography">Cinematography</SelectItem>
                <SelectItem value="Product Photography">Product Photography</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Additional Details</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us more about your event or requirements..."
              className="bg-zinc-800/50 border-zinc-700"
              rows={4}
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
          >
            {isSubmitting ? "Submitting..." : "Submit Booking Request"}
          </Button>
        </form>
      </div>
    </div>
  )
}
