import { useEffect } from "react"
import Image from "next/image"

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

export default function CreateNewComment (props: any) {
    const viewBale = props.baleInfo

    useEffect(() => {
        console.log(props.baleInfo)
    }, [])

    const handleSubmit = async(e: any) => {
        e.preventDefault()

        await authCheck()

        
        const data = {
            user: USER_ID,
            comment: e.target.comment.value,
            baleId: viewBale.id,
        }
        const makeCommentRequest = await fetch( URL + "/logs/create-comment", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "auth-token": "Bearer " + await token()
            },
            body: JSON.stringify(data)
        })
        const response = await makeCommentRequest.json().catch((err) => {
            console.log(err)
        })
        console.log(response)

        USER_ID = "";
    }

    return (
        <div className="absolute p-2 shadow-lg shadow-gray-800/70 bg-gray-800 rounded-md">
            <button onClick={() => props.setDetailView((prev: boolean) => !prev)} className="bg-gray-500 rounded-md px-1 hover:bg-emerald-600 duration-300 text-gray-300 hover:text-gray-800">Close</button>
        <div className=" max-h-screen p-3 rounded-md overflow-y-scroll">

        <div>
            <div className="flex mb-2 justify-between mx-4 items-center">
                <h1 className="text-gray-300 text-left text-sm">log/{viewBale.parentLog}</h1>
                <div className="flex justify-center items-center">
                <Image
                    src={'data:image/jpeg;base64,' + viewBale.userPFP}
                    alt=""
                    width={30}
                    height={30}
                    className="mr-2 w-10 rounded-full"
                />
                <div className="flex justify-center items-center text-xs font-light text-gray-300">
                    <p>u/</p>
                    <p>{viewBale.userName}</p>
                </div>
                </div>
            </div>
            <div className="bg-gray-300 rounded-t-md flex p-3">
                <h1 className="text-lg sm:text-2xl font-light">{viewBale.title}</h1>
            </div>
            <div className="bg-gray-400 rounded-b-md flex p-3">
                <h1 className="text-sm sm:text-lg font-light">{viewBale.body}</h1>
            </div>
        </div>

        <div className="bg-gray-700/70 mt-2 pb-2 px-2 sm:px-5 rounded-md">
        <form className="" onSubmit={handleSubmit}>
                
                <div className='w-full flex flex-col my-2'>
                <label className="text-gray-200 font-light" htmlFor='comment'>Comment</label>
                <textarea 
                    className="rounded-md font-normal" 
                    rows={3} 
                    placeholder="Give us some context!" 
                    name='comment' 
                    required 
                    minLength={10} maxLength={600} 
                />
                </div>
                <button className="px-2 font-normal hover:text-gray-800 hover:bg-emerald-600 duration-300 text-gray-200 bg-gray-500 rounded-md">Submit</button>
            </form>
        </div>
        </div>

        </div>
    )
}