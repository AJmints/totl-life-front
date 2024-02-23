'use client'

import arrow from "../../../public/icons/Arrow.png"
import Image from "next/image";
import { useEffect } from 'react'
import UserMain from "./UserMain";
import { useUserContext } from "@/app/context/UserContextProvider";

let USER_ID: string
const URL = process.env.NEXT_PUBLIC_BACKEND_URL

export const authCheck = async() => {
    const infoCall = await fetch("/api/authCheck")
    const status = await infoCall.json().catch((err) => {
        console.log(err)
    })
    if (status.loggedIn) {
        USER_ID = status.id
        return status.loggedIn
    }
}

export default function UserOptionsConst(props: any) {

    const { userID, setUserID, userName, setUserName, setVerified, userPFP, setUserPFP } = useUserContext()
    

    useEffect(() => {

        const checkLoginStatus = async () => {
            const logged = await authCheck()
            if (logged) {
                props.setUserLogged(true)
                if(userID === "") {
                    setUserContext()
                }
                
                return
            } else {
                props.setUserLogged(false)
                return
            }
        }

        const setUserContext = async () => {
            const getUserContext = await fetch( URL + "/profile/userInfo/" + USER_ID)
            const response = await getUserContext.json().catch(err => {
                console.log(err)
            })

            if (await response.userName) {
            setUserID(response.userId)
            setUserName(response.userName)
            setVerified(response.accountVerified)
            setUserPFP('data:' + response.pfp.type + ';base64,' + response.pfp.image)
            }
            USER_ID = ""
            return
        }
        
        if (!props.userLogged) {
            checkLoginStatus()
            console.log("Check")
        }
        
        
    }, [props.userLogged, userPFP])

    return (
        <>
        {!props.userDetailsToggle ? 
            <></>
            :
            <div className="fixed z-30 right-0 top-0 w-60">
                <div className="shadow-xl shadow-gray-800 relative bg-gray-700 h-screen">
                <div className="">
                <Image src={arrow} alt="Close" onClick={() => props.setUserDetailsToggle((prev: any) => !prev)} className="cursor-pointer relative z-20 bg-gray-300 p-2 right-8 rotate-180 rounded-md hover:shadow-lg drop-shadow-xl top-20 w-14 hover:bg-emerald-500 duration-300 hover:shadow-gray-800/80 hover:rotate-0" />
                </div>
                <UserMain
                logout={props.logout}
                userName={userName}
                />
                </div>
            </div>
            }   
        </>
    )
}