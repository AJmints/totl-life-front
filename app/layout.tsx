import Header from '@/components/core/Header'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from '@/components/core/Footer'
import current from '../public/images/spring-current.jpg'

const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'TOTL Life',
//   description: 'Totl Life is coming',
// }

export default function RootLayout({
  children,
  backgroundStyle = 'default', // Default background style
}: {
  children: React.ReactNode
  backgroundStyle?: 'default' | 'static' | 'parallax' // | 'custom' // Add more styles as needed
}) {
  const getBackgroundStyle = () => {
    switch (backgroundStyle) {
      case 'static':
        return 'static-background';
      case 'parallax':
        return 'parallax-background';
      // case 'custom':
      //   return 'custom-background'; // Add your own custom class
      default:
        return 'default-background'; // Default style
    }
  };
  return (
    <html lang="en">
      
      <body
        className={`${inter.className} ${getBackgroundStyle()}`}
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
