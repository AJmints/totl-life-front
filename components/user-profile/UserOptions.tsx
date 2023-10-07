'use client'

import Image from "next/image"
import picDefault from "../../public/icons/profile-pic.png"
import { useEffect, useState } from 'react'

export const authCheck = async() => {
    const infoCall = await fetch("/api/authCheck")
   const status = await infoCall.json().catch((err) => {
       console.log(err)
   })
   
   if (status.token) {
       console.log("success!")
   }

}

export default function UserOptions(props: any) {

    useEffect(() => {
        authCheck()
    }, [])

    return (
        <div className="flex justify-center">
            <div className="block">
            
            <div className="text-center">
                <Image
                    src={picDefault}
                    alt=""
                    className="w-32 h-auto mx-auto rounded-full shadow-lg shadow-gray-800"
                />
            <div className="">
                <button className="bg-gray-300 p-1 rounded-md mt-3">change photo</button>
            </div>
            </div>
            
            <div className="bg-gray-600 mt-10 p-2 rounded-md">
                <p className="text-3xl border-b-2 border-gray-400">User Information</p>
                <h1>UserName: </h1>
                <h2>Contact: </h2>
                <h3>Information: </h3>
            </div>

            <div className="flex mt-10 justify-center">
                <button onClick={() => props.logout()} className="bg-rose-600/80 hover:bg-red-800  p-2  text-gray-300 shadow-lg shadow-gray-800 rounded-md">Log Out</button>
            </div>
            
            </div>
        </div>
    )
}