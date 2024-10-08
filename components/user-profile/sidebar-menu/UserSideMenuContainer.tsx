'use client'

import Image from "next/image"
import picDefault from "../../../public/icons/profile-pic.png"
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation"
import { useUserContext } from "@/app/context/UserContextProvider"
import LogsByUserContainer from "./logs-by-user/LogsByUserContainer"
import { URL } from "@/lib/globalConstants"

export const authCheck = async() => {
    const infoCall = await fetch("/api/authCheck")
   const status = await infoCall.json().catch((err) => {
       console.log(err)
   })
   if (status.loggedIn) {
        return status.loggedIn
   }
}

export const authToken = async() => {
    const res = await fetch('api/headers')
    const check = await res.json().catch((err) => {
        console.log(err)
    })
    return check
}

export default function UserOptions(props: any) {

    const [ PFPLocal, setPFPLocal ] = useState<any>()
    const [pfpMessage, setPfpMessage] = useState<string>("")
    const [pfpBool, setPfpBool] = useState<boolean>(false)
    

    const { userPFP, userName, userID, setUserPFP } = useUserContext()
    const router = useRouter()

    useEffect(() => {
        setPFPLocal(userPFP)
    }, [])

    const updateImage = async(e: any) => {
        e.preventDefault()

        setPfpBool(false)
        setPfpMessage("")

        if (e.target.files === undefined || e.target.files === null || !e.target.files) {
            // Let user know something went wrong
            return
        } else if (e.target.files[0].size > 1024000) {
            // Let user know image is too large
            setPfpBool(true)
            setPfpMessage("Image is too large, select a 1mb file or less")
            return
        }

        const newImageFormData = new FormData() 
        newImageFormData.append('image', e.target.files[0], userID)

        await fetch( URL + "/profile/upload-pfp",  {
            method: "POST",
            body: newImageFormData
        }).then((res) => res.json()).then((data) => {
            setUserPFP('data:image/jpeg;base64,' + data.image)
            setPFPLocal('data:image/jpeg;base64,' + data.image)
            return
        })
        
    }

    return (

        <div className="flex justify-center pt-10">
            <div className="block">
            <div className="text-center">
                { userPFP !== null ?
                <Image 
                src={userPFP}
                alt=""
                width={100}
                height={100} // TODO: Auto-crop image to a 1:1 dimension to store in db
                className="w-32 h-32 hover:p-1 bg-emerald-500 duration-500 cursor-pointer mx-auto rounded-full shadow-lg shadow-gray-800"
                onClick={() => router.push("/user/" + userName)}
                />
                :    
                <Image
                    src={picDefault}
                    alt=""
                    className="w-32 h-auto mx-auto rounded-full cursor-pointer shadow-lg shadow-gray-800"
                    onClick={() => router.push("/user/" + userName)}
                />}
            <div className="mt-3">
                <form method="POST" encType="multipart/form-data">
                <input id="imgUpload" type="file" accept="image/*" style={{ display: 'none'}} onChange={updateImage}  />
                <label className="cursor-pointer shadow-lg shadow-gray-800 p-1 text-xs rounded-md mx-auto bg-emerald-500 hover:bg-emerald-300 duration-500" htmlFor="imgUpload">Change PFP</label>
                </form>
                { pfpBool ? 
                <p className=" w-44 text-red-500 mt-2">{pfpMessage}</p>
                :
                <></>}
            </div>
            </div>
            
            <div className="bg-gray-600 mt-3 mx-2 grid grid-cols-1 p-2 rounded-md">
                <p 
                    className="text-xl border-b-2 text-gray-200 cursor-pointer hover:text-green-500 duration-300 border-gray-400"
                    onClick={() => router.push("/user/" + userName)}
                >
                    t/{userName}
                </p>
            </div>

            <LogsByUserContainer />

            <div className="flex mt-10 justify-center space-x-2">
                <button className="bg-emerald-500 hover:bg-emerald-700/80 duration-300 shadow-lg shadow-gray-800 text-gray-300 p-2 rounded-md" onClick={() => router.push("/support")}>Support</button>
                <button onClick={() => props.logout()} className="bg-rose-600/80 duration-300 hover:bg-red-800 p-2 text-gray-300 shadow-lg shadow-gray-800 rounded-md">Log Out</button>
            </div>            
            </div>
            </div>
    )
}