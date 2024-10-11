import type { Metadata } from 'next'
import './globals.css'
import { META_DATA, geistSans, geistMono } from '@/constants'

const { title, description } = META_DATA

export const metadata: Metadata = {
  title,
  description,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <main>{children}</main>
      </body>
    </html>
  )
}
