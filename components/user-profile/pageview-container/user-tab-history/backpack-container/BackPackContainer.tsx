'use client'

import { useEffect, useState } from "react"
import { useUserContext } from "@/app/context/UserContextProvider"

const URL: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL

const BackPackContainer = (props: any) => {

    const [ packStatus, setPackStatus ] = useState(false)

    const { userName } = useUserContext()

    useEffect(() => {
        const checkPack = async() => {
            
            if(props.userName === "") {
                return
            }

            try {
                const createPack = await fetch(URL + "/profile/checkPack/" + props.userName)
                const response = await createPack.json().catch((err) => {
                    console.log(err)
                })
                if (response.status === "success") {
                    setPackStatus(true)
                }
            } catch (e: any) {
                console.log(e.message)
                return
            }


        }   
        
        checkPack()
    }, [])

    const createPack = async() => {

        const createPack = await fetch(URL + "/profile/makePackPack/" + props.userName)
        const response = await createPack.json().catch((err) => {
            console.log(err)
        })

        if (response.status === "success") {

            setPackStatus(true)
        }

    }

    return (
        <div className="mt-5">
            <p>Right column</p>
            <li>BackPack Feature</li>
            
            {packStatus ? 
                <li>Pack Made</li>
                :
                <>
                <p>No pack present</p>
                {
                props.userName === userName ?
                <button onClick={() => createPack()} className="bg-emerald-500 p-1 rounded-md hover:bg-yellow-500 text-gray-800 duration-200">Create Backpack</button>
                :
                <></>
                }
                </>
            }   
            
        </div>
    )
}

export default BackPackContainer