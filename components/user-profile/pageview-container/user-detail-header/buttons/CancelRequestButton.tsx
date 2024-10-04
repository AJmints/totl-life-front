'use client'

import { usePathname } from "next/navigation"
import { useUserContext } from "@/app/context/UserContextProvider"
import { URL } from "@/lib/globalConstants"
import { token } from "@/lib/constants/getToken"
import { useState } from "react"

const CancelRequestButton = (props: any) => {

    const [loading, setLoading] = useState<boolean>(false)

    const pathname = usePathname()

    const { userName } = useUserContext()

    const friendName = pathname?.split("/user/").pop()

    const cancelRequest = async() => {

        setLoading(true)

        const data = {
            requester: userName,
            requested: friendName,
            status: "cancel",
            lastActor: userName
        }

        const createPack = await fetch( URL + "/social/handle-friend-request-action", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "auth-token": "Bearer " + await token()
            },
            body: JSON.stringify(data)
        })
        const response = await createPack.json().catch((err) => {
            console.log(err)
        })
        if (response.requestStatus === "cancel") {
            props.setStatusDisplay(response.requestStatus)
            setLoading(false)
        } else if (response.response === "empty") {
            props.setStatusDisplay("error")
            setLoading(false)
        }
        

    }

    return (
        <>
        {userName !== friendName && <>
        {loading ?
            <button className="bg-gray-600 p-2 rounded-md shadow-md shadow-gray-800/40">Loading</button>
        :
            <button onClick={() => cancelRequest()} className="bg-gray-600 p-2 rounded-md shadow-md shadow-gray-800/40">Cancel Request</button>
        }</>}
        </>
    )
}

export default CancelRequestButton