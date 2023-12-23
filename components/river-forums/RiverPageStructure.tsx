'use client'

import { useState, useEffect } from 'react'
import NewPostContainer from './containers/newpost-lognav/NewPostContainer'

const authCheck = async() => {
    const infoCall = await fetch("/api/authCheck")
    const status = await infoCall.json().catch((err) => {
        console.log(err)
    })
    if (status.loggedIn) {
        return true
    } else {
        return false
    }
}

const RiverPageStructure = () => {

    const [checkUser, setCheckUser] = useState<boolean>(false)


    useEffect(() => {
        const userPresent = async() => {
            if (!await authCheck()) {
                setCheckUser(false)
                return
            }
            setCheckUser(true)
            return
        }
        userPresent()
    }, [])

    return (
        <>
        <div>

            {/* Central container to create post and view all posts */}
            <div>
            {/* Create new post option */}
            <NewPostContainer 
            checkUser={checkUser}
            />

            {/* View all bales on river, or specific log */}
            </div>


        </div>
        </>
    )
}

export default RiverPageStructure