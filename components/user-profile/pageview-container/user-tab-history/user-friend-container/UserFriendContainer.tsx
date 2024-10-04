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

    const [turtleRequestList, setTurtleRequestList] = useState<any[]>([])

    const pathname = usePathname()

    const { userID, userName, setUserFriendList, userFriendList, setUserTurtleRequestList, userTurtleRequestList } = useUserContext()

    const friendName = pathname?.split("/user/").pop()

    useEffect(() => {

        const getFriendsLists = async(string: string) => {

            const list = await fetch( URL + "/social/user-friend-list/" + friendName +"/" + string , {
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

                setUserTurtleRequestList(response.turtleRequest)
                setUserFriendList(response.friendList)

            } else if (response.turtleRequest === null) {

                setUserFriendList(response.friendList)
            
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
                        { userTurtleRequestList.length !== 0 &&
                        <div className="p-1 absolute -mt-5 ml-14">
                            <div className="absolute p-0.5 px-2 rounded-full bg-emerald-400">
                                <p className="text-gray-50 font-bold">{userTurtleRequestList.length}</p>
                            </div>
                        </div>
                        }
                        <button className="bg-gray-500 p-1 rounded-md hover:bg-emerald-500 duration-300 shadow-md" onClick={() => handleTab("requests")}>Requests</button>
                        </>
                        }
                        <button className="bg-gray-500 p-1 rounded-md hover:bg-emerald-500 duration-300 shadow-md" onClick={() => handleTab("friends")}>Friends</button>
                        {/* <button className="bg-gray-500 p-1 rounded-md hover:bg-emerald-500 duration-300 shadow-md" onClick={() => handleTab("follow")}>Following</button> */}
                    </div>
                </div>
                <div className=" p-2 bg-gray-500 rounded-md rounded-tl-none">

                { tab === "friends" && <FriendsContainer friendList={userFriendList} setFriendList={setUserFriendList}/> }
                { tab === "requests" && friendName === userName && <FriendRequestContainer setTurtleRequestList={setTurtleRequestList} turtleRequestList={turtleRequestList} /> }
                {/* { tab === "follow" && <FollowContainer /> } */}
            </div>

        </>
    )
}

export default UserFriendContainer