'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useRiverContext } from '@/app/context/RiverContextProvider'

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

const CreateNewBaleForm = () => {

    const { logList } = useRiverContext()
    const [submitting, setSubmitting] = useState<boolean>(false)
    const [ errorMessage, setErrorMessage] = useState("")
    const [ currentLog, setCurrentLog ] = useState<string>("Select a log to post to")

    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {

        const initialForm = () => {
            if (searchParams?.get('log') !== null) {
                setCurrentLog(searchParams?.get('log')!)
            } else {
                setCurrentLog("Select a log to post to")
            }
        }
        initialForm()


    }, [])

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        
        if (!await authCheck()) {
            // TODO
            console.log("logout")
        }
        setErrorMessage("")
        if (!logList.includes(currentLog)) {
            setErrorMessage("Select a log to post to")
            return
        } else if (Number(USER_ID) <= 0) {
            setErrorMessage("Please log in to post")
            return
        }

        

        setSubmitting(true)

        const data: Object = {
            parentLog: currentLog,
            userId: USER_ID,
            title: e.target.title.value,
            body: e.target.body.value,
        }

        const makeLogRequest = await fetch( URL + "/logs/create-bale", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "auth-token": "Bearer " + await token()
            },
            body: JSON.stringify(data)
        })
        const response = await makeLogRequest.json().catch((err) => {
            console.log(err)
            setSubmitting(false)
        })
        if (e.target.title.value === response.title) {
        e.target.title.value = ""
        e.target.body.value = ""
        setSubmitting(false)
        }
        USER_ID = ""
        router.push("/river/" + currentLog)
    }

    const logDropDownOptions = logList.sort((a:any, b:any) => {
        if (a < b) {
            return -1
        }
        if (a > b) {
            return 1
        }
        return 0
    }).map((item: any) => {
        return (
            <option key={item} value={item}>{item}</option>
        )
    })

    return (
        <div className='bg-gray-600/90 p-5 rounded-md m-10'>
            <form onSubmit={handleSubmit}>

                <div className="sm:flex sm:space-x-2 items-center">
                    <h1 className="text-gray-200 font-light">Posting to:</h1>
                    <div className='text-gray-800 mt-1'>
                        <select className='rounded-md mx-auto shadow-md p-1 bg-gray-200' defaultValue={currentLog} onChange={(event) => setCurrentLog(event.target.value)} id="defaultlog">
                            <option value={currentLog} disabled>{currentLog}</option>
                            {logDropDownOptions}
                        </select>
                    </div>
                </div>

                {/* Title for post */}
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

                {/* Body of post */}
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

                { errorMessage === "" ? 
                    <div></div>
                :
                    <div>
                        <p className="text-red-500 font-light">{errorMessage}</p>
                    </div>
                }

                { submitting ?
                <div className='flex justify-center'>
                    <p className="px-2 font-normal text-gray-800 bg-emerald-700 duration-300 rounded-md">Posting...</p>
                </div>
                :
                <button className="px-2 font-normal hover:text-gray-800 hover:bg-emerald-600 duration-300 text-gray-200 bg-gray-500 rounded-md">Submit</button>
                }

            </form>
        </div>
    )
}

export default CreateNewBaleForm