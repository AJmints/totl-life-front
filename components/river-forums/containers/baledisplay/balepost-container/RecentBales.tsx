import comment from '../../../../../public/icons/Comment.png'
import Image from 'next/image'
import userIcon from '../../../../..//public/icons/profile-pic.png'
import { useState } from 'react'
import ViewBaleComments from './balecomment/ViewBaleComments'
import { useRouter } from 'next/navigation'
import { useUserContext } from '@/app/context/UserContextProvider'
import UpVoteButton from '../../buttons/bale-post-buttons/upvote/UpVoteButton'
import DownCountButton from '../../buttons/bale-post-buttons/downvote/DownVoteButton'
import ShareLinkButton from '../../buttons/bale-post-buttons/share/ShareLinkButton'
import FavoriteSaveButton from '../../buttons/bale-post-buttons/favorite-save/FavoriteSaveButton'
import BaleEditOptionButton from '../../buttons/bale-post-buttons/edit-options/BaleEditOptionButton'

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

    const { userName } = useUserContext()
    const router = useRouter()

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
                <div className=' cursor-pointer' onClick={() => router.push("/river/" + viewBale.parentLog + "/" + viewBale.title.replace("?", "").split(" ").join("") + "totl?baleid=" + viewBale.id)}>
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
                        {  viewBale.userPFP === null ? 
                        <div>
                        <Image
                            src={userIcon}
                            alt=''
                            width={90}
                            height={90}
                            className='w-16 h-16 mx-auto rounded-full cursor-pointer'
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
                            className='w-16 h-16 mx-auto rounded-full cursor-pointer'
                            onClick={() => router.push("/user/" + viewBale.userName)}
                        />
                        }
                        <p className='text-gray-300'>t/{viewBale.userName}</p>
                    </div>   
                    </div>         
                {/* Like and Comment and Option button */}
                <div className='w-[60%] sm:w-[100%] mr-2 block h-[50%]'>
                <div className="bg-gray-300/70 flex justify-around sm:justify-between items-center py-3 sm:py-0 sm:h-[50%] rounded-t-md sm:rounded-tl-none">
                    <UpVoteButton
                    id={viewBale?.id}
                    setUpCount={setUpCount}
                    setDownCount={setDownCount}
                    upCount={upCount}
                    />

                    <div className='flex items-center hover:shadow-lg hover:shadow-gray-600 p-2 duration-300 rounded-md cursor-pointer hover:bg-gray-300/80' onClick={() => router.push("/river/" + viewBale.parentLog + "/" + viewBale.title.replace("?", "").split(" ").join("") + "totl?baleid=" + viewBale.id)}>
                    <p className='font-normal text-xs'>{viewBale.commentCount}</p>
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
                    
                    <DownCountButton
                    id={viewBale.id}
                    setUpCount={setUpCount}
                    setDownCount={setDownCount}
                    downCount={downCount}
                    />
                    
                    <ShareLinkButton 
                    shareFromPreview={viewBale.parentLog + "/" + viewBale.title.replace("?", "").split(" ").join("") + "totl?baleid=" + viewBale.id}
                    />
                    
                    <BaleEditOptionButton 
                    baleId={viewBale.id}
                    redirect={true}
                    isActive={viewBale.userName === userName}
                    pageRedirect={viewBale.parentLog + "/" + viewBale.title.replace("?", "").split(" ").join("") + "totl?baleid=" + viewBale.id}
                    type={"bale"}
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