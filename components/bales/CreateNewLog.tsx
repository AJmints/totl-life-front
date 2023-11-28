'use client'

import { useEffect, useState } from 'react'

let USER_ID: string
const URL: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL
export const authCheck = async() => {
    const infoCall: Response = await fetch("/api/authCheck")
    const status = await infoCall.json().catch((err) => {
        console.log(err)
    })
    if (status.loggedIn) {
        USER_ID = status.id
        return status.loggedIn
    }
}

export const token = async() => {
    const getToken: Response = await fetch("/api/headers")
    const status = await getToken.json().catch((err) => {
        console.log(err)
    })
    return status
}

type ResponseCreateNewLog = {
    status?: "max" | "taken"
    response?: string,
    user?: number,
    logName?: string,
    introduction?: string,
}
type CreateNewLogProps = {
    setCreateLog: Function,
    setLogsDropDown: Function,
}

export default function CreateNewLog(props: CreateNewLogProps) {

    const [errorResponse, setErrorResponse] = useState<string>("")
    const [showError, setShowError] = useState<boolean>(false)
    const [submitting, setSubmitting] = useState<boolean>(false)

    useEffect(() => {
        console.log(props)
    }, [])

    const handleSubmit = async(e: any) => {
        e.preventDefault()

        setSubmitting(true)
        setShowError(false)
        if (!await authCheck()) {
            console.log("issue")
            return
        }

        const data: Object = {
            user: USER_ID,
            logName: e.target.logName.value.replace(/ /g, "_"),
            introduction: e.target.introduction.value,
        }

        const makeLogRequest: Response = await fetch( URL + "/logs/create-log", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "auth-token": "Bearer " + await token()
            },
            body: JSON.stringify(data)
        })
        USER_ID = ""
        const response: ResponseCreateNewLog = await makeLogRequest.json().catch((err) => {
            console.log(err)
        })
        if (response.logName === e.target.logName.value) {
            e.target.logName.value = ""
            e.target.introduction.value = ""
            props.setLogsDropDown((prev: string[]) => [...prev, response.logName!.toLowerCase()])
            props.setCreateLog(false)
            setSubmitting(false)
            return
        } else if (response.status === "taken"){
            setShowError(true)
            setSubmitting(false)
            setErrorResponse(response.response!)
        } else if (response.status === "max") {
            setShowError(true)
            setSubmitting(false)
            setErrorResponse(response.response!)
        }
    }

    return (
        <>
        <div className="bg-gray-700/70 mt-2 pb-2 px-2 sm:px-5 rounded-md">
        <form className="" onSubmit={handleSubmit}>
                
                <div className='w-full flex flex-col'>
                    <label className="text-gray-200 font-light" htmlFor='logName'>Log Name</label>
                    <input 
                        className="rounded-md font-normal w-72 mx-auto" 
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
                    maxLength={500}
                />
                </div>
                <div className='flex justify-center'>
                { showError ? <p className='bg-red-500 text-gray-200 cursor-pointer p-1 rounded-md mb-2 hover:bg-red-600 duration-300' onClick={() => setShowError(prev => !prev)}>{errorResponse}</p> : <></>}
                </div>
                { submitting ? 
                <div className='flex justify-center'>
                    <p className="px-2 font-normal text-gray-800 bg-emerald-700 duration-300 rounded-md">Submitting...</p>
                </div>
                :
                <button className="px-2 font-normal hover:text-gray-800 hover:bg-emerald-500 duration-300 text-gray-200 bg-gray-500 rounded-md">Submit</button>
                }
            </form>
        </div>
        </>
    )
}