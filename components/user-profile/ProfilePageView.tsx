'use client'


import LoadingProfilePage from "./LoadingProfilePage"
import gearImage from './pageview-container/user-tab-history/backpack-container/data/gear-image'
import UserCardDetails from "./pageview-container/user-detail-header/UserCardDetails"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import TabOptionContainer from "./pageview-container/user-tab-history/TabOptionContainer"
import LoadingTabOptions from "./pageview-container/user-tab-history/LoadingTabOptions"
import InfoEditorContainer from "./pageview-container/social-option-container/SocialOptionContainer"
import { useUserContext } from "@/app/context/UserContextProvider"

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

    const { userGearList, setUserGearList, setPackImages } = useUserContext()
    
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
                if (response.gearItems.length > 0) {
                    setUserGearList([...response.gearItems])
                }
                setRelatedLogs({userFollows: response.logFollowList, userCreated: response.createdLogs})
                setPackImages(gearImage)
                setVerify(true)
                setReleaseHold(true)
                return
            } else {
                setNoUser(true)
                setVerify(true)
            }
        }
        
        check()
    }, [userGearList])



    return (
        <div>
        {
            verify ? 

            <div className="flex justify-center">
            <div className="bg-gray-700/80 p-2 sm:p-5 font-extralight text-white rounded-md flex justify-center gap-5">

            <div className="">
                <div>
                <UserCardDetails 
                userInformation={userInformation}
                noUser={noUser}
                />
                </div>
                {
                    releaseHold ? 
                    <div>
                        <TabOptionContainer 
                        userInformation={userInformation}
                        />
                        
                    </div>
                    :
                    <div>
                        <LoadingTabOptions />
                    </div>

                }
                
            </div>

            <div className="hidden xl:block bg-gray-500 p-2 rounded-md">
                <InfoEditorContainer />
            </div>

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