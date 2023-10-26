import arrow from '../../public/icons/Arrow.png'
import comment from '../../public/icons/Comment.png'
import saveIcon from '../../public/icons/Save.png'
import options from '../../public/icons/options.png'
import share from '../../public/icons/share.png'
import userImg from '../../public/icons/profile-pic.png'
import Image from 'next/image'
import userIcon from '../../public/icons/profile-pic.png'
import { useState } from 'react'
import ViewBaleComments from './ViewBaleComments'

let USER_ID: string
const URL = process.env.NEXT_PUBLIC_BACKEND_URL
export const authCheck = async() => {
    const infoCall = await fetch("/api/authCheck")
    const status = await infoCall.json().catch((err) => {
        console.log(err)
    })
    if (status.loggedIn) {
        USER_ID = status.id
        return status.loggedIn
    }
}
export const token = async() => {
    const getToken = await fetch("/api/headers")
    const status = await getToken.json().catch((err) => {
        console.log(err)
    })
    return status
}

export default function RecentBales(props: any) {
    const viewBale = props.mappingBale
    // const [quickCommentToggle, setQuickCommentToggle] = useState<boolean>(false)
    const [detailView, setDetailView] = useState<boolean>(false)
    const [upCount, setUpCount] = useState<number>(viewBale.upVoteCount)
    const [downCount, setDownCount] = useState<number>(viewBale.downVoteCount)

    const userViewOptions = () => {
        console.log("View this users information and link to their profile")
    }

    const upVote = async() => {
        const userPresent = await authCheck()
        if (!userPresent) {
            console.log("Not logged in")
            return
        }

        const data = {
            userId: USER_ID,
            baleId: viewBale.id
        }

        const postUpVote = await fetch( URL + "/logs/upvote-post", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "auth-token": "Bearer " + await token()
            },
            body: JSON.stringify(data)
        })
        const response = await postUpVote.json().catch((err) => {
            USER_ID = ""
            console.log(err)
        })
        if (response.status === "success") {
            if (response.response === "inc") {
                setUpCount(prev => prev + 1)
            } else if (response.response === "dec") {
                setUpCount(prev => prev -1)
            } else if (response.response === "inc-dec") {
                setUpCount(prev => prev + 1)
                setDownCount(prev => prev - 1)
            }
            USER_ID = ""
            return
        }
        USER_ID = ""

    }

    const downVote = async() => {
        const userPresent = await authCheck()
        if (!userPresent) {
            console.log("Not logged in")
            return
        }
        const data = {
            userId: USER_ID,
            baleId: viewBale.id
        }
        const postUpVote = await fetch( URL + "/logs/downvote-post", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "auth-token": "Bearer " + await token()
            },
            body: JSON.stringify(data)
        })
        const response = await postUpVote.json().catch((err) => {
            USER_ID = ""
            console.log(err)
        })
        if (response.status === "success") {
            if (response.response === "inc") {
                setDownCount(prev => prev + 1)
            } else if (response.response === "dec") {
                setDownCount(prev => prev -1)
            } else if (response.response === "inc-dec") {
                setDownCount(prev => prev + 1)
                setUpCount(prev => prev - 1)
            }
            USER_ID = ""
            return
        }
        USER_ID = ""
    }

    const addFavorite = async() => {
        console.log("add to favorite")
    }

    const shareBale = async() => {
        console.log("share details")
    }

    const baleMenuOption = () => {
        console.log("menu options")
    }
    
    const forumPostMock = {
        id: 1,
        parentLog: "Example",
        userName: "talkingDuck",
        userPic: userImg,
        upCount: 0,
        downCount: 0,
        commentCount: 29,
        saveCount:8,
        shareCount: 2,
        saved: false,
        title: "This is an example of a exciting title that is meant to brief and explain the subject.",
        preview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisiDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }

    return (
        <>
        <div className=" justify-between  block sm:flex rounded-md shadow-lg shadow-gray-800/80 duration-300">
            
            {/* Text boxes of forum post title and body */}
            <div className="bg-gray-700/70 sm:w-[70%] max-h-min p-0.5 rounded-t-md sm:rounded-t-none sm:rounded-tl-md sm:rounded-bl-md cursor-pointer"
            onClick={() => setDetailView(prev => !prev)}>
                {/* Main title container */}
                <div className="bg-gray-100/80 shadow-lg shadow-gray-900 pb-5 rounded-t-md">
                    <p className=' text-left ml-3 pt-1 font-normal text-sm'>log/{viewBale.parentLog}</p>
                    <p className="flex text-2xl justify-center sm:text-3xl xl:text-4xl xl:font-extralight px-3 font-light py-1">{viewBale.title}</p>
                </div>
                {/* Preview of comment container */}
                <div className="bg-gray-300/70 sm:rounded-br-none pb-5 pt-5 rounded-b-md text-xs p-4 ">
                    <p className=' text-sm xl:text-base text-left font-light'>{viewBale.body}</p>
                </div>
            </div>
            
            {/* User information, upvote, downvote, comment, save, share, and menu option container. */}
            <div className="bg-gray-700/70 rounded-b-md sm:rounded-r-md sm:rounded-bl-none text-sm   flex items-center sm:block sm:w-[30%] p-0.5">
                {/* User Profile Picture container */}
                <div className=" p-4 w-[40%] sm:w-[100%] flex h-[50%] items-center justify-center rounded-bl-md sm:rounded-bl-none sm:rounded-tr-md sm:h-[50%] "> 
                    <div className="">
                        {  viewBale.userPFP === "" ? 
                        <div>
                        <Image
                            src={userIcon}
                            alt=''
                            width={90}
                            height={90}
                            className='w-16 mx-auto rounded-full cursor-pointer'
                            onClick={() => userViewOptions()}
                        /> 
                        </div>
                        : 
                        <Image 
                            key={viewBale?.id}
                            src={'data:image/jpeg;base64,' + viewBale.userPFP}
                            alt=''
                            width={90}
                            height={90}
                            className='w-16 mx-auto rounded-full cursor-pointer'
                            onClick={() => userViewOptions()}
                        />
                        }
                        <p className='text-gray-300'>user/{viewBale.userName}</p>
                    </div>   
                    </div>         
                {/* Like and Comment and Option button */}
                <div className='w-[60%] sm:w-[100%] mr-2 block h-[50%]'>
                <div className="bg-gray-300/70 flex justify-around sm:justify-between items-center py-3 sm:py-0 sm:h-[50%] rounded-t-md sm:rounded-tl-none">
                    <div className=' items-center'>
                    <p className='font-normal text-xs'>{upCount}</p>
                    <Image
                        src={arrow}
                        alt=""
                        className='cursor-pointer hover:shadow-lg hover:shadow-gray-600 w-8 -rotate-90 ml-1 bg-emerald-500/50 hover:bg-emerald-400/90 duration-200 rounded-full p-1'
                        onClick={() => upVote()}
                    />
                    </div>
                    <div className=''>
                    <p className='font-normal text-xs mb-1'>{viewBale.commentCount}</p>
                    <Image
                        src={comment}
                        alt=''
                        className='cursor-pointer mx-auto hover:-my-1 hover:shadow-lg hover:shadow-gray-600 hover:bg-gray-300/80 hover:w-10 w-7 mr-1 hover:p-2 duration-300 rounded-md'
                        onClick={() => setDetailView(prev => !prev)}
                    />
                    </div>
                    <div className='block'>
                    <p className='font-normal mr-3 text-xs mb-1'>{viewBale.saveCount}</p>
                    <Image
                        src={saveIcon}
                        alt=''
                        className='cursor-pointer hover:-m-1 hover:shadow-lg hover:p-2 hover:rounded-md duration-300 hover:bg-red-500/80  hover:w-8 hover:mr-1 hover:shadow-gray-600 w-5 mr-3'
                        onClick={() => addFavorite()}
                    />
                    </div>
                </div>
                {/* Dislike and Share and Save button */}
                <div className="bg-gray-400/70 flex justify-around sm:justify-between items-center rounded-b-md sm:rounded-bl-none py-3 sm:py-0 sm:h-[50%]">
                    <div className='text-center'>
                    <Image
                        src={arrow}
                        alt=""
                        className='cursor-pointer hover:shadow-lg hover:shadow-gray-500 w-8 rotate-90 ml-1  hover:bg-emerald-700/80 duration-200 bg-emerald-900/50 rounded-full p-1'
                        onClick={() => downVote()}
                    />
                    <p className='font-normal text-xs'>{downCount}</p>
                    </div>
                    <Image
                        src={share}
                        alt=''
                        className='cursor-pointer hover:shadow-lg hover:-m-0.5 hover:shadow-gray-600 hover:bg-red-500/80 w-6 mr-2 hover:w-9 hover:p-1 duration-300 rounded-md'
                        onClick={() => shareBale()}
                    />
                    <Image
                        src={options}
                        alt=''
                        className='cursor-pointer hover:shadow-lg hover:shadow-gray-600 h-8 mr-3 hover:bg-red-500/80  w-auto hover:mr-1 hover:-ml-2 rounded-md duration-300 p-2 hover:px-4 '
                        onClick={() => baleMenuOption()}
                    />
                </div>
                </div>
            </div>

        </div>

        {/* View the selected posts comments and main post text */}
        {detailView ? 
        <div className='fixed z-40 sm:left-[10%] sm:right-[10%] sm:top-[10%] sm:bottom-[10%] left-[2%] right-[2%] top-[8%]'>
        <ViewBaleComments
            baleInfo={viewBale}
            setDetailView={setDetailView}
        />
        </div>
        :
        <></>
        }

        </>
    )
}