import {
  Inter as FontSans,
  Noto_Serif_Georgian as FontSerif,
} from 'next/font/google'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const fontSerif = FontSerif({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

export { fontSans, fontSerif }
