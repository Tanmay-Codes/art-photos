"use server"

import nodemailer from "nodemailer"

interface BookingFormData {
  name: string
  email: string
  phone: string
  date: string
  service: string
  message: string
}

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export async function submitBookingForm(data: BookingFormData) {
  try {
    // Check if we have email credentials
    const emailUser = process.env.EMAIL_USER
    const emailPass = process.env.EMAIL_PASS
    const emailHost = process.env.EMAIL_HOST || "smtp.gmail.com"
    const emailPort = Number.parseInt(process.env.EMAIL_PORT || "587")
    const emailTo = process.env.EMAIL_TO || "info@arrtphotos.com"

    // If we don't have credentials, return a dummy success response
    if (!emailUser || !emailPass) {
      console.log("Email credentials not found, returning dummy success response")
      console.log("Booking form data:", data)

      // Wait for 1 second to simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      return {
        success: true,
        message: "Booking request submitted successfully (demo mode)",
      }
    }

    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: emailHost,
      port: emailPort,
      secure: emailPort === 465,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    })

    // Email content
    const mailOptions = {
      from: emailUser,
      to: emailTo,
      subject: `New Booking Request: ${data.service}`,
      text: `
        Name: ${data.name}
        Email: ${data.email}
        Phone: ${data.phone}
        Date: ${data.date}
        Service: ${data.service}
        Message: ${data.message}
      `,
      html: `
        <h2>New Booking Request</h2>
        <p><strong>Service:</strong> ${data.service}</p>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Date:</strong> ${data.date}</p>
        <p><strong>Message:</strong> ${data.message}</p>
      `,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return {
      success: true,
      message: "Booking request submitted successfully",
    }
  } catch (error) {
    console.error("Error submitting booking form:", error)
    return {
      success: false,
      message: "Failed to submit booking request",
    }
  }
}

export async function submitContactForm(data: ContactFormData) {
  try {
    // Check if we have email credentials
    const emailUser = process.env.EMAIL_USER
    const emailPass = process.env.EMAIL_PASS
    const emailHost = process.env.EMAIL_HOST || "smtp.gmail.com"
    const emailPort = Number.parseInt(process.env.EMAIL_PORT || "587")
    const emailTo = process.env.EMAIL_TO || "info@arrtphotos.com"

    // If we don't have credentials, return a dummy success response
    if (!emailUser || !emailPass) {
      console.log("Email credentials not found, returning dummy success response")
      console.log("Contact form data:", data)

      // Wait for 1 second to simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      return {
        success: true,
        message: "Contact form submitted successfully (demo mode)",
      }
    }

    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: emailHost,
      port: emailPort,
      secure: emailPort === 465,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    })

    // Email content
    const mailOptions = {
      from: emailUser,
      to: emailTo,
      subject: `New Contact Form Submission: ${data.subject}`,
      text: `
        Name: ${data.name}
        Email: ${data.email}
        Subject: ${data.subject}
        Message: ${data.message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Message:</strong> ${data.message}</p>
      `,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return {
      success: true,
      message: "Contact form submitted successfully",
    }
  } catch (error) {
    console.error("Error submitting contact form:", error)
    return {
      success: false,
      message: "Failed to submit contact form",
    }
  }
}
