'use client'

import Image from "next/image"
import imgDefault from "../../../../public/icons/profile-pic.png"
import { useRouter, usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { useUserContext } from "@/app/context/UserContextProvider"

const UserCardDetails = (props: any) => {

    const pathname = usePathname()
    const { userName, userPFP, verified, userID } = useUserContext()

    // useEffect(() => {
        
    // }, [])

    

    
    return (
        <div>

            <div className="flex justify-between">
                <div className="bg-gray-400/80 p-3 rounded-md ">
                    <div className="sm:flex justify-center">
                        <Image
                        src={props.userInformation.userPfp === null ? imgDefault : props.userInformation.userPfp}
                        alt=""
                        height={100}
                        width={100}
                        className="h-20 w-20 rounded-full mx-auto" 
                        />
                    </div>
                    <div>
                        <p>t/{props.userInformation.name}</p>
                        <p>Verified: {props.userInformation.verified ? "true" : "false"}</p>
                    </div>
                </div>

                {
                    props.noUser ? 
                    <div className="absolute bg-red-700/80 rounded-md p-2 -mt-20 sm:mt-0 text-xl left-[35%] right-[35%] lg:left-[42%] lg:right-[42%]">
                        <p>User not present, please try again later</p>
                    </div>
                    :
                    <></>
                }

            
                <div className="flex items-end">
                    <p className="bg-gray-500 p-2 rounded-full">DM</p>
                </div>
            </div>

        </div>
    )
}

export default UserCardDetails