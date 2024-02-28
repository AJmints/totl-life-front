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

type UpVoteProps = {
    id: number
    setDownCount: Function
    setUpCount: Function
    upCount: number
}

const UpVoteButton = (props: UpVoteProps) => {

    const [pauseButton, setPauseButton] = useState<boolean>(false)

    const upVote = async() => {
        
        setPauseButton(true)
        const userPresent = await authCheck()
        if (await !userPresent) {
            console.log("Not logged in")
            return
        }

        const data: Object = {
            userId: USER_ID,
            baleId: props.id
        }

        const postUpVote: Response = await fetch( URL + "/logs/upvote-post", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "auth-token": "Bearer " + await token()
            },
            body: JSON.stringify(data)
        })
        const response: ResponseUpDownVote = await postUpVote.json().catch((err) => {
            USER_ID = ""
            console.log(err)
        })
        
        switch (response.response) {
            case "inc":
                props.setUpCount((prev: number) => prev + 1)
                break
            case "dec":
                props.setUpCount((prev: number) => prev -1)
                break
            case "inc-dec":
                props.setUpCount((prev: number) => prev + 1)
                props.setDownCount((prev: number) => prev - 1)
                break
            case "This bale does not exist.":
                break
        }
        setPauseButton(false)
        return

    }

    return (
        <>
            <div className='flex items-center'>
                <p className='font-light text-xl mx-2'>{props.upCount}</p>
                {pauseButton ? 
                <Image
                src={arrow}
                alt=""
                className='cursor-pointer hover:shadow-lg hover:shadow-gray-600 w-8 sm:w-10 -rotate-90 bg-emerald-500/50 hover:bg-emerald-400/90 duration-200 rounded-full p-1'
                />
                :
                <Image
                    src={arrow}
                    alt=""
                    className='cursor-pointer hover:shadow-lg hover:shadow-gray-600 w-8 sm:w-10 -rotate-90 bg-emerald-500/50 hover:bg-emerald-400/90 duration-200 rounded-full p-1'
                    onClick={() => upVote()}
                />
                }
                
            </div>
        </>
    )
}

export default UpVoteButton