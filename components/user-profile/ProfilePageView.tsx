'use client'


import LoadingProfilePage from "./LoadingProfilePage"
import BackPackContainer from "./pageview-container/user-tab-history/backpack-container/BackPackContainer"
import UserCardDetails from "./pageview-container/user-detail-header/UserCardDetails"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import TabOptionContainer from "./pageview-container/user-tab-history/TabOptionContainer"
import LoadingTabOptions from "./pageview-container/user-tab-history/LoadingTabOptions"

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
        <div>
        {
            verify ? 

            <div className="bg-gray-700/80 p-10 font-extralight text-white flex justify-center md:justify-between">
            
            <div className="hidden lg:block">
                <p>Left Column</p>
                <li>Event Creator</li>
                <li>Market Place</li>
            </div>

            <div className="mx-auto">
                <div>
                <UserCardDetails 
                userInformation={userInformation}
                noUser={noUser}
                />
                </div>
                {
                    releaseHold ? 
                    <div>
                        <TabOptionContainer />
                    </div>
                    :
                    <div>
                        <LoadingTabOptions />
                    </div>

                }
                
            </div>

            <div className="hidden lg:block">
                {/* <BackPackContainer 
                userName={userInformation.name}/> */}
                <p>Right Column</p>
                <li>BackPack Feature</li>
            </div>

            </div>

            :
            
            <div className="">
                <LoadingProfilePage />
            </div>
        }
        </div>
    )
}

export default ProfilePageView