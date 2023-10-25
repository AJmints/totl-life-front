'use client'

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

export default function NewBalePost(props:any) {

    const forumPostMock = {
        id: 1,
        parentLog: "Example",
        userName: "talkingDuck",
        userPic: "userImg",
        upCount: 56,
        downCount: 5,
        commentCount: 29,
        saveCount:8,
        shareCount: 2,
        saved: false,
        title: "This is an example of a exciting title that is meant to brief and explain the subject.",
        preview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisiDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }

    const handleSubmit = async(e:any) => {
        e.preventDefault()

        await authCheck()

        const data = {
            parentLog: props.logName,
            userId: USER_ID,
            title: e.target.title.value,
            body: e.target.body.value
        }
        console.log(props.logName)
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
        })
        if (e.target.title.value === response.title) {
        e.target.title.value = ""
        e.target.body.value = ""
        props.setAllLogsBales([...props.allLogsBales, response])
        props.setCreatePost(false)
        }
        USER_ID = ""
    }

    return (
        <>
        <div className="bg-gray-700/70 mt-2 px-2 sm:px-5 rounded-md">
        <form className="pb-2" onSubmit={handleSubmit}>
                
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
                <button className="px-2 font-normal hover:text-gray-800 hover:bg-emerald-600 duration-300 text-gray-200 bg-gray-500 rounded-md">Submit</button>

            </form>
        </div>
        </>
    )
}