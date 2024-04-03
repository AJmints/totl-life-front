'use client'

import { useEffect, useState } from "react"
import { useUserContext } from "@/app/context/UserContextProvider"
import backPack from '../../../../../public/icons/backpack.png'
import Image from "next/image"
import BackPackViewer from "./back-pack-viewer/BackPackViewer"
import BackPackEditorContainer from "./back-pack-editor/BackPackEditorContainer"

const URL: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL

const BackPackContainer = (props: any) => {

    const [ packContents, setPackContents ] = useState(false)
    const [ update, setUpdate ] = useState(false)

    const { userName } = useUserContext()

    useEffect(() => {
        const checkPack = async() => {

            try {
                const createPack = await fetch(URL + "/backpack/get-users-gear-list/" + props.userInformation.id)
                const response = await createPack.json().catch((err) => {
                    console.log(err)
                })
                // console.log(response)
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
                <div className="flex gap-2 justify-between">

                    <div className="bg-gray-400 p-2 rounded-md sm:flex items-end">
                        <Image
                        src={backPack}
                        alt=""
                        className="w-14 sm:w-20 h-auto rounded-md"
                        />
                        <h1 className="text-2xl sm:text-3xl ml-2 mt-2 sm:mt-0">{props.userInformation.name === userName ? "Your BackPack:" : props.userInformation.name + "'s BackPack"}</h1>
                    </div>

                    <div className="flex items-end">
                        <div>
                            {
                                props.userInformation.name === userName ? 
                                <div className="">
                                    <button onClick={() => setUpdate(prev => !prev)} className="bg-gray-400 rounded-md p-2 hover:bg-emerald-500 duration-300">{update ? "Go Back" : "Update Pack"}</button>
                                </div>
                                :
                                <></>
                            }
                            {
                                update ?
                                <div>
                                    <button onClick={() => setUpdate(prev => !prev)} className="bg-gray-400 rounded-md p-2 hover:bg-emerald-500 duration-300 mt-2">Add Configuration</button>
                                </div>
                                :
                                <></>
                            }
                        </div>
                    </div>

                </div>
            <div>


            <div>
                <div className="p-2 text-gray-800 bg-gray-300 md:w-[40rem] rounded-md mt-2">

                {
                    update ? 
                    <BackPackEditorContainer />
                    :
                    <BackPackViewer
                    packContents={packContents}
                    />
                }
            
                </div>
            </div>
              

            </div>
            </div>
            
        </div>
    )
}

export default BackPackContainer