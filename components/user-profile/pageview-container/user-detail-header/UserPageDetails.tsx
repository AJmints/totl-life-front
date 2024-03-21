'use client'

import Image from "next/image"
import imgDefault from "../../../../public/icons/profile-pic.png"
import { useRouter, usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { useUserContext } from "@/app/context/UserContextProvider"

const UserPageDetails = () => {

    const pathname = usePathname()
    const { userName, userPFP, verified, userID } = useUserContext()

    useEffect(() => {
        
    }, [])

    

    
    return (
        <div>

            <div className="flex justify-between">
                <div className="bg-gray-400/80 p-3 rounded-md ">
                    <div className="flex justify-center">
                        <Image
                        src={userPFP === null ? imgDefault : userPFP}
                        alt=""
                        height={100}
                        width={100}
                        className="h-20 w-20 rounded-full" 
                        />
                    </div>
                    <div>
                        <p>t/{userName}</p>
                        <p>Verified: {verified ? "true" : "false"}</p>
                    </div>
                </div>

            
                <div className="flex items-end">
                    <p className="bg-gray-500 p-2 rounded-full">DM</p>
                </div>
            </div>

        </div>
    )
}

export default UserPageDetails