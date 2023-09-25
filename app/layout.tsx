import Header from '@/components/core/Header'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from '@/components/core/Footer'
import current from '../public/images/spring-current.jpg'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TOTL Life',
  description: 'Totl Life is coming',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      
      <body className={inter.className}
      style={{
        backgroundImage: `url(${current.src})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: '50%',
        width: '100%',
        height: '100%',
      }}
      >
        <div className='bg-gray-800/50'>
        <Header />
        {children}
        <Footer />
        </div>
      </body>
      
    </html>
  )
}
