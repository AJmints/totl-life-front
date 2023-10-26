import git from '../../public/icons/github-mark.png'
import Link from 'next/link'
import Image from 'next/image'

export default function DappPage() {

    return (
        <div className=" mb-10 mx-2 lg:h-screen">
        <div className="flex flex-wrap">
            
            <div className="max-w-sm mx-auto mt-10 bg-gray-700/90 text-gray-300 p-4 rounded-md">
                <h1 className='text-2xl border-b-[1px] mx-2'>Coming updates to Totl.Life</h1>
                <ul className='mt-3 text-base space-y-2'>
                <li>-Save favorite bales for easy access</li>
                <li>-Share Bales you enjoy with a quick link</li>
                <li>-User Profile Pages</li>
                <li>-Search Bar and Filter options</li>
                <li>-Better Bale (Forum Post) display</li>
                <li>-Ability to click off a mobile menu and have the menu close</li>
                <li>-Have user settings active</li>
                <li>-Set up UPDATE, DELETE (CRUD) abilities on forum posts and user account stuff</li>
                <li>-Real and nice loading screens</li>
                </ul>
            </div>

            <div className="max-w-lg mx-auto mt-10 bg-gray-700/90 text-gray-300 p-4 rounded-md">
                <h1 className='text-2xl border-b-[1px] mb-5 mx-2'>Dev notes and open source contributions info.</h1>

                <div className='flex justify-around mb-5'>
                    <div className='py-2 px-3 rounded-lg flex justify-center bg-gray-300 hover:bg-gray-100 hover:shadow-gray-500/80 transition-shadow-600 duration-500 hover:shadow-lg'>
                    <Link href="https://github.com/AJmints/totl-life-front" target='_blank'>
                        <Image
                        src={git}
                        alt=''
                        className='w-10 md:w-11 h-auto mx-auto'
                        />
                        <p className='text-gray-800 text-base font-normal'>Front end repo</p>
                    </Link>
                    </div>
                    <div className='py-2 px-3 rounded-lg flex justify-center bg-gray-300 hover:bg-gray-100 hover:shadow-gray-500/80 transition-shadow-600 duration-500 hover:shadow-lg'>
                    <Link href="https://github.com/AJmints/totl-life-back" target='_blank'>
                        <Image
                        src={git}
                        alt=''
                        className='w-10 md:w-11 h-auto mx-auto'
                        />
                        <p className='text-gray-800 text-base text font-normal'>Back End Repo</p>
                    </Link>
                    </div>
                </div>

                <p>First, I want to apologize for the sinful amount of divs and :any that were used for the start of this project. Also the amount of useState drilling I have done all over the forum components. I am in the process of cleaning them up.</p><br/>
                <p>I am working on creating a list for anyone to jump into pick up various tasks to work on the project. There is an open invitation for anyone to contribute to this project, just reach out to us using the email address totl.lyfe@gmail.com or my personal email alexjmints@gmail.com. Totl is being built to be the best forum it can possibly be, with dreams to become something more. But if this is a project that is a nice portfolio piece for myself and others, then it is still a win in my book.</p><br/>
                <p>This project is very open ended and can become anything. For now, we are starting off as a forum, but depending on the other ideas and talent that come onto this project, we can turn into something greater!</p><br/>
                <p>Task list pending...</p>
            </div>
        </div>
         
        </div>
    )
}