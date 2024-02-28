'use client'

import Image from "next/image"
import arrow from "../../../../../../public/icons/Arrow.png"
import { useState } from "react"

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

export const token = async() => {
    const getToken = await fetch("/api/headers")
    const status = await getToken.json().catch((err) => {
        console.log(err)
    })
    return status
}

type ResponseUpDownVote = {
    status: "success" | "failed"
    response: "inc" | "dec" | "inc-dec" | "This bale does not exist."
}

type DownVoteProps = {
    id: number
    setDownCount: Function
    setUpCount: Function
    downCount: number
}

const DownCountButton = (props: DownVoteProps) => {

    const [pauseButton, setPauseButton] = useState<boolean>(false)

    const downVote = async() => {

        setPauseButton(true)
        const userPresent = await authCheck()
        if (!userPresent) {
            console.log("Not logged in")
            return
        }

        const data = {
            userId: USER_ID,
            baleId: props.id
        }
        
        const postUpVote: Response = await fetch( URL + "/logs/downvote-post", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "auth-token": "Bearer " + await token()
            },
            body: JSON.stringify(data)
        })
        USER_ID = ""
        const response: ResponseUpDownVote = await postUpVote.json().catch((err) => {
            console.log(err)
        })
        
        switch (response.response) {
            case "inc":
                props.setDownCount((prev: number) => prev + 1)
                break
            case "dec":
                props.setDownCount((prev: number) => prev -1)
                break
            case "inc-dec":
                props.setDownCount((prev: number) => prev + 1)
                props.setUpCount((prev: number) => prev - 1)
                break
            case "This bale does not exist.":
                break
        }
        setPauseButton(false)
        return
    }

    return (
        <>
            <div className='text-center flex items-center'>
                <div className="">
                <p className='font-light text-xl mx-2'>{props.downCount}</p>
                </div>
                { pauseButton ?
                <Image
                src={arrow}
                alt=""
                className='cursor-pointer hover:shadow-lg hover:shadow-gray-500 w-8 sm:w-10 rotate-90  hover:bg-emerald-700/80 duration-200 bg-emerald-800/60 rounded-full p-1'
                />
                :   
                <Image
                    src={arrow}
                    alt=""
                    className='cursor-pointer hover:shadow-lg hover:shadow-gray-500 w-8 sm:w-10 rotate-90  hover:bg-emerald-700/80 duration-200 bg-emerald-800/60 rounded-full p-1'
                    onClick={() => downVote()}
                />
                }
                
            </div>
        </>
    )
}

export default DownCountButton