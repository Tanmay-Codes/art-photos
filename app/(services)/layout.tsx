import type React from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function ServiceLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      <main className="pt-20">{children}</main>
      <Footer />
    </>
  )
}
