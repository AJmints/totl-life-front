'use client'

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { useUserContext } from "@/app/context/UserContextProvider"
import FriendsContainer from "./friends-container/FriendsContainer"
import FriendRequestContainer from "./friend-requests-container/FriendRequestContainer"
import FollowContainer from "./follow-container/FollowContainer"
import { token } from "@/lib/constants/getToken"
import {URL} from "@/lib/globalConstants"

const UserFriendContainer = () => {

    const [ tab, setTab ] = useState<"friends" | "requests" | "follow">("friends")
    const testArr = [1,2,3,4,5,6,7]
    const [friendList, setFriendList] = useState<any[]>([])
    const [turtleRequestList, setTurtleRequestList] = useState<any[]>([])

    const pathname = usePathname()

    const { userID, userName } = useUserContext()

    const friendName = pathname?.split("/user/").pop()

    useEffect(() => {
        // Make a call for friendlist and friend request related to user.
        // Make api route that returns 2 lists and specific dtos. 
        // 1st dto, friend request with username, friendname, userid, profilepic

        const getFriendsLists = async(string: string) => {

            const list = await fetch(URL + "/social/user-friend-list/" + userID +"/" + string , {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "Bearer " + await token()
                }
            })
            const response = await list.json().catch((err) => {
                console.log(err.message)
            })
            if (response.turtleRequest !== null) {
                setTurtleRequestList(response.turtleRequest)
                // const removeItem = userPackConfigs.filter(packConfig => packConfig.id !== props.packConfig)
                // setUserPackConfigs(removeItem)
                console.log(response)    
            }
            
        }
        
        if (userName === friendName) {
            getFriendsLists("1")
        } else {
            getFriendsLists("2")
        }
        
    }, [])

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
                        { friendName === userName && 
                        <>
                        <div className="p-1 absolute -mt-5 ml-14">
                            <div className="absolute p-0.5 px-2 rounded-full bg-emerald-400">
                                <p className="text-gray-50 font-bold">{turtleRequestList.length}</p>
                            </div>
                        </div>
                        <button className="bg-gray-500 p-1 rounded-md hover:bg-emerald-500 duration-300 shadow-md" onClick={() => handleTab("requests")}>Requests</button>
                        </>
                        }
                        <button className="bg-gray-500 p-1 rounded-md hover:bg-emerald-500 duration-300 shadow-md" onClick={() => handleTab("friends")}>Friends</button>
                        <button className="bg-gray-500 p-1 rounded-md hover:bg-emerald-500 duration-300 shadow-md" onClick={() => handleTab("follow")}>Following</button>
                    </div>
                </div>
                <div className=" p-2 bg-gray-500 rounded-md rounded-tl-none">

                { tab === "friends" && <FriendsContainer /> }
                { tab === "requests" && friendName === userName && <FriendRequestContainer setTurtleRequestList={setTurtleRequestList} turtleRequestList={turtleRequestList} /> }
                { tab === "follow" && <FollowContainer /> }
            </div>

        </>
    )
}

export default UserFriendContainer