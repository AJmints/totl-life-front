'use client'

import { useEffect, useState } from "react"
import { useUserContext } from "@/app/context/UserContextProvider"
import backPack from '../../../../../public/icons/backpack.png'
import addSign from '../../../../../public/icons/add-white.png'
import Image from "next/image"

const URL: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL

const BackPackContainer = (props: any) => {

    const [ packStatus, setPackStatus ] = useState(false)
    const [ packCreate, setPackCreate ] = useState(false)

    const { userName } = useUserContext()

    useEffect(() => {
        const checkPack = async() => {
            setPackCreate(true)
            if(props.userName === "" || props.userName === undefined) {
                setPackCreate(false)
                return
            }

            try {
                const createPack = await fetch(URL + "/profile/checkPack/" + userName)
                const response = await createPack.json().catch((err) => {
                    console.log(err)
                })
                if (response.status === "success") {
                    setPackStatus(true)
                    setPackCreate(false)
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
        <div className="m-2 flex">

            <div>
                <div className="flex justify-between">
                    <div className="bg-gray-400 p-2 rounded-md sm:flex items-end">
                        <Image
                        src={backPack}
                        alt=""
                        className="w-14 sm:w-20 h-auto rounded-md"
                        />
                        <h1 className="text-3xl ml-2 mt-2 sm:mt-0">{props.userName === userName ? "Your BackPack:" : props.userName + "'s BackPack"}</h1>
                    </div>
                    
                    <div className="ml-2">
                        <Image
                            src={addSign}
                            alt=""
                            className="w-10 h-auto rounded-full p-2 bg-emerald-600 mx-auto hover:bg-yellow-500 duration-300 cursor-pointer"    
                        />
                        <h1 className="text-lg ml-2">Add Item</h1>
                    </div>
                </div>
            <div>

            <div>
                <div className="p-10  text-gray-800 bg-gray-300 md:w-[40rem] rounded-md mt-2">

                    {packStatus ? 
                        <li>No items present</li>
                        :
                        <>
                        <p>No pack present</p>
                        {
                        props.userName === userName ?
                        <>
                        {
                            packCreate ? 
                            <button onClick={() => createPack()} className="bg-emerald-500 p-1 rounded-md hover:bg-yellow-500 duration-200">Create Backpack</button>
                            :
                            <button onClick={() => console.log("creating")} className="bg-yellow-500 p-1 rounded-md duration-200">Creating BackPack</button>
                        }
                        </>
                        :
                        <></>
                        }
                        </>
                    } 

                </div>
            </div>

              

            </div>
            </div>
            
        </div>
    )
}

export default BackPackContainer