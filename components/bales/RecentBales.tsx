import arrow from '../../public/icons/Arrow.png'
import comment from '../../public/icons/Comment.png'
import saveIcon from '../../public/icons/Save.png'
import options from '../../public/icons/options.png'
import share from '../../public/icons/share.png'
import userImg from '../../public/icons/profile-pic.png'
import Image from 'next/image'

export default function RecentBales(props: any) {

    const forumPostMock = {
        id: 1,
        parentLog: "Example",
        userName: "talkingDuck",
        userPic: userImg,
        upCount: 56,
        downCount: 5,
        commentCount: 29,
        saveCount:8,
        shareCount: 2,
        saved: false,
        title: "This is an example of a exciting title that is meant to brief and explain the subject.",
        preview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisiDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }

    return (
        <div className=" justify-between  block sm:flex rounded-md shadow-lg shadow-gray-800/80">
            <div className="bg-gray-700/70 sm:w-[70%] h-max p-0.5 rounded-t-md sm:rounded-t-none sm:rounded-tl-md sm:rounded-bl-md">
                {/* Main title container */}
                <div className="bg-gray-100/80 rounded-t-md">
                    <p className=' text-left ml-3 pt-1 font-normal text-sm'>log: {forumPostMock.parentLog}</p>
                    <p className="flex text-2xl sm:text-3xl xl:text-4xl xl:font-extralight px-3 font-light py-1">{forumPostMock.title}</p>
                </div>
                {/* Preview of comment container */}
                <div className="bg-gray-300/70 sm:rounded-br-none rounded-b-md text-xs p-1 ">
                    <p className=' text-sm xl:text-base font-light'>{forumPostMock.preview}</p>
                </div>
            </div>
            <div className="bg-gray-700/70 rounded-b-md sm:rounded-r-md sm:rounded-bl-none text-sm   flex items-center sm:block sm:w-[30%] p-0.5">
                {/* User Profile Picture container */}
                <div className=" p-4 w-[40%] sm:w-[100%] flex h-[50%] items-center justify-center rounded-bl-md sm:rounded-bl-none sm:rounded-tr-md sm:h-[50%] "> 
                    <div className="">
                        <Image 
                            src={userImg}
                            alt=''
                            width={90}
                            height={90}
                            className='w-16 mx-auto rounded-full'
                        />
                        <p className='text-gray-300'>user: {forumPostMock.userName}</p>
                    </div>
                </div>
                {/* Like and Comment and Option button */}
                <div className='w-[60%] sm:w-[100%] mr-2 block h-[50%]'>
                <div className="bg-gray-300/70 flex justify-around sm:justify-between items-center py-3 sm:py-0 sm:h-[50%] rounded-t-md sm:rounded-tl-none">
                    <div className=' items-center'>
                    <p className='font-normal text-xs'>{forumPostMock.upCount}</p>
                    <Image
                        src={arrow}
                        alt=""
                        className='cursor-pointer hover:shadow-lg hover:shadow-gray-600 w-8 -rotate-90 ml-1 bg-emerald-500/50 hover:bg-emerald-300/90 duration-200 rounded-full p-1'
                    />
                    </div>
                    <Image
                        src={comment}
                        alt=''
                        className='cursor-pointer hover:-my-1 hover:shadow-lg hover:shadow-gray-600 hover:w-10 w-7 mr-1 hover:p-2 duration-300 rounded-md'
                    />
                    <div>
                    <Image
                        src={saveIcon}
                        alt=''
                        className='cursor-pointer hover:-m-1 hover:shadow-lg hover:p-2 hover:rounded-md duration-300 hover:w-8 hover:mr-1 hover:shadow-gray-600 w-5 mr-3'
                    />
                    </div>
                </div>
                {/* Dislike and Share and Save button */}
                <div className="bg-gray-400/70 flex justify-around sm:justify-between items-center rounded-b-md sm:rounded-bl-none py-3 sm:py-0 sm:h-[50%]">
                    <div className='text-center'>
                    <Image
                        src={arrow}
                        alt=""
                        className='cursor-pointer hover:shadow-lg hover:shadow-gray-600 w-8 rotate-90 ml-1 hover:bg-emerald-900/80 duration-200 bg-emerald-800/50 rounded-full p-1'
                    />
                    <p className='font-normal text-xs'>{forumPostMock.downCount}</p>
                    </div>
                    <Image
                        src={share}
                        alt=''
                        className='cursor-pointer hover:shadow-lg hover:-m-0.5 hover:shadow-gray-600 hover:bg-gray-200/80 w-6 mr-2 hover:w-9 hover:p-1 duration-300 rounded-md'
                    />
                    <Image
                        src={options}
                        alt=''
                        className='cursor-pointer hover:shadow-lg hover:shadow-gray-600 h-8 mr-3 w-auto hover:mr-1 hover:-ml-2 rounded-md duration-300 p-2 hover:px-4 '
                    />
                </div>
                </div>
            </div>
        </div>
    )
}