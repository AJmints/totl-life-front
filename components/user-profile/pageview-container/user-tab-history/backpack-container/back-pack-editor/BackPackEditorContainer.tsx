'use client'

import Image from "next/image"
import addSign from '../../../../../../public/icons/add-white.png'
import { useState, useEffect } from 'react'
import AddGearForm from "./add-gear-form/AddGearForm"
import ModifyGearDisplay from "./modify-gear-display/ModifyGearDisplay"

const BackPackEditorContainer = () => {

    const [ add, setAdd ] = useState(false)

    return (
        <div className="">
           
            <div className="flex items-center">
                <div>
                <Image
                    src={addSign}
                    alt=""
                    className={add ? "w-8 h-auto rounded-full rotate-45 p-1 bg-red-600 mx-auto hover:bg-yellow-500 duration-300 cursor-pointer" 
                    : "w-8 h-auto rounded-full p-1 bg-emerald-600 mx-auto hover:bg-yellow-500 duration-300 cursor-pointer"}
                    onClick={() => setAdd(prev => !prev)}
                />
                <h1 className="">{add ? "Cancel" : "Add Gear"}</h1>
                </div>
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