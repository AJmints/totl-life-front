'use client'


import LoadingProfilePage from "./LoadingProfilePage"
import BackPackContainer from "./pageview-container/backpack-container/BackPackContainer"
import UserCardDetails from "./pageview-container/user-detail-header/UserCardDetails"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const URL: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL

export const authCheck = async() => {
    const infoCall = await fetch("/api/authCheck")
    const status = await infoCall.json().catch((err) => {
        console.log(err)
    })
    return status.loggedIn
}

const ProfilePageView = () => {

    const [ verify, setVerify ] = useState(false)
    const [ releaseHold, setReleaseHold ] = useState(false)
    const [ noUser, setNoUser ] = useState(false)
    const [ userInformation, setUserInformation ] = useState<any>({
        name: "",
        id: "",
        verified: false,
        userPfp: null,

    })
    const [ relatedLogs, setRelatedLogs ] = useState({
        userFollows: [],
        userCreated: []
    })

    const router = useRouter()
    const pathname = usePathname()
    
    useEffect(() => {

        const check = async() => {
            if (!await authCheck()) {
                router.push("/login")
            } else {
                userDetail()
            }
        }

        const userDetail = async() => {
            const userName = pathname?.split("/user/").pop()

            const getOtherUserDetails = await fetch( URL + "/profile/userInfo/" + userName)
            const response = await getOtherUserDetails.json().catch((err) => {
                console.log(err)
            })
            if (response.status !== "failed") {
                if (response.pfp?.image === undefined) {
                    setUserInformation({name: response.userName, id: response.userId, verified: response.accountVerified, userPfp: null})
                } else {
                    setUserInformation({name: response.userName, id: response.userId, verified: response.accountVerified, userPfp: 'data:image/jpeg;base64,' + response.pfp.image})
                }
                
                setRelatedLogs({userFollows: response.logFollowList, userCreated: response.createdLogs})
                setVerify(true)
                setReleaseHold(true)
                return
            } else {
                setNoUser(true)
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
                <UserCardDetails 
                userInformation={userInformation}
                noUser={noUser}
                />
                <div className="sm:flex mt-3 space-x-2">
                    <li>BackPack</li>
                    <li>Posts</li>
                    <li>Comments</li>
                    <li>Saved</li>
                    <li>Events</li>
                    <li>Your Communities</li>
                </div>
                <div className="mt-5 p-2 px-5 bg-gray-500 rounded-md space-y-2">
                    <div className="py-14 bg-gray-300 rounded-md">
                        <p className="text-gray-700 text-center text-xl">Under Development</p>
                    </div>
                    <div className="py-14 px-40 sm:px-64 bg-gray-300 rounded-md"></div>
                    <div className="py-14 px-40 sm:px-64 bg-gray-300 rounded-md"></div>
                    <div className="py-14 px-40 sm:px-64 bg-gray-300 rounded-md"></div>
                </div>
            </div>

            <div className="hidden md:block">
                <BackPackContainer />
            </div>

            </div>

            :
            
            <div className="">
                <LoadingProfilePage />
            </div>
        }
        </>
    )
}

export default ProfilePageView