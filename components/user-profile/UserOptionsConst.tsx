'use client'

import UserOptions from "./UserOptions";
import arrow from "../../public/icons/Arrow.png"
import Image from "next/image";
import { useState, useEffect } from 'react'

let USER_ID: string
const URL = process.env.NEXT_PUBLIC_BACKEND_URL
let AUTH_TOKEN: string

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

    const [userName, setUserName] = useState("")
    

    useEffect(() => {
        const getPFP = async() => {
            const present = await authCheck()
            if (present) {
                await fetch( URL + "/profile/user-pfp/" + USER_ID)
                .then(response => response.json())
                .then(data => {
                    if (data.pfp === null) {
                        setUserName(data.userName)
                        return
                    } else {
                        props.setUserPFP('data:image/jpeg;base64,' + data.image)
                        setUserName(data.userId)
                    }
                })
                
            }
            USER_ID = ""
        }
        getPFP()
        
        
    }, [props.userPFP])

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
                <UserOptions
                logout={props.logout}
                userPFP={props.userPFP}
                setUserPFP={props.setUserPFP}
                userName={userName}
                />
                </div>
            </div>
            }   
        </>
    )
}