'use client'

import { useState } from "react"

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

type AllLogsBales = {
    body: string,
    commentCount: number,
    downVoteCount: number,
    id: number,
    parentLog: string,
    saveCount: number,
    title: string,
    upVoteCount: number,
    userName: string,
    userPFP: any,
}

type NewBalePostProps = {
    logName: string,
    allLogsBales: AllLogsBales[],
    setAllLogsBales: Function,
    setCreatePost: Function,
}

export default function NewBalePost(props: NewBalePostProps) {

    const [submitting, setSubmitting] = useState<boolean>(false)

    const handleSubmit = async(e:any) => {
        e.preventDefault()

        setSubmitting(true)
        if (!await authCheck()) {
            console.log("issue")
            return
        }

        const data: Object = {
            parentLog: props.logName,
            userId: USER_ID,
            title: e.target.title.value,
            body: e.target.body.value
        }
        
        const makeLogRequest = await fetch( URL + "/logs/create-bale", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "auth-token": "Bearer " + await token()
            },
            body: JSON.stringify(data)
        })
        const response: AllLogsBales = await makeLogRequest.json().catch((err) => {
            console.log(err)
            setSubmitting(false)
        })
        if (e.target.title.value === response.title) {
        e.target.title.value = ""
        e.target.body.value = ""
        props.setAllLogsBales([...props.allLogsBales, response])
        props.setCreatePost(false)
        setSubmitting(false)
        }
        USER_ID = ""
    }

    return (
        <>
        <div className="bg-gray-700/70 mt-2 px-2 sm:px-5 rounded-md">
        <form className="pb-2" onSubmit={handleSubmit}>

                <div className='text-gray-300 flex text-sm justify-center'>
                    <p className='bg-gray-600/90 mt-2 rounded-md px-3'>You are creating a New Bale (New Bale = new post)</p>
                </div>
                
                <div className='w-full flex flex-col'>
                    <label className="text-gray-200 font-light" htmlFor='title'>Title</label>
                    <input 
                        className="rounded-md font-normal" 
                        type='text' 
                        autoComplete='off' 
                        placeholder="What do you want to talk about?"
                        id='title' 
                        required 
                        minLength={10} maxLength={150} 
                    />
                </div>
                <div className='w-full flex flex-col my-2'>
                <label className="text-gray-200 font-light" htmlFor='body'>Body</label>
                <textarea 
                    className="rounded-md font-normal"
                    rows={4} 
                    placeholder="Give us some context!"
                    name='body' 
                    required 
                    minLength={10} maxLength={600}
                />
                </div>
                { submitting ?
                <div className='flex justify-center'>
                    <p className="px-2 font-normal text-gray-800 bg-emerald-700 duration-300 rounded-md">Posting...</p>
                </div>
                :
                <button className="px-2 font-normal hover:text-gray-800 hover:bg-emerald-600 duration-300 text-gray-200 bg-gray-500 rounded-md">Submit</button>
                }
            </form>
        </div>
        </>
    )
}