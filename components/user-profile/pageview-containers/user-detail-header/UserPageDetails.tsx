'use client'

import Image from "next/image"
import imgDefault from "../../../../public/icons/profile-pic.png"
import { useRouter, usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { useUserContext } from "@/app/context/UserContextProvider"

const UserPageDetails = () => {

    useEffect(() => {
        // Need to verify if user that is logged is the same that we are viewing the page, if not, we need to load the other profile being viewed.
    }, [])

    const pathname = usePathname()
    const { userName, userPFP, verified, userID } = useUserContext()

    
    return (
        <div className="flex">

            <div>
                <div className="bg-gray-400/80 p-3 rounded-md ">
                    <div className=" flex justify-center">
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

            
                <div>
                    <p>Private Message</p>
                </div>
            </div>

        </div>
    )
}

export default UserPageDetails