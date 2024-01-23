import Header from '@/components/core/Header'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import current from '../public/images/spring-current.jpg'
import { Analytics } from '@vercel/analytics/react'
import { RiverContextProvider } from './context/RiverContextProvider'
import { UserContextProvider } from './context/UserContextProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TOTL Life',
  description: 'Totl Life is here',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" style={{
      backgroundImage: `url(${current.src})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: '50%',
      backgroundAttachment: 'fixed',
      width: '100%',
      height: '100%',
    }}>
      
      <body id="body" className={inter.className}
      
      >
        <UserContextProvider>
        <RiverContextProvider>

          <div className='bg-gray-800/50'>
          <Header />
            {children}
          <Analytics />
          </div>
          
        </RiverContextProvider>
        </UserContextProvider>
      </body>
      
    </html>
  )
}
