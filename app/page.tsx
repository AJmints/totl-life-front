import Image from 'next/image'
import Link from 'next/link'
import totlLogo from '../public/logo/Totl3.png'
import insta from '../public/icons/insta-logo.png'

export default function Home() {
  return (
    <main className='mb-20'>
      <h1 className='text-5xl md:text-[5rem] font-bold text-center my-16 bg-gray-200 rounded-md mx-5 p-2 shadow-lg shadow-gray-600/90'>TOTL coming soon</h1>
      
      <div className='flex justify-center mx-5'>
      <Image src={totlLogo} className='w-[35rem] h-auto mb-10 bg-gray-100 rounded-md shadow-lg shadow-gray-600/90' alt='totl Logo'/>
      </div>
      
      <div className='bg-gray-200 p-5 mx-5 mb-5 text-center text-xl rounded-md shadow-lg shadow-gray-600/90'>
      <p>What is TOTL? It&#39;s a life style. What does it stand for?</p>
      <p>&quot;Turtle on the log&quot;</p>
      <p>What does that mean? Follow our insta to follow our story as it unfolds!</p>
      </div>

      <Link href="https://www.instagram.com/turtlesonthelog/">
        <Image
        src={insta}
        alt=''
        className='w-12 bg-gray-100 p-1 rounded-md my-2 h-auto mx-auto shadow-lg shadow-gray-600/90 hover:w-16 hover:my-0 duration-300'
        />
      </Link>

    </main>
  )
}
