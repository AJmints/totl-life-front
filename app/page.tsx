import insta from '../public/icons/insta-logo.png'
import discord from '../public/icons/discord-mark-blue.png'
import LandingBase from '@/components/the-river/LandingBase'

export default function Home() {

  
  return (
    <div className='mb-20'>
      <LandingBase 
      discord={discord}
      insta={insta}
      />
    </div>
  )
}
