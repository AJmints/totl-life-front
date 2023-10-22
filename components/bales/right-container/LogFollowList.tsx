import { useEffect } from 'react'

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

const LogFollowList = () => {

    useEffect(() => {
        const retrieveLogList = async() => {
            // const askForList = await fetch( URL + "/logs" )
            console.log("set up backend.")
        } 
        retrieveLogList()
    }, [])

    return (
        <div>
            <p>List of followed logs</p>
        </div>
    )
}

export default LogFollowList