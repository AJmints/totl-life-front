'use client'

import { useEffect } from 'react'

let USER_ID: string
const URL = process.env.NEXT_PUBLIC_BACKEND_URL
let AUTH_TOKEN: string

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

export default function CreateNewLog() {

    useEffect(() => {
        
    }, [])

    const handleSubmit = async(e: any) => {
        e.preventDefault()

        const id = await authCheck()

        const data = {
            user: USER_ID,
            logName: e.target.logName.value,
            introduction: e.target.introduction.value,
        }
        // console.log(await token())
        USER_ID = ""

        const makeLogRequest = await fetch( URL + "/logs/create-log", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "auth-token": "Bearer " + await token()
            },
            body: JSON.stringify(data)
        })
        const response = await makeLogRequest.json().catch((err) => {
            console.log(err)
        })
        console.log(response)
    }

    return (
        <>
        <div className="bg-gray-700/70 mt-2 px-2 sm:px-5 rounded-md">
        <form className="" onSubmit={handleSubmit}>
                
                <div className='w-full flex flex-col'>
                    <label className="text-gray-200 font-light" htmlFor='logName'>Log Name</label>
                    <input 
                        className="rounded-md font-normal" 
                        type='text' 
                        autoComplete='off' 
                        placeholder="What is the name of this log?"
                        id='logName' 
                        required 
                        minLength={3} maxLength={15} 
                    />
                </div>
                <div className='w-full flex flex-col my-2'>
                <label className="text-gray-200 font-light" htmlFor='introduction'>Introduction</label>
                <textarea 
                    className="rounded-md font-normal" 
                    rows={4} 
                    placeholder="Tell us about what this log is about and the desired culture you wish to embody." 
                    name='introduction' 
                    required 
                    minLength={40} 
                    // maximum length 300chars
                />
                </div>
                <button className="px-2 font-normal hover:text-gray-800 hover:bg-emerald-600 duration-300 text-gray-200 bg-gray-500 rounded-md">Submit</button>

            </form>
            <button onClick={() => console.log("hi")}>TextButton</button>
        </div>
        </>
    )
}