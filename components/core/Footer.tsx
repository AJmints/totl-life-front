
import Link from "next/link"
import Image from "next/image"
import top from '../../public/icons/Arrow.png'
import ajmints from '../../public/logo/AJmintslogo.png'
import totlSrc from "../../public/logo/totl-home.png"

export default function Footer() {

    return (
        <footer id="bottom" className="block justify-center py-3 bg-gray-700 shadow-lg shadow-gray-900/90">

            {/* Fixed bouncing button to return to the top */}
            <div className='relative'>
                <div className='absolute -bottom-28 sm:bottom-6 md:bottom-8 animate-bounce right-8 sm:right-10'>
                    <Link href="#top">
                    <Image 
                        src={top} 
                        alt='' 
                        className='w-14 -rotate-90 duration-200 bg-emerald-500/60 hover:bg-emerald-700/90 md:bg-emerald-500/90 p-3 shadow-2xl shadow-gray-800 rounded-full h-auto' 
                    />
                    <p className='text-center text-sm mt-1'>Top</p>
                    </Link>
                </div>
            </div>

            {/* Container for all items above the copyright */}
            <div className='block sm:flex items-center justify-around lg:justify-center xl:space-x-32'>

            {/* AJ Mints logo */}
            <div className='ml-10 mr-5'>
                <div className=''>
                <Image src={totlSrc} alt='' className='w-28 top-0 sm:w-56 h-auto  rounded-md ' />
                </div>
            </div>

            {/* Check out section of links */}
            <div className='mx-10 mb-4'>
                <h1 className='text-2xl font-light'>Check out</h1>
                <hr></hr>
                <div className='space-y-2 mt-2 text-lg font-light'>
                <div>
                <Link className='duration-500 hover:text-yellow-400' href="/">Main</Link>
                </div>
                <div>
                <Link className='duration-500 hover:text-yellow-400' href="/artwork">ArtWork</Link>
                </div>
                <div>
                <Link className='duration-500 hover:text-yellow-400' href="/commission">Commissions</Link>
                </div>
                <div>
                <Link className='duration-500 hover:text-yellow-400' href="/about">Contact</Link>
                </div>
                </div>
            </div>

            {/* Quick links to artist and web dev */}
            <div className='mx-10 mb-4'>
                <h1 className='text-2xl font-light'>About</h1>
                <hr></hr>
                <div className='space-y-2 mt-2 text-lg font-light'>
                <div>
                <Link className='duration-500 hover:text-yellow-400' href="/about/artist">The Artist</Link>
                </div>
                <div>
                <Link className='duration-500 hover:text-yellow-400' href="/about/webdev">The Web Developer</Link>
                </div>
                </div>

                <h1 className='text-2xl font-light mt-4'>Recent Updates</h1>
                <hr></hr>
                <div className='space-y-2 mt-2 text-lg font-light'>
                    <Link href={"/"}
                        className='duration-500 hover:text-yellow-400'>
                        Home
                    </Link>
                </div>
            </div>

            
           
            {/* Socials */}
            <div className='block justify-center py-8 sm:py-3 space-x-2'>

                {/* TODO: turn into absoulte form that pops up over the body of the html doc */}
                {/* Submit button */}
                <div className='flex justify-center mb-3'>
                    <button className='bg-gray-500 drop-shadow-2xl rounded-md text-gray-100 text-center font-light py-2 shadow-lg px-4 hover:bg-yellow-500 duration-500'>Hello</button>
                </div>

                {/* Social buttons */}
                <div className='text-center mb-2 mt-5'>
                    <h1 className='text-xl font-light'>Socials</h1>
                </div>

                {/* Buttons */}
                <div className='flex sm:grid sm:grid-cols-2 lg:flex justify-center space-x-2 sm:space-x-0 sm:gap-2 lg:space-x-2'>

                <div className='p-2 rounded-lg flex justify-center hover:bg-gray-300 hover:shadow-gray-500/80 transition-shadow-600 duration-500 hover:shadow-lg'>
                <Link href="https://www.instagram.com/alex_jove_art/?hl=en" target="_blank">
                <Image src={top} alt='' className='w-10 md:w-14 h-auto opacity-90' />
                <h1 className='text-center'>Art</h1>
                </Link>
                </div>

                <div className='p-2 rounded-lg flex justify-center hover:bg-gray-300 hover:shadow-gray-500/80 transition-shadow-600 duration-500 hover:shadow-lg'>
                <Link href="https://www.tiktok.com/@aj_mints?lang=en" target="_blank">
                <Image src={top} alt='' className='w-10 md:w-14 h-auto'/>
                <h1 className='text-center'>Art</h1>
                </Link>
                </div>
                
                <div className='p-2 rounded-lg flex justify-center hover:bg-gray-300 hover:shadow-gray-500/80 transition-shadow-600 duration-500 hover:shadow-lg '>
                <Link href='https://github.com/AJmints' target="_blank">
                <Image src={top} alt='' className=' w-10 md:w-14 h-auto mx-auto'/>
                <h1 className='text-center'>Web Dev</h1>
                </Link>
                </div>

                <div className='p-2 rounded-lg flex justify-center hover:bg-gray-300 hover:shadow-gray-500/80 transition-shadow-600 duration-500 hover:shadow-lg'>
                <Link href='https://www.linkedin.com/in/alexjovecode/' target="_blank">
                <Image src={top} alt='' className=' w-10 md:w-14 h-auto mx-auto'/>
                <h1 className='text-center'>Web Dev</h1>
                </Link>
                </div>

                </div>
            </div>
            </div>

            {/* Copyright and version updates */}
            <div className=" border-gray-500 border-t-2">
                <div>
                    <div className="flex justify-around items-center">
                        <p className='mt-2 lg:ml-10 text-gray-300'> <span>&copy;</span>2023 Totl.life v.0.3</p>
                        <div className="mt-2">
                            <div className="flex justify-center">
                            <Link href="https://www.alexjovestudios.com" target="_blank"><Image src={ajmints} alt='' className='w-12 top-0 sm:w-20 h-auto shadow-lg shadow-gray-900/90 rounded-md bg-gray-800 mx-auto' /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </footer>
    )
}