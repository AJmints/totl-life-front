import river from '../../public/images/tutlelog.jpg'
import Image from 'next/image'
import Link from 'next/link'

const LandingBase = (props: any) => {

    return (
        <div className='mt-10'>
            <div>
                <div className="mx-5 text-center">
                <h1 className="text-2xl sm:text-4xl xl:text-6xl font-serif text-gray-100">Welcome to</h1>
                <h1 className="text-[4rem] sm:text-[7rem] lg:text-[10rem] xl:text-[13rem] font-serif text-gray-100 border-b-2">Totl.Life</h1>
                </div>
                <div className='flex justify-center mt-5'>
                <div className='mx-2 rounded-md p-2 bg-gray-700/80 shadow-lg shadow-gray-900/90'>
                    <Image
                    src={river}
                    alt=''
                    className='w-72 sm:w-[27rem] h-auto rounded-md shadow-lg'
                    />
                </div>
                </div>
            </div>

            <div className='flex mx-5 justify-center font-light mt-5'>
                <div className='bg-gray-700/80 p-3 rounded-md shadow-lg shadow-gray-900/70 max-w-4xl'>
                    <h1 className='text-7xl font-serif text-center text-gray-300'>POV</h1>
                    <p className='md:text-2xl text-center text-gray-300'>You are a turtle and you are floating down a river. <br/><br/></p>
                    <p className='md:text-2xl text-gray-300'>
                    While you are floating down the river, you see a log. This log looks easy to climb on and the sun is hitting it just right. There are some other turtles on this log, and they look friendly. You have joined this bale of turtles on a log and enjoy silly conversation before you decide to go on your way.</p><br/>
                    <p className='text-center md:text-2xl text-gray-300'>
                    Totl = Turtle on the log</p>
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
                <Link href="https://discord.com/invite/5tpGNSmj?fbclid=IwAR0TI7XDe5RKSECtesS4CncRuqfK3X6svQu1YW2wfhoIyXPiOOXiMFlr5Eo" target='_blank'>
                    <Image
                    src={props.discord}
                    alt=''
                    className='w-12 bg-gray-100 px-1 py-2 rounded-md my-2 h-auto shadow-lg shadow-gray-800/90 hover:w-16 hover:my-0 duration-300'
                    />
                </Link>
                </div>
            </div>
            </div>

            <div className='mt-10'>
                <h1 className='text-gray-200 text-center text-4xl sm:text-7xl font-serif border-b-2 mx-5 mb-5'>Introduction</h1>
                <div className='flex flex-wrap gap-5 justify-center mx-10'>
                    <div className='bg-gray-700/80 p-3 rounded-md text-gray-300 text-base sm:text-xl'>
                    <h1 className='text-4xl border-b-[1px] font-serif mb-3'>What are logs?</h1>
                    <p>Logs are the forums of Totl.life</p>
                    <p>We take inspiration from the reddit format, were logs are equivalent to subreddits. Since we are all turtles, we need a log.</p>
                    </div>
                    <div className='bg-gray-700/80 p-3 rounded-md text-gray-300 text-base sm:text-xl'>
                    <h1 className='text-4xl border-b-[1px] font-serif mb-3'>What are bales?</h1>
                    <p>Bales are the forum posts of Totl.life</p>
                    <p>A bale is a group of turtles. When you post in a bale, you have joined the group and are a part of a bale. Since we are all turtles, we need a group.</p>
                    </div>
                    <div className='bg-gray-700/80 p-3 rounded-md text-gray-300 text-base sm:text-xl'>
                    <h1 className='text-4xl border-b-[1px] font-serif mb-3'>Why participate in Totl.life?</h1>
                    <p>We are just having fun and want to create a community with like minded Totlers</p><br/>
                    <p>In the summer of 2023, a friend group went down the Current River in Missouri and floated. Not an unusual activity in MO. In fact, this is a very popular recreation for many Missourians and beyond! They were goofin, and floating, and having a good time when a few of the friends of this group started dreaming of giving back to the river that gives such fond memories and a place that is truely serene. That is when the idea of Totl was born. This idea has manifested into a forum website with dreams to grow beyond a project of a new web developer.</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default LandingBase