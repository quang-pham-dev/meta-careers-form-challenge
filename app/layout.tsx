import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { META_DATA, fontSans, fontSerif } from '@/constants'

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
        className={`${fontSans.variable} ${fontSerif.variable} antialiased`}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  )
}
