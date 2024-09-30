'use client'

import AddTurtleButton from "./buttons/AddTurtleButton"
import { usePathname } from 'next/navigation'
import { useUserContext } from '@/app/context/UserContextProvider'
import { useEffect, useState, useRef, useContext } from 'react'
import { URL } from '@/lib/globalConstants'
import CancelRequestButton from "./buttons/CancelRequestButton"
import AcceptDeclineButton from "./buttons/AcceptDeclineButton"
import { token } from "@/lib/constants/getToken"
import UnfriendButton from "./buttons/UnfriendButton"

const RelationContainer = () => {

    const [loading, setLoading] = useState<boolean>(false)
    const [statusDisplay, setStatusDisplay] = useState<string>("")
    const [requester, setRequester] = useState<string>("")

    const pathname = usePathname()

    const { userID, userName } = useUserContext()

    const friendName = pathname?.split("/user/").pop()

    useEffect(() => {

        const doesRequestExist = async() => {
            const create = await fetch(URL + "/social/request-status/" + userID + "/" + friendName)
            const response = await create.json().catch((err) => {
                console.log(err.message)
            })
            if (response.status === "success") { // status = added, denied, pending, canceled, friend,  
                
                if ( response.response === undefined ) {
                    setStatusDisplay(response.requestStatus)
                    setRequester(response.requester)
                } else if ( response.response === "empty"){
                    setStatusDisplay(response.response)
                }
                
                
                setLoading(false)
            }
            // console.log(response)
            
        }

        
        
        if (userID != "") {
            doesRequestExist()
        }

    }, [userID, statusDisplay])


    return (
        <div className="bg-gray-400 flex items-center rounded-md p-2 -mb-32 -ml-6">
            
            <div className="">

                <div className="">
                    <div className="mb-2 flex justify-center">
                        
                        {statusDisplay === "empty" && <AddTurtleButton setStatusDisplay={setStatusDisplay}/>}
                        {statusDisplay === "cancel" && <AddTurtleButton setStatusDisplay={setStatusDisplay} />}
                        {statusDisplay === "decline" && <AddTurtleButton setStatusDisplay={setStatusDisplay} />}
                        {statusDisplay === "unfriend" && <AddTurtleButton setStatusDisplay={setStatusDisplay} />}
                        {statusDisplay === "pending" && requester !== friendName && <CancelRequestButton setStatusDisplay={setStatusDisplay}/>}
                        {statusDisplay === "pending" && requester === friendName && <AcceptDeclineButton friendName={friendName} userName={userName} setStatusDisplay={setStatusDisplay} callComponent={"friendPage"}/>}
                        {statusDisplay === "accept" && <UnfriendButton friendName={friendName} userName={userName} setStatusDisplay={setStatusDisplay} callComponent={"friendPage"}/>}
   
                    </div>
                    <div>
                        <button onClick={() => console.log("Create follow button")} className="bg-gray-600 p-2 rounded-md shadow-md shadow-gray-800/40">Follow Turtle</button>
                    </div>
                </div>

            </div>

            {/* <div className="flex group items-end">
                        <p className="bg-gray-500 p-2 rounded-full">DM</p> 
                        {/* Turn this into A component and reoganize */}
                        {/* <div className="hidden group-hover:flex absolute">
                            <p className="bg-gray-600 p-2 rounded-md -mb-10 -ml-10 shadow-md shadow-gray-800/40">Direct Messages need to be built</p>
                        </div>
                    </div> */}
            
            
        </div>
    )
}

export default RelationContainer