import Image from 'next/image'
import totlLogo from '../public/Totl3.png'

export default function Home() {
  return (
    <main>
      <h1 className='text-5xl md:text-[5rem] font-bold text-center my-20 bg-gray-200 rounded-md mx-5 p-2 shadow-lg shadow-gray-600/90'>TOTL coming soon</h1>
      <div className='flex justify-center mx-5'>
      <Image src={totlLogo} className='w-[35rem] h-auto bg-gray-200 rounded-md shadow-lg shadow-gray-600/90' alt='totl Logo'/>
      </div>
    </main>
  )
}
