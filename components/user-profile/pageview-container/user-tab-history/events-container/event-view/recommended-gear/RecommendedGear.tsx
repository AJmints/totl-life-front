'use client'

import { useState } from "react"

const RecommendedGearContainer = () => {

    const [toggle, setToggle] = useState(true)

    const fixed = 1
    const t = (
        <div className="bg-gray-300 p-1 flex justify-around rounded-md text-xs">
            <div>
                <p>Name: BackPack</p>
                <p>Type: Pack</p>
            </div>
            <div className="text-right">
                <p>Quantity:</p>
                <p>x2 Group/Per Person</p>
            </div>
            
        </div>
    )

    const arr = [t,t,t,t,t,t,t,t,t,t,t,t,t,t,t]

    let num = arr.length
    const loop = arr.map((item) => {
        num--
        return (
            <div key={num}>
                {item}
            </div>   
        )
    })

    return (
        
        <div className="p-1 w-full bg-gray-400 h-[26rem] space-y-1 rounded-md">
            <div className={" flex flex-col gap-1" + (toggle ? " h-[40%]" : " h-[20%]")}>
                <h1 className="font-semibold text-base bg-gray-200 p-2 rounded-md">Recommended Gear</h1>
                <div className="flex justify-around bg-gray-300 px-1 rounded-md items-center">
                    <h1 className="font-semibold text-sm text-center">Filter</h1>
                    <button onClick={() => setToggle((prev: any) => !prev)} className="bg-gray-200 px-2 my-1 rounded-md">{toggle ? "Hide" : "Show"}</button>
                </div>
                <div className={"bg-gray-300 rounded-md p-1 grid grid-cols-4 gap-2 justify-between text-xs border-b-2 border-gray-500" + (toggle ? " " : " hidden")}>
                    <button className="bg-gray-200 rounded-md py-2 p-1">D</button> {/* Pack */}
                    <button className="bg-gray-200 rounded-md p-1">D</button> {/* Tent */}
                    <button className="bg-gray-200 rounded-md p-1">D</button> {/* Sleep */}
                    <button className="bg-gray-200 rounded-md p-1">D</button> {/* Kitchen */}
                    <button className="bg-gray-200 rounded-md py-2 p-1">D</button> {/* Tools */}
                    <button className="bg-gray-200 rounded-md p-1">D</button> {/* Lighting */}
                    <button className="bg-gray-200 rounded-md p-1">D</button> {/* Clean */}
                    <button className="bg-gray-200 rounded-md p-1">D</button> {/* Clothes */}
                </div>
            </div>
            <div className={"flex flex-col" + (toggle ? " h-[50%] " : " h-[70%]")}>

                <div className=" p-1 flex flex-col gap-1 overflow-y-scroll scroll-track scroll-w scroll-handle">
                    {loop}
                </div>

            </div>
            <div className="h-[10%] flex items-center">
                <button className="bg-gray-300 px-1 rounded-md">Add Gear</button>
            </div>
        </div>
    )
}

export default RecommendedGearContainer