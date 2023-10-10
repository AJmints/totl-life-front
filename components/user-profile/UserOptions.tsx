'use client'

import Image from "next/image"
import picDefault from "../../public/icons/profile-pic.png"
import { useEffect, useState } from 'react'

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

const authToken = async() => {
    const res = await fetch('api/headers')
    const check = await res.json().catch((err) => {
        console.log(err)
    })
    // console.log(check)
    return check
}

export default function UserOptions(props: any) {

    useEffect(() => {
        authCheck()
    }, [])

    const updateImage = async(e: any) => {
        e.preventDefault()

        if (e.target.files === undefined || e.target.files === null || !e.target.files) {
            // Let user know something went wrong
            return
        } else if (e.target.files[0].size > 1024000) {
            // Let user know image is too large
            return
        }

        const newImageFormData = new FormData() 
        newImageFormData.append('image', e.target.files[0], USER_ID)

        await fetch( URL + "/profile/upload-pfp",  {
            method: "POST",
            body: newImageFormData
        }).then((res) => res.json()).then((data) => {
            props.setUserPFP('data:image/jpeg;base64,' + data.image)
        })
        
    }

    return (
        <div className="flex justify-center">
            <div className="block">
                
            <div className="text-center">
                { true ?
                <Image 
                src={props.userPFP}
                alt=""
                width={100}
                height={100}
                className="w-32 hover:p-1 bg-emerald-500 duration-500 h-auto mx-auto rounded-full shadow-lg shadow-gray-800"
                />
                :    
                <Image
                    src={picDefault}
                    alt=""
                    className="w-32 h-auto mx-auto rounded-full shadow-lg shadow-gray-800"
                />}
            <div className="mt-3">
                <form method="POST" encType="multipart/form-data">
                <input id="imgUpload" type="file" accept="image/*" style={{ display: 'none'}} onChange={updateImage}  />
                <label className="cursor-pointer shadow-lg shadow-gray-800 p-1 rounded-md mx-auto bg-emerald-500 hover:bg-emerald-300 duration-500" htmlFor="imgUpload">Change PFP</label>
                </form>
            </div>
            </div>
            
            <div className="bg-gray-600 mt-5 mx-2 p-2 rounded-md flex">
                <p className="text-3xl border-b-2 text-gray-200 border-gray-400">{props.userName}</p>
            </div>

            <div className="flex mt-10 justify-center space-x-2">
                <button className="bg-emerald-500 hover:bg-emerald-700/80 duration-300 shadow-lg shadow-gray-800 text-gray-300 p-2 rounded-md">Settings</button>
                <button onClick={() => props.logout()} className="bg-rose-600/80 duration-300 hover:bg-red-800 p-2 text-gray-300 shadow-lg shadow-gray-800 rounded-md">Log Out</button>
            </div>
            
            </div>
        </div>
    )
}