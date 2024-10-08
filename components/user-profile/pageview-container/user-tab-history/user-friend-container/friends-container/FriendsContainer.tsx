'use client'

import Image from "next/image"
import userIcon from "@/public/icons/profile-pic.png"
import UnfriendButton from "../../../user-detail-header/buttons/UnfriendButton"
import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useUserContext } from "@/app/context/UserContextProvider"

const FriendsContainer = (props: any) => {

    const [statusDisplay, setStatusDisplay] = useState<string>("")
    const pathname = usePathname()
    const router = useRouter()

    const friendName = pathname?.split("/user/").pop()
    const { userName, userFriendList, setUserFriendList } = useUserContext()

    useEffect(() => {

        if (statusDisplay !== "") {
            const removeFriendFromList = userFriendList.filter(friend => friend.userName !== statusDisplay)
            console.log(removeFriendFromList)
            console.log(statusDisplay)
            setUserFriendList(removeFriendFromList)
        }
        
    }, [statusDisplay])

    const requestList = userFriendList.map((item: any) => {

        return (
            <div key={item.userName} className="bg-gray-400 p-2 rounded-md w-full lg:w-[50rem] xl:w-[60rem] h-auto lg:flex">
                
                <div className="flex my-2 h-24 w-full items-center justify-around">
                    <div className="bg-emerald-400 p-0 hover:p-2 hover:-m-2 duration-200 rounded-full cursor-pointer" onClick={() => router.push("/user/" + item.userName)}>
                    { item.pfp === null ?
                        <div>
                        <Image
                            src={userIcon}
                            alt=''
                            width={90}
                            height={90}
                            className='w-20 rounded-full'
                        /> 
                        </div>

                        :

                        <Image
                            src={'data:image/jpeg;base64,' + item.pfp.image}
                            alt=""
                            width={30}
                            height={30}
                            className="w-20 rounded-full"
                            
                        />
                    }
                    </div>

                    <div>
                    <p className=" font-semibold text-xl">Name:</p>
                    <p className=" font-semibold text-xl cursor-pointer hover:text-emerald-300 duration-200" onClick={() => router.push("/user/" + item.userName)}>{item.userName}</p>
                    </div>
                    <div className="text-gray-200">
                    {friendName === userName ? <UnfriendButton friendName={item.userName} userName={userName} setStatusDisplay={setStatusDisplay} callComponent={"userPage"}/> : <></> }
                </div>
                </div>
                
            
            </div>
        )
    })

    return (
        <>
            <div className="py-8 px-2 sm:px-4 bg-gray-300 rounded-md">
                <p className="text-gray-700 text-center text-xl font-bold mb-4">{friendName}&#39;s friends list</p>
                <div className="bg-gray-500 rounded-md px-2 py-5">
                {userFriendList.length === 0 ? 
                    <div className="mx-auto text-center py-10">
                        {userName === friendName ? <p className=" text-4xl font-normal text-gray-200">You dont&#39;t have any friends yet</p> : <p className=" text-4xl font-normal text-gray-200">{friendName} doesn&#39;t have any friends yet</p>}
                    </div>
                :
                    <div className="flex flex-col items-center gap-2">
                        {requestList}
                    </div>
                }
                </div>
            </div>
        </>
    )
}

export default FriendsContainer