import type React from "react"
import type { Metadata } from "next"
import { Fira_Sans } from "next/font/google"
import "./globals.css"

const inter = Fira_Sans({
  subsets: ["latin"],
  weight: ["100" , "200" , "300" , "400" , "500" , "600" , "700" , "800" , "900"]
})

export const metadata: Metadata = {
  title: "Weather Forecast App",
  description: "Get accurate weather forecasts for any city",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
