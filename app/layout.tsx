import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Indiamart Automation System',
  description: 'Automated product listing system for Indiamart',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
