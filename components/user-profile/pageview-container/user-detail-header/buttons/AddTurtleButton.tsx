'use client'

import { usePathname } from 'next/navigation'
import { useUserContext } from '@/app/context/UserContextProvider'

import { useEffect, useState } from 'react'

import { URL } from '@/lib/constants'

/* UserContext is going to need to have an array with all friendIDs to compare to current profile to display either AddFriend, CancelRequest, or RemoveFriend */

const AddTurtleButton = () => { // (userID, friendName)

    const pathname = usePathname()

    const { userID, userName } = useUserContext()

    const friendName = pathname?.split("/user/").pop()

    useEffect(() => {

    }, [])

    const addFriend = () => {

        /* Create Time, User, Requested, Status <- What the friend request object has 
        status = added, denied, pending, canceled */ 

        console.log( userName + " wants to send a friend request to " + friendName)
        /* Setting up new comp */

        /* Make Events/Trips components. Presented on the River/Home as an option to view your current and future trips and have a group chat for that group along with the group stats. When making these objects on the backend, use this part to start using Stored Procs and bring those into work flow */
    }

    const cancelRequest = () => {



    }

    return (
        <>
            {userName !== friendName && <button onClick={() => addFriend()} className="bg-gray-600 p-2 rounded-md shadow-md shadow-gray-800/40">Add Turtle</button>}
            {/* Pending / Cancel || Accept / Decline */}
        </>
    )
}

export default AddTurtleButton