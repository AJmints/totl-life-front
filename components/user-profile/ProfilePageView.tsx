'use client'

import BackPackContainer from "./pageview-container/backpack-container/BackPackContainer"
import UserPageDetails from "./pageview-container/user-detail-header/UserPageDetails"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export const authCheck = async() => {
    const infoCall = await fetch("/api/authCheck")
    const status = await infoCall.json().catch((err) => {
        console.log(err)
    })
    return status.loggedIn
}

const ProfilePageView = () => {

    const [ verify, setVerify ] = useState(false)
    const router = useRouter()
    
    useEffect(() => {

        const check = async() => {
            if (!await authCheck()) {
                router.push("/login")
            } else {
                setVerify(true)
            }
        }
        
        check()
    }, [])

    return (
        <>
        {
            verify ? 

            <div className="bg-gray-700/80 p-10 font-extralight text-white flex justify-center md:justify-between">
            
            <div className="hidden lg:block">
                <p>Left Column</p>
                <li>Event Creator</li>
                <li>Market Place</li>
            </div>

            <div className="">
                <UserPageDetails />
                <div className="flex mt-3 space-x-2">
                    <li>BackPack</li>
                    <li>Posts</li>
                    <li>Comments</li>
                    <li>Saved</li>
                    <li>Events</li>
                    <li>Your Communities</li>
                </div>
            </div>

            <div className="hidden md:block">
                <BackPackContainer />
            </div>

            </div>

            :
            
            <div>
                Verifying
            </div>
        }
        </>
    )
}

export default ProfilePageView