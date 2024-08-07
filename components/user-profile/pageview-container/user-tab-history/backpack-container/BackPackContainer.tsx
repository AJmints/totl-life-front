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

    const { userName, userGearList } = useUserContext()

    useEffect(() => {
        if (userGearList.length >= 0) {
            setPackContents(true)
        }
    }, [])

    return (
        <div className="m-2 ">

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

                    <div className="">
                        <div>
                            {
                                props.userInformation.name === userName ? 
                                <div className="">
                                    <button onClick={() => setUpdate(prev => !prev)} className="bg-gray-400 rounded-md p-2 hover:bg-emerald-500 duration-300">{update ? "View Your Items" : "Update Pack"}</button>
                                </div>
                                :
                                <></>
                            }
                            {/* {
                                update ?
                                <div>
                                    <button onClick={() => console.log(userGearList)} className="bg-gray-400 rounded-md p-2 hover:bg-emerald-500 duration-300 mt-2">Add Configuration</button>
                                </div>
                                :
                                <></>
                            } */}
                        </div>
                    </div>

                </div>
            <div>


            <div>
                <div className="p-2 text-gray-800 bg-gray-300  rounded-md mt-2">

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