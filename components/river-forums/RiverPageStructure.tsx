'use client'

import { useState, useEffect } from 'react'

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
            {checkUser ? 
            <p>present</p> 
            : 
            <p>not present</p>}
        </>
    )
}

export default RiverPageStructure