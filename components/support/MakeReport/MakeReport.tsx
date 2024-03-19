
import { useState, useEffect } from "react"
import { useUserContext } from "@/app/context/UserContextProvider"

const URL: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL

export const authCheck = async() => {
    const infoCall: Response = await fetch("/api/authCheck")
    const status = await infoCall.json().catch((err) => {
        console.log(err)
    })
    if (status.loggedIn) {
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


const MakeReport = (props: any) => {

    const [ submitting, setSubmitting ] = useState(false)
    const [ submitError, setSubmitError ] = useState<string | null>(null)
    const [ success, setSuccess ] = useState(false)

    const { userID } = useUserContext()

    const makeReportHandler = async(event: any) => {
        event.preventDefault()
        setSubmitError("")
        setSubmitting(true)
        setSuccess(false)

        if (!await authCheck()) {
            setSubmitError("You need to be logged on to report an issue.")
            setSubmitting(false) 

            setTimeout(() => {
                setSubmitError(null)
            }, 5000)
            return
        }

        const data = {
            reportingUser: userID,
            reportedId: props.id,
            type: props.type,
            message: event.target.body.value
        }

        const makeCommentRequest: Response = await fetch( URL + "/logs/make-report", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "auth-token": "Bearer " + await token()
            },
            body: JSON.stringify(data)
        })
        const response = await makeCommentRequest.json().catch((err) => {
            setSubmitting(false)
            console.log(err)
        })

        if (response.status === "success") {
            event.target.body.value = ""
            setSubmitting(false)
            setSuccess(true)

            setTimeout(() => {
                setSuccess(false)
            }, 4000)
        } else if (response.status === "failed") {
            setSubmitting(false) 
            setSubmitError(response.response)

            setTimeout(() => {
                setSubmitError(null)
            }, 4000)
        }
        

    }

    return (

        <>
        <div className="bg-gray-600 p-4 rounded-md mb-2">
            <p className="text-gray-100 font-light">Please let us know what you would like to report. We will examine and make a decision on how to handle the situation. Thank you for looking out and keeping our community safe!</p>
        </div>
        <form className="" onSubmit={makeReportHandler}>
            
            <div className="bg-gray-400 rounded-md p-3">
            <textarea 
                    className="rounded-md font-normal w-full"
                    rows={8} 
                    name='body' 
                    required 
                    placeholder="Details on why you are making this report."
                    minLength={10} maxLength={600} 
                />

                <div>
                { submitting ? 
                <div className='flex'>
                <p className="p-2 font-normal text-gray-800 bg-emerald-700 duration-300 rounded-md">Posting...</p>
                </div>
                :
                <div>
                    <p className={submitError === null ? " hidden" : "text-red-700"}>{submitError}</p>
                    <div className="flex mb-2">
                    <p className={success ? "bg-emerald-500 rounded-md p-2" : "hidden"}>Your message was sent successfully</p>
                    </div>
                    <button className="p-2 font-normal hover:text-gray-800 hover:bg-emerald-600 duration-300 text-gray-200 bg-gray-500 rounded-md">Submit</button>
                </div>
                
                }   
                </div>
            </div>
            </form>
        </>
    )
}

export default MakeReport