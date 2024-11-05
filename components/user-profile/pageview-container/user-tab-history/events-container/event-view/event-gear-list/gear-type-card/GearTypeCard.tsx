'use client'

import { useState } from "react"


const GearTypeCard = (props: any) => {

    const [toggle, setToggle] = useState(false)

    const t = (
        <div className="hover:bg-emerald-400 bg-gray-300 duration-200 p-2 rounded-md text-xs flex justify-between">
            <div>
                <p>Type: Sleep Gear</p>
                <p>Name: Sleeping bag</p>  
            </div>
            <div className="flex flex-col gap-1">
                <button className="bg-gray-400 p-1 rounded-md">Lend to</button>  {/* make a lending tracker feature as additonal option. When you lend gear out, you can track its whereabouts with ease */}
                <p>UserName</p>
            </div>
        </div>
    )

    const arr = [t,t,t,t,t,t,t,t,t,t,t,t,t,t,t]

    let num = arr.length
    const loop = arr.map((item) => {
        num--
        return (
            <div  onClick={() => props.setItemDetail(item)} className="cursor-pointer" key={num}>
                {item}
            </div>   
        )
    })

    return (
        <div className="bg-gray-400 p-1 rounded-md flex flex-col gap-2">
            <div className="bg-gray-400 p-1 rounded-md gap-1 flex justify-around">
                <div className="bg-gray-300 w-[30%] p-1 h-28 rounded-md">
                    Gear Image
                </div>

                <div className="bg-gray-300 p-1 w-[70%] rounded-md flex gap-5 justify-between">
                    <div className="w-[70%] bg-gray-200 p-2 rounded-md">
                        <p className="h-[50%] xl:text-lg bg-gray-400 rounded-md p-1 flex items-center text-center text-gray-50">Gear Type</p>
                        <p className="h-[50%] text-3xl mt-2">Tool</p>
                    </div>
                    <div className="flex flex-col w-[30%]">
                        <div className="h-[50%]">
                        </div>
                        <div className="h-[50%] bg-gray-200 rounded-md">
                            <p className="text-center mt-2 text-3xl">x12</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-300 p-1 rounded-md flex justify-between">
                <p>Missing : 3 from rec list</p>
                <div>
                    <button onClick={() => setToggle((prev: any) => !prev)} className="px-2 py-1 bg-gray-400 rounded-md">{!toggle ? "view" : "hide"}</button>
                </div>
            </div>
            <div className={"bg-gray-300 p-1 h-56 rounded-md flex flex-col overflow-y-scroll scroll-track scroll-w scroll-handle" + (!toggle ? " hidden" : " ")}>
                {loop}
            </div>
        </div>
    )
}

export default GearTypeCard