
import Link from "next/link"
import Image from "next/image"
import top from '../../public/icons/Arrow.png'
import ajmints from '../../public/logo/AJmintslogo.png'
import discord from '../../public/icons/discord-mark-blue.png'
import instagram from '../../public/icons/insta-logo.png'
import git from '../../public/icons/github-mark.png'

export default function Footer() {

    return (
        <footer id="bottom" className="block justify-center pb-3 pt-3 sm:pt-0 bg-gray-700 shadow-lg text-gray-400 text-center shadow-gray-900/90">

            {/* Fixed bouncing button to return to the top */}
            <div className='relative'>
                <div className='absolute -bottom-4 sm:-bottom-3 md:bottom-3 animate-bounce text-gray-300 font-light right-8 sm:right-10'>
                    <Link href="#top">
                    <Image 
                        src={top} 
                        alt='' 
                        className='w-14 -rotate-90 duration-200 bg-emerald-500/80 hover:bg-emerald-700/90 md:bg-emerald-500/90 p-3 shadow-2xl shadow-gray-800 rounded-full h-auto' 
                    />
                    <p className='text-center text-sm mt-1'>Top</p>
                    </Link>
                </div>
            </div>

            {/* Container for all items above the copyright */}
            <div className='block mt-5 sm:flex items-center justify-around lg:justify-center xl:space-x-32'>

            {/* Check out section of links */}
            <div className='mx-10 mb-4'>
                <h1 className='text-4xl text-gray-300 font-light font-serif'>Return home</h1>
                <hr></hr>
                <div className='space-y-2 mt-2 text-lg font-light'>
                <div>
                <Link className='duration-500 hover:text-yellow-400' href="/">The River</Link>
                </div>
                </div>
            </div>

            {/* Check out section of links */}
            <div className='mx-10 mb-4'>
                <h1 className='text-4xl text-gray-300 font-light font-serif'>Check out</h1>
                <hr></hr>
                <div className='space-y-2 mt-2 text-lg font-light'>
                <div>
                <Link className='duration-500 hover:text-yellow-400' href="/logs">Logs</Link>
                </div>
                </div>
            </div>

            {/* Quick links to artist and web dev */}
            <div className='mx-10 mb-4'>
                <h1 className='text-4xl text-gray-300 font-light font-serif'>About</h1>
                <hr></hr>
                <div className='space-y-2 mt-2 text-lg font-light'>
                <div>
                <Link className='duration-500 hover:text-yellow-400' href="/about">What is Totl</Link>
                </div>
                <div>
                <Link className='duration-500 hover:text-yellow-400' href="/dapp">DevNotes</Link>
                </div>
                </div>
            </div>

            
           
            {/* Socials */}
            <div className='py-8 sm:py-3 mx-10'>

                {/* Social buttons */}
                <div className='text-center mb-2 mt-5'>
                    <h1 className='text-xl font-light'>Socials</h1>
                </div>

                {/* Buttons */}
                <div className='flex sm:grid items-center sm:grid-cols-2 lg:flex justify-center space-x-2 sm:space-x-0 sm:gap-2 lg:space-x-2'>

                <div className='p-2 py-3 rounded-lg flex justify-center bg-gray-300 hover:bg-gray-100 hover:shadow-gray-500/80 transition-shadow-600 duration-500 hover:shadow-lg'>
                <Link href="https://discord.gg/tYkVXkPYbx" target="_blank">
                <Image src={discord} alt='' className='w-10 md:w-12 h-auto opacity-90' />
                </Link>
                </div>

                <div className='py-2 px-3 rounded-lg flex justify-center bg-gray-300 hover:bg-gray-100 hover:shadow-gray-500/80 transition-shadow-600 duration-500 hover:shadow-lg'>
                <Link href="https://www.instagram.com/totl.life" target="_blank">
                <Image src={instagram} alt='' className='w-10 md:w-11 h-auto'/>
                </Link>
                </div>

                <div className='py-2 px-3 rounded-lg flex justify-center bg-gray-300 hover:bg-gray-100 hover:shadow-gray-500/80 transition-shadow-600 duration-500 hover:shadow-lg'>
                <Link href="https://github.com/AJmints" target='_blank'>
                    <Image
                    src={git}
                    alt=''
                    className='w-10 md:w-11 h-auto'
                    />
                </Link>
                </div>

                </div>

                {/* Contact us info */}
                <div className="mt-5">
                    <h1>Contact us:</h1>
                    <h1>totl.lyfe@gmail.com</h1>
                </div>

            </div>
            </div>

            {/* Copyright and version updates */}
            <div className=" border-gray-500 border-t-2">
                <div>
                    <div className="flex justify-around items-center">
                        <p className='mt-2 lg:ml-10 font-light text-gray-300'> <span>&copy;</span>2023 Totl.life v0.0.1</p>
                        <div className="mt-2">
                            <div className="flex justify-center">
                            <Link href="https://www.alexjovestudios.com" target="_blank"><Image src={ajmints} alt='' className='w-14 top-0 h-auto shadow-lg shadow-gray-900/90 rounded-md bg-gray-800 mx-auto' /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </footer>
    )
}