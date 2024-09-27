'use client'

import { useState } from "react"
import { usePathname } from "next/navigation"
import { useUserContext } from "@/app/context/UserContextProvider"
import FriendsContainer from "./friends-container/FriendsContainer"
import FriendRequestContainer from "./friend-requests-container/FriendRequestContainer"
import FollowContainer from "./follow-container/FollowContainer"

const UserFriendContainer = () => {

    const [ tab, setTab ] = useState<"friends" | "requests" | "follow">("friends")

    const pathname = usePathname()

    const { userName } = useUserContext()

    const friendName = pathname?.split("/user/").pop()

    const handleTab = async(name:any) => {

        switch(name) {
            case "friends":
                setTab(name)
                break
            case "requests":
                setTab(name)
                break
            case "follow":
                setTab(name)
                break
            default:
                setTab("friends")
                break
        }
    }

    return (

        <>
        
        <div className="flex">
                    <div className="grid grid-cols-3 gap-2 md:flex text-sm md:space-x-2 bg-gray-400 p-1 rounded-md">
                        { friendName === userName && <button className="bg-gray-500 p-1 rounded-md hover:bg-emerald-500 duration-300 shadow-md" onClick={() => handleTab("requests")}>Requests</button>}
                        <button className="bg-gray-500 p-1 rounded-md hover:bg-emerald-500 duration-300 shadow-md" onClick={() => handleTab("friends")}>Friends</button>
                        <button className="bg-gray-500 p-1 rounded-md hover:bg-emerald-500 duration-300 shadow-md" onClick={() => handleTab("follow")}>Following</button>
                    </div>
                </div>
                <div className=" p-2 bg-gray-500 rounded-md rounded-tl-none">

                { tab === "friends" && <FriendsContainer /> }
                { tab === "requests" && friendName === userName && <FriendRequestContainer /> }
                { tab === "follow" && <FollowContainer /> }
            </div>

        </>
    )
}

export default UserFriendContainer