'use client'

import Image from "next/image"
import arrow from "../../../../../public/icons/Arrow.png"
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
            <div className='text-center'>
                { pauseButton ?
                <Image
                src={arrow}
                alt=""
                className='cursor-pointer hover:shadow-lg hover:shadow-gray-500 w-8 rotate-90 ml-1  hover:bg-emerald-700/80 duration-200 bg-emerald-900/50 rounded-full p-1'
                />
                :   
                <Image
                    src={arrow}
                    alt=""
                    className='cursor-pointer hover:shadow-lg hover:shadow-gray-500 w-8 rotate-90 ml-1  hover:bg-emerald-700/80 duration-200 bg-emerald-900/50 rounded-full p-1'
                    onClick={() => downVote()}
                />
                }
                <p className='font-normal text-xs'>{props.downCount}</p>
            </div>
        </>
    )
}

export default DownCountButton