'use client'

import Image from "next/image"
import addSign from '../../../../../../public/icons/add-white.png'
import { useState, useEffect } from 'react'
import AddGearForm from "./add-gear-form/AddGearForm"
import ModifyGearDisplay from "./modify-gear-display/ModifyGearDisplay"

const BackPackEditorContainer = () => {

    const [ add, setAdd ] = useState(false)
    const [ packToggle, setPackToggle ] = useState(false)

    return (
        <div className=" font-light">

            <div className="mb-2 flex gap-2 items-center">
                
                
                    <div className="flex items-center p-1 bg-slate-400 rounded-md cursor-pointer hover:bg-yellow-500 duration-500" onClick={() => setAdd(prev => !prev)}>
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

            <div className="bg-gray-400 p-1 rounded-md my-2">
                { packToggle ? 
                <div className="flex gap-2">
                    <div>
                    <button onClick={() => setPackToggle(false)} className="bg-gray-500 hover:bg-emerald-500 duration-200 rounded-md p-1">Edit Pack Configurations</button>
                    </div>
                    <div>
                    <button className="bg-gray-500 hover:bg-emerald-500 duration-200 rounded-md p-1">Add New Pack Configuration</button>
                    </div>
                </div>
                :
            <div className="md:flex grid grid-cols-2 gap-2 text-gray-100">
                <button onClick={() => setPackToggle(true)} className="p-1 bg-slate-600 text-gray-200 rounded-md">Go Back</button>
                <button className="bg-gray-500 hover:bg-emerald-500 duration-200 rounded-md p-1">Hiking Config Example</button>
                <button className="bg-gray-500 hover:bg-emerald-500 duration-200 rounded-md p-1">Floating Config Example</button>
            </div>
                }
            </div>
           
            

            <>
            { add ?
                <AddGearForm />
                :
                <ModifyGearDisplay />
            }
            </>

        </div>
    )
}

export default BackPackEditorContainer