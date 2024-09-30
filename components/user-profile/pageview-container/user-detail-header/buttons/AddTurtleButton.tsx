'use client'

import { usePathname } from 'next/navigation'
import { useUserContext } from '@/app/context/UserContextProvider'
import { URL } from '@/lib/globalConstants'

export const token = async() => {
    const getToken: Response = await fetch("/api/headers")
    const status = await getToken.json().catch((err) => {
        console.log(err)
    })
    return status
}

const AddTurtleButton = (props: any) => {

    const pathname = usePathname()

    const { userName } = useUserContext()

    const friendName = pathname?.split("/user/").pop()

    const addFriend = async() => {

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
        // console.log(response)
        if (response.status === "added") {
            props.setStatusDisplay(data.status)
        }
        
    }

    return (
        <>
            {userName !== friendName && <button onClick={() => addFriend()} className="bg-gray-600 p-2 rounded-md shadow-md shadow-gray-800/40">Add Turtle</button>}
        </>
    )
}

export default AddTurtleButton