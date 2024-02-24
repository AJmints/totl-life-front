import arrow from '../../../../../public/icons/Arrow.png'
import comment from '../../../../../public/icons/Comment.png'
import saveIcon from '../../../../../public/icons/Save.png'
import options from '../../../../../public/icons/options.png'
import share from '../../../../../public/icons/share.png'
import Image from 'next/image'
import userIcon from '../../../../..//public/icons/profile-pic.png'
import { useState } from 'react'
import ViewBaleComments from './balecomment/ViewBaleComments'
import { useRouter } from 'next/navigation'

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

type ResponseUpDownVote = {
    status: "success" | "failed"
    response: "inc" | "dec" | "inc-dec" | "This bale does not exist."
}
type BaleDetails = {
    body: string,
    commentCount: number,
    downVoteCount: number,
    id: number,
    parentLog: string,
    saveCount: number,
    title: string,
    upVoteCount: number,
    userName: string,
    userPFP: any,
}
type RecentBalesProps = {
    mappingBale: BaleDetails
}

export default function RecentBales(props: RecentBalesProps) {
    const viewBale: BaleDetails = props.mappingBale
    const [detailView, setDetailView] = useState<boolean>(false)
    const [upCount, setUpCount] = useState<number>(viewBale.upVoteCount)
    const [downCount, setDownCount] = useState<number>(viewBale.downVoteCount)

    const router = useRouter()

    const upVote = async() => {
        const userPresent = await authCheck()
        if (!userPresent) {
            console.log("Not logged in")
            return
        }

        const data: Object = {
            userId: USER_ID,
            baleId: viewBale.id
        }

        const postUpVote: Response = await fetch( URL + "/logs/upvote-post", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "auth-token": "Bearer " + await token()
            },
            body: JSON.stringify(data)
        })
        const response: ResponseUpDownVote = await postUpVote.json().catch((err) => {
            USER_ID = ""
            console.log(err)
        })
        switch (response.response) {
            case "inc":
                setUpCount(prev => prev + 1)
                break
            case "dec":
                setUpCount(prev => prev -1)
                break
            case "inc-dec":
                setUpCount(prev => prev + 1)
                setDownCount(prev => prev - 1)
                break
            case "This bale does not exist.":
                break
        }
        return

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
        const postUpVote: Response = await fetch( URL + "/logs/downvote-post", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "auth-token": "Bearer " + await token()
            },
            body: JSON.stringify(data)
        })
        USER_ID = ""
        const response: ResponseUpDownVote = await postUpVote.json().catch((err) => {
            console.log(err)
        })
        switch (response.response) {
            case "inc":
                setDownCount(prev => prev + 1)
                break
            case "dec":
                setDownCount(prev => prev -1)
                break
            case "inc-dec":
                setDownCount(prev => prev + 1)
                setUpCount(prev => prev - 1)
                break
            case "This bale does not exist.":
                break
        }
        return
    }

    const addFavorite = async() => {
        console.log("add favorites")
    }

    const shareBale = async() => {
        console.log("share details")
    }

    const baleMenuOption = () => {
        console.log("menu options")
    }

    return (
        <>
        <div className="hover:shadow-gray-400/60 hover:shadow-md justify-between  block sm:flex rounded-md shadow-lg shadow-gray-800/80 duration-300"
        placeholder='blur'>
            
            {/* Text boxes of forum post title and body */}
            <div className="bg-gray-700/70 sm:w-[70%] max-h-min p-0.5 rounded-t-md sm:rounded-t-none sm:rounded-tl-md sm:rounded-bl-md">
                {/* Link to log where post lives */}
                <div className='flex'>
                    <p className='text-left font-normal text-sm cursor-pointer my-2 bg-gray-400 p-2 rounded-md hover:bg-emerald-500 duration-200' onClick={() => router.push("/river/" + viewBale.parentLog)}>log/{viewBale.parentLog}</p>
                </div>
                {/* Bale text preview */}
                <div className=' cursor-pointer' onClick={() => router.push("/river/" + viewBale.parentLog + "/" + viewBale.title.split(" ").join("") + "?baleid=" + viewBale.id)}>
                {/* Main title container */}
                <div className="bg-gray-100/80 shadow-lg shadow-gray-900 py-5 rounded-t-md">
                    <p className="flex text-2xl justify-center sm:text-3xl xl:text-4xl xl:font-extralight px-3 font-light py-1">{viewBale.title}</p>
                </div>
                {/* Preview of comment container */}
                <div className="bg-gray-300/70 sm:rounded-br-none pb-5 pt-5 rounded-b-md text-xs p-4 ">
                    <p className=' text-sm xl:text-base text-left font-light'>{viewBale.body}</p>
                </div>
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
                            onClick={() => router.push("/user/" + viewBale.userName)}
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
                            onClick={() => router.push("/user/" + viewBale.userName)}
                        />
                        }
                        <p className='text-gray-300'>user/{viewBale.userName}</p>
                    </div>   
                    </div>         
                {/* Like and Comment and Option button */}
                <div className='w-[60%] sm:w-[100%] mr-2 block h-[50%]'>
                <div className="bg-gray-300/70 flex justify-around sm:justify-between items-center py-3 sm:py-0 sm:h-[50%] rounded-t-md sm:rounded-tl-none">
                    <div className='text-center pt-1 pb-2'>
                    <p className='font-normal text-xs'>{upCount}</p>
                    <Image
                        src={arrow}
                        alt=""
                        className='cursor-pointer hover:shadow-lg hover:shadow-gray-600 w-8 -rotate-90 ml-1 bg-emerald-500/50 hover:bg-emerald-400/90 duration-200 rounded-full p-1'
                        onClick={() => upVote()}
                    />
                    </div>
                    <div className='text-center pt-1 pb-2'>
                    <p className='font-normal text-xs mb-1'>{viewBale.commentCount}</p>
                    <Image
                        src={comment}
                        alt=''
                        className='cursor-pointer mx-auto hover:-my-1 hover:shadow-lg hover:shadow-gray-600 hover:bg-gray-300/80 hover:w-10 w-7 mr-1 hover:p-2 duration-300 rounded-md'
                        onClick={() => router.push("/river/" + viewBale.parentLog + "/" + viewBale.title.split(" ").join("") + "?baleid=" + viewBale.id)}
                    />
                    </div>
                    <div className='text-center pt-1 pb-2'>
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