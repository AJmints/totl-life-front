'use client'

import { usePathname } from 'next/navigation'
import { useUserContext } from '@/app/context/UserContextProvider'
import { URL } from '@/lib/globalConstants'
import { token } from '@/lib/constants/getToken'
import { useState } from 'react'

const AddTurtleButton = (props: any) => {

    const [loading, setLoading] = useState<boolean>(false)

    const pathname = usePathname()

    const { userName } = useUserContext()

    const friendName = pathname?.split("/user/").pop()

    const addFriend = async() => {
        setLoading(true)

        const data = {
            requester: userName,
            requested: friendName,
            status: "pending",
            lastActor: userName
        }

        const createPack = await fetch(URL + "/social/request-friend", {
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
        if (response.requestStatus === "pending") {
            props.setStatusDisplay(data.status)
            setLoading(false)
        }
        
    }

    return (
        <>
            {userName !== friendName && <>
            {loading ? 
            <button className="bg-gray-600 p-2 rounded-md shadow-md shadow-gray-800/40">Loading</button>
            :
            <button onClick={() => addFriend()} className="bg-gray-600 p-2 rounded-md shadow-md shadow-gray-800/40">Add Turtle</button>}
            </>}
        </>
    )
}

export default AddTurtleButton