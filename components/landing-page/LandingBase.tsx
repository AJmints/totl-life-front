import river from '../../public/images/tutlelog.jpg'
import Image from 'next/image'
import Link from 'next/link'
import git from '../../public/icons/github-mark.png'

const LandingBase = (props: any) => {

    return (
        <div className='mt-10'>
            
            <div>
                <div className="mx-5 text-center">
                <h1 className="text-2xl sm:text-4xl xl:text-6xl font-serif text-gray-100">Welcome to</h1>
                <h1 className="text-[4rem] sm:text-[6rem] lg:text-[10rem] font-serif text-gray-100 border-b-2">Totl.Life</h1>
                </div>
                <div className='flex justify-center mt-5'>
                <div>
                <h1 className='text-center text-3xl font-serif text-gray-300  px-2 rounded-md shadow-md shadow-gray-900/70 bg-gray-700/80 mb-2'>Jump into the forums!</h1>
                <div className='flex justify-center'>
                <Link className='mx-auto text-3xl font-bold text-gray-800 bg-yellow-500 py-1 px-2 rounded-md shadow-md shadow-gray-900/70 hover:bg-yellow-400 duration-300 hover:text-emerald-700 hover:shadow-emerald-600' href={"/river"}>Visit River</Link>
                </div>
                </div>
            </div>
                <div className='flex justify-center mt-5'>
                <div className='mx-2 rounded-md p-2 bg-gray-700/80 shadow-lg shadow-gray-900/90'>
                    <Image
                    src={river}
                    alt=''
                    className='w-72 sm:w-[24rem] h-auto rounded-md shadow-lg'
                    />
                </div>
                </div>
            </div>

            <div>
            <div className='flex justify-center space-x-5'>
                <div>
                <Link href="https://www.instagram.com/totl.life/" target='_blank'>
                    <Image
                    src={props.insta}
                    alt=''
                    className='w-12 bg-gray-100 p-1 rounded-md my-2 h-auto shadow-lg shadow-gray-800/90 hover:w-16 hover:my-0 duration-300'
                    />
                </Link>
                </div>
                <div>
                <Link href="https://discord.gg/tYkVXkPYbx" target='_blank'>
                    <Image
                    src={props.discord}
                    alt=''
                    className='w-12 bg-gray-100 px-1 py-2 rounded-md my-2 h-auto shadow-lg shadow-gray-800/90 hover:w-16 hover:my-0 duration-300'
                    />
                </Link>
                </div>
                <div>
                <Link href="https://github.com/AJmints" target='_blank'>
                    <Image
                    src={git}
                    alt=''
                    className='w-12 bg-gray-100 px-1 py-1 rounded-md my-2 h-auto shadow-lg shadow-gray-800/90 hover:w-16 hover:my-0 duration-300'
                    />
                </Link>
                </div>
            </div>
            </div>

            <div className='flex mx-5 justify-center font-light mt-2 pb-10'>
                <div className='bg-gray-700/80 p-3 rounded-md shadow-lg shadow-gray-900/70 max-w-4xl'>
                    <h1 className='text-7xl font-serif text-center text-gray-300'>POV</h1>
                    <p className='md:text-2xl text-center text-gray-300'>You are a turtle and you are floating down a river. <br/><br/></p>
                    <p className='md:text-2xl text-gray-300'>
                    While you are floating down the river, you see a log. This log looks easy to climb on and the sun is hitting it just right. There are some other turtles on this log, and they look friendly. You have joined this bale of turtles on a log and enjoy a little conversation before you decide to go on your way.</p><br/>
                    <p className='text-center md:text-2xl text-gray-300'>
                    Totl = Turtle on the log</p>
                </div>
            </div>

            

        </div>
    )
}

export default LandingBase