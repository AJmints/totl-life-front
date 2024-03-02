import comment from '../../../../public/icons/Comment.png'
import Image from 'next/image'
import arrow from '../../../../public/icons/Arrow.png'
import userIcon from '../../../../public/icons/profile-pic.png'
import ShareLinkButton from '../buttons/bale-post-buttons/share/ShareLinkButton'
import BaleEditOptionButton from '../buttons/bale-post-buttons/edit-options/BaleEditOptionButton'
import FavoriteSaveButton from '../buttons/bale-post-buttons/favorite-save/FavoriteSaveButton'

const LoadingRecentBales = () => {
    

    return (
        <>
        <div className="hover:shadow-gray-400/60 mb-2 hover:shadow-md justify-between  block sm:flex rounded-md shadow-lg shadow-gray-800/80 duration-300"
        placeholder='blur'>
            
            {/* Text boxes of forum post title and body */}
            <div className="bg-gray-700/70 sm:w-[70%] max-h-min p-0.5 rounded-t-md sm:rounded-t-none sm:rounded-tl-md sm:rounded-bl-md">
                {/* Link to log where post lives */}
                <div className='flex'>
                    <p className='text-left font-normal text-sm cursor-pointer my-2 bg-gray-400 p-2 rounded-md hover:bg-emerald-500 duration-200'>log/loading...</p>
                </div>
                {/* Bale text preview */}
                <div className=' cursor-pointer'>
                {/* Main title container */}
                <div className="bg-gray-100/80 shadow-lg shadow-gray-900 py-5 rounded-t-md">
                    <p className="flex justify-center py-10 px-22 sm:px-24 md:px-32 xl:px-48 rounded-md bg-gray-50 mx-3 animate-pulse"></p>
                </div>
                {/* Preview of comment container */}
                <div className="bg-gray-300/70 sm:rounded-br-none pb-5 pt-5 rounded-b-md text-xs p-4 ">
                    <div className='py-6 px-22 sm:px-24 md:px-32 xl:px-48  rounded-md bg-gray-200 mx-3 animate-pulse'>
                        <div className='px-32'></div>
                    </div>
                </div>
                </div>
            </div>
            
            {/* User information, upvote, downvote, comment, save, share, and menu option container. */}
            <div className="bg-gray-700/70 rounded-b-md sm:rounded-r-md sm:rounded-bl-none text-sm   flex items-center sm:block sm:w-[30%] p-0.5">
                {/* User Profile Picture container */}
                <div className=" p-4 w-[40%] sm:w-[100%] flex h-[50%] items-center justify-center rounded-bl-md sm:rounded-bl-none sm:rounded-tr-md sm:h-[50%] "> 
                    <div className="">
                        <div>
                        <Image
                            src={userIcon}
                            alt=''
                            width={90}
                            height={90}
                            className='w-16 h-16 mx-auto rounded-full cursor-pointer'
                        /> 
                        </div>
                        <p className='text-gray-300'>t/loading...</p>
                    </div>   
                    </div>         
                {/* Like and Comment and Option button */}
                <div className='w-[60%] sm:w-[100%] mr-2 block h-[50%]'>
                <div className="bg-gray-300/70 flex justify-around sm:justify-between items-center py-3 sm:py-0 sm:h-[50%] rounded-t-md sm:rounded-tl-none">
                    
                    <div className='flex items-center'>
                        <p className='font-light text-xl mx-2'>0</p>
                        <Image
                        src={arrow}
                        alt=""
                        className='cursor-pointer hover:shadow-lg hover:shadow-gray-600 w-8 sm:w-10 -rotate-90 bg-emerald-500/50 hover:bg-emerald-400/90 duration-200 rounded-full p-1'
                        />
                    </div>

                    <div className='flex items-center hover:shadow-lg hover:shadow-gray-600 p-2 duration-300 rounded-md cursor-pointer hover:bg-gray-300/80'>
                    <p className='font-normal text-xs'></p>
                    <Image
                        src={comment}
                        alt=''
                        className='mx-1 w-6 sm:w-7'
                    />
                    </div>

                    <FavoriteSaveButton />
                </div>
                {/* Dislike and Share and Save button */}
                <div className="bg-gray-400/70 flex justify-around sm:justify-between items-center rounded-b-md sm:rounded-bl-none py-3 sm:py-0 sm:h-[50%]">
                    
                <div className='flex items-center'>
                        <p className='font-light text-xl mx-2'>0</p>
                        <Image
                        src={arrow}
                        alt=""
                        className='cursor-pointer hover:shadow-lg hover:shadow-gray-600 w-8 sm:w-10 rotate-90 bg-emerald-700/50 hover:bg-emerald-500/90 duration-200 rounded-full p-1'
                        />
                    </div>
                    
                    <ShareLinkButton />
                    
                    <BaleEditOptionButton />

                </div>
                </div>
            </div>

        </div>


        </>
    )
}

export default LoadingRecentBales