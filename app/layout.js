import { inter } from "@/app/ui/font"
import "@/app/ui/globals.css"
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
