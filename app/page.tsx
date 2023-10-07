import Image from 'next/image'
import Link from 'next/link'
import totlLogo from '../public/logo/Totl3.png'
import insta from '../public/icons/insta-logo.png'
import discord from '../public/icons/discord-mark-blue.png'

export default function Home() {

  
  return (
    <div 
    className='mb-20'
    >
      <div className='flex justify-center'>
      <h1 className='text-5xl md:text-[5rem] font-bold text-center my-16 bg-gray-200 rounded-md mx-5 p-2 shadow-lg shadow-gray-800/90'>TOTL coming soon</h1>
      </div>
      <div className='flex justify-center mx-5'>
      <Image src={totlLogo} className='w-[35rem] h-auto mb-10 bg-gray-100 rounded-md shadow-lg shadow-gray-800/90' alt='totl Logo'/>
      </div>
      
      <div className=' flex justify-center text-center text-xl'>
      <div className='bg-gray-200 p-5 mx-5 mb-5 rounded-md shadow-lg shadow-gray-800/90'>
      <p>What is TOTL? It&#39;s a life style. What does it stand for?</p>
      <p>&quot;Turtle on the log&quot;</p>
      <p>What does that mean? Follow our Instagram and/or Discord to follow our story as it unfolds!</p>
      </div>
      </div>

      <div className='flex justify-center space-x-5'>
        <div>
      <Link href="https://www.instagram.com/totl.life/" target='_blank'>
        <Image
        src={insta}
        alt=''
        className='w-12 bg-gray-100 p-1 rounded-md my-2 h-auto shadow-lg shadow-gray-800/90 hover:w-16 hover:my-0 duration-300'
        />
      </Link>
      </div>
      <div>
      <Link href="https://discord.com/invite/5tpGNSmj?fbclid=IwAR0TI7XDe5RKSECtesS4CncRuqfK3X6svQu1YW2wfhoIyXPiOOXiMFlr5Eo" target='_blank'>
        <Image
        src={discord}
        alt=''
        className='w-12 bg-gray-100 px-1 py-2 rounded-md my-2 h-auto shadow-lg shadow-gray-800/90 hover:w-16 hover:my-0 duration-300'
        />
      </Link>
      </div>
      </div>

    </div>
  )
}
