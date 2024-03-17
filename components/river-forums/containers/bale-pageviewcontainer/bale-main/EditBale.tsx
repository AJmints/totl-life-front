import { useState } from "react"

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

const EditBale = (props: any) => {

    const [ submitting, setSubmitting ] = useState<boolean>(false)
    const [ submitError, setSubmitError ] = useState<string | null>(null)
    const [ storeChanges, setStoreChanges ] = useState({
        title: "",
        body: ""
    })

    const editThisPost = async(event: any) => {
        event.preventDefault()

        setSubmitting(true)

        if (!await authCheck()) {
            console.log("issue")
            setSubmitting(false)
            return
        }

        let tempTitle = storeChanges.title
        let tempBody = storeChanges.body

        if (storeChanges.title === '' && storeChanges.body === '') {
            props.setBaleEditToggle((prev: boolean) => !prev)
            return
        }

        if (storeChanges.title === '') {
            tempTitle = props.titleBody.title
        }
        if (storeChanges.body === '') {
            tempBody = props.titleBody.body
        }

        const data = {
            id: props.titleBody.baleId,
            title: tempTitle,
            body: tempBody
        }

        const editBale = await fetch(URL + "/logs/editBale/" + props.titleBody.baleId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "Bearer " + await token(),
            },
            body: JSON.stringify(data)
        })
        const response = await editBale.json().catch((err) => {
            console.log(err.message)
        })

        console.log(response)

        if (response.status === "success") {
            props.setTitleBody({
                baleId: data.id,
                title: data.title,
                body: data.body
            })
            props.setBaleEditToggle(false)
        } else if (response.status === "failed") {
            setSubmitError("An error occurred, please try again later.")
            setSubmitting(false)
        }
        
    }

    const handleBaleDraft = (event: any) => {
        const {name, value} = event.target

        setStoreChanges(prevTitleBody => {
            return {
                ...prevTitleBody,
                [name]: value
            }
        })
    }

    return (
        <>

            <div className="flex flex-row-reverse mb-2">
                <button className="px-2 font-normal hover:text-gray-800 hover:bg-emerald-600 duration-300 text-gray-200 bg-gray-500 rounded-md" onClick={() => props.setBaleEditToggle((prev: boolean) => !prev)}>Cancel Update</button>
                {/* <button className="px-2 mr-2 font-normal hover:text-gray-800 hover:bg-red-600 duration-300 text-gray-200 bg-gray-500 rounded-md" onClick={() => console.log(props)}>Save Draft</button> */}
            </div>
            
            <form className="" onSubmit={editThisPost}>
            <div className="bg-gray-300 rounded-t-md  p-3">
                {/* <h1 className="text-lg sm:text-2xl font-light">{props.titleBody.title}</h1> */}
                <textarea 
                    className="rounded-md font-normal text-lg w-full" 
                    autoComplete='off' 
                    name='title' 
                    required 
                    defaultValue={props.titleBody.title}
                    onChange={handleBaleDraft}
                    minLength={10} maxLength={150} 
                />
            </div>
            
            <div className="bg-gray-400 rounded-b-md p-3">
            <textarea 
                    className="rounded-md font-normal w-full"
                    rows={4} 
                    name='body' 
                    required 
                    defaultValue={props.titleBody.body}
                    onChange={handleBaleDraft}
                    minLength={10} maxLength={600} 
                />

                <div>
                { submitting ? 
                <div className='flex'>
                <p className="p-2 font-normal text-gray-800 bg-emerald-700 duration-300 rounded-md">Posting...</p>
                </div>
                :
                <div>
                    <p className={submitError === null ? " hidden" : "text-red-500"}>{submitError}</p>
                    <button className="p-2 font-normal hover:text-gray-800 hover:bg-emerald-600 duration-300 text-gray-200 bg-gray-500 rounded-md">Update</button>
                </div>
                
                }   
                </div>
            </div>
            </form>
        </>
    )
}

export default EditBale