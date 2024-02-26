'use client'

import { useState } from 'react'
import { useUserContext } from '@/app/context/UserContextProvider'

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

type CommentType = {
    comment: string,
    id: number,
    parentBaleId: number,
    userName: string,
    userPFP: any,
}

type CreateCommentProps = {
    baleId: number,
    fetchResponse: CommentType[],
    setFetchResponse: Function,
}

export default function CreateComment(props: any) {

    const [submitting, setSubmitting] = useState<boolean>(false)
    const { userID } = useUserContext()

    const handleSubmit = async(e: any) => {
        e.preventDefault()

        setSubmitting(true)
        if (!await authCheck()) {
            console.log("issue")
            return
        }

        const data: Object = {
            user: userID,
            comment: e.target.comment.value,
            baleId: props.baleId,
        }
        const makeCommentRequest: Response = await fetch( URL + "/logs/create-comment", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "auth-token": "Bearer " + await token()
            },
            body: JSON.stringify(data)
        })
        const response: CommentType = await makeCommentRequest.json().catch((err) => {
            setSubmitting(false)
            console.log(err)
        })
        if (response.comment === e.target.comment.value) {
            setSubmitting(false)
            e.target.comment.value = ""
            props.setBreaker((prev:boolean) => !prev)
        }
        
    }


    return (
        <div>
            { props.commentLoader ? 
            <form className="" onSubmit={handleSubmit}>
                <div className='w-full flex flex-col my-2'>
                <label className="text-gray-200 font-light" htmlFor='comment'>Comment</label>
                <textarea 
                    className="rounded-md font-normal" 
                    rows={3} 
                    placeholder="Thoughts?" 
                    name='comment' 
                    required 
                    minLength={3} maxLength={600} 
                />
                </div>
                
                <div>
                { submitting ? 
                <div className='flex justify-center'>
                <p className="px-2 font-normal text-gray-800 bg-emerald-700 duration-300 rounded-md">Posting...</p>
                </div>
                :
                <button className="px-2 font-normal hover:text-gray-800 hover:bg-emerald-600 duration-300 text-gray-200 bg-gray-500 rounded-md">Submit</button>
                }   
                </div>
                
            </form>
            :
            <></>
            }
        </div>
    )
}