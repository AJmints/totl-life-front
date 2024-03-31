'use client'

import { useEffect, useState } from "react"
import { useUserContext } from "@/app/context/UserContextProvider"
import backPack from '../../../../../public/icons/backpack.png'
import Image from "next/image"

const URL: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL

const BackPackContainer = (props: any) => {

    const [ packContents, setPackContents ] = useState(false)

    const { userName } = useUserContext()

    useEffect(() => {
        const checkPack = async() => {

            try {
                const createPack = await fetch(URL + "/backpack/get-users-gear-list/" + props.userInformation.id)
                const response = await createPack.json().catch((err) => {
                    console.log(err)
                })
                if (response.status === "empty") {
                    setPackContents(true)
                } else {
                    setPackContents(false)
                }
            } catch (e: any) {
                console.log(e.message)
                return
            }


        }   
        
        checkPack()
    }, [])

    return (
        <div className="m-2 flex">

            <div>
                <div className="flex">
                    <div className="bg-gray-400 p-2 rounded-md sm:flex items-end">
                        <Image
                        src={backPack}
                        alt=""
                        className="w-14 sm:w-20 h-auto rounded-md"
                        />
                        <h1 className="text-3xl ml-2 mt-2 sm:mt-0">{props.userInformation.name === userName ? "Your BackPack:" : props.userInformation.name + "'s BackPack"}</h1>
                    </div>
                </div>
            <div>

            <div>
                <div className="p-5  text-gray-800 bg-gray-300 md:w-[40rem] rounded-md mt-2">

                    {packContents ? 
                        <div>
                            <div className="flex flex-wrap gap-2">
                                <button className="bg-gray-400 hover:bg-emerald-500 duration-200 rounded-md p-2">All Gear</button>
                                <button className="bg-gray-400 hover:bg-emerald-500 duration-200 rounded-md p-2">BackPack Config 1</button>
                                <button className="bg-gray-400 hover:bg-emerald-500 duration-200 rounded-md p-2">BackPack Config 2</button>
                            </div>
                            <div className="mt-3">
                            <p>Gear Display:</p>
                            <li>No items present</li>
                            </div>
                        </div>
                        :
                        <></>
                    } 

                </div>
            </div>

              

            </div>
            </div>
            
        </div>
    )
}

export default BackPackContainer