'use client'

import Image from "next/image"
import addSign from '../../../../../../public/icons/add-white.png'
import { useState, useEffect } from 'react'
import AddGearForm from "./add-gear-form/AddGearForm"
import ModifyGearDisplay from "./modify-gear-display/ModifyGearDisplay"
import CreatePackForm from "./create-pack-form/CreatePackForm"
import EditPackForm from "./edit-pack-form/EditPackForm"

const BackPackEditorContainer = () => {

    const [ standard, setStandard ] = useState(true)
    const [ add, setAdd ] = useState(false)
    const [ packCreate, setPackCreate ] = useState(false)
    const [ packEdit, setPackEdit ] = useState(false)

    const handleOptionsToggle = (toggle: string) => {

        switch (toggle) {
            case "add":
                setStandard(false)
                setPackCreate(false)
                setPackEdit(false)
                setAdd(true)
                break
            case "packEdit":
                setStandard(false)
                setAdd(false)
                setPackCreate(false)
                setPackEdit(true)
                break
            case "packCreate":
                setPackCreate(true)
                setPackEdit(false)
                setStandard(false)
                setAdd(false)
                break
            default:
                setStandard(true)
                setAdd(false)
                setPackCreate(false)
                setPackEdit(false)
                break
        }

    }

    return (
        <div className=" font-light">

            <div className="bg-gray-400 p-1 rounded-md my-2 sm:flex items-center">
                    
                <div className="flex mb-2 sm:mb-0">
                    <div className="flex items-center p-1 bg-slate-300 mr-2 rounded-md cursor-pointer hover:bg-yellow-500 duration-500" 
                    onClick={ !add ? () => handleOptionsToggle("add") : () => handleOptionsToggle("default")}>
                        <div>
                        <h1 className="mr-2">{add ? "Cancel: " : "Add Gear: "}</h1>
                        </div>
                        <div>
                        <Image
                            src={addSign}
                            alt=""
                            className={add ? "w-8 h-auto rounded-full rotate-45 p-1 bg-red-600 mx-auto hover:bg-yellow-700 duration-300 cursor-pointer" 
                            : "w-8 h-auto rounded-full p-1 bg-emerald-600 mx-auto hover:bg-yellow-700 duration-300 cursor-pointer"}
                        />
                        </div>
                    </div>
                </div>

                <div className="flex mb-2 sm:mb-0">
                    <div className="flex items-center p-1 bg-slate-300 mr-2 rounded-md cursor-pointer hover:bg-yellow-500 duration-500" 
                    onClick={ packEdit ? () => handleOptionsToggle("default") : () => handleOptionsToggle("packEdit") }>
                        <div>
                        <h1 className="mr-2">{packEdit ? "Cancel: " : "Edit Pack: "}</h1>
                        </div>
                        <div>
                        <Image
                            src={addSign}
                            alt=""
                            className={packEdit ? "w-8 h-auto rounded-full rotate-45 p-1 bg-red-600 mx-auto hover:bg-yellow-700 duration-300 cursor-pointer" 
                            : "w-8 h-auto rounded-full p-1 bg-emerald-600 mx-auto hover:bg-yellow-700 duration-300 cursor-pointer"}
                        />
                        </div>
                    </div>
                </div>

                <div className="flex mb-2 sm:mb-0">
                    <div className="flex items-center p-1 bg-slate-300 mr-2 rounded-md cursor-pointer hover:bg-yellow-500 duration-500" 
                    onClick={ packCreate ? () => handleOptionsToggle("default") : () => handleOptionsToggle("packCreate")}>
                        <div>
                        <h1 className="mr-2">{packCreate ? "Cancel: " : "Create Pack: "}</h1>
                        </div>
                        <div>
                        <Image
                            src={addSign}
                            alt=""
                            className={packCreate ? "w-8 h-auto rounded-full rotate-45 p-1 bg-red-600 mx-auto hover:bg-yellow-700 duration-300 cursor-pointer" 
                            : "w-8 h-auto rounded-full p-1 bg-emerald-600 mx-auto hover:bg-yellow-700 duration-300 cursor-pointer"}
                        />
                        </div>
                    </div>
                </div>

            </div>
           
            

            <>
            { standard ?
                <>
                <h1 className="text-lg font-light text-gray-700 border-gray-700 border-b-[1px] mb-2">Your Gear Items</h1>
                <ModifyGearDisplay />
                </>
                :
                <>
                    { add && <AddGearForm /> }
                    { packCreate && <CreatePackForm />}
                    { packEdit && <EditPackForm />}
                </>
            }
            </>

        </div>
    )
}

export default BackPackEditorContainer