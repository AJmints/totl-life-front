'use client'

import { useState } from "react"

const UserPackDetailsCard = (props : any) => {

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
            <div className="bg-gray-300 p-1 rounded-md flex justify-between">
                <div className="bg-gray-200 p-1 rounded-md w-[50%]">
                    <p>User: Name</p>
                    <p>Pack: Name</p>
                </div>
                <div className="bg-gray-200 p-1 h-28 rounded-md">
                    <p>Pack Image</p>
                </div>
            </div>

            <div className="bg-gray-300 p-1 rounded-md flex justify-between">
                <p>Missing : 3 from rec list</p>
                <div>
                    <button onClick={() => setToggle((prev: any) => !prev)} className="px-2 py-1 bg-gray-400 rounded-md">{!toggle ? "view" : "hide"}</button>
                </div>
            </div>
            <div className={"p-1 h-56 gap-2 rounded-md flex flex-col overflow-y-scroll scroll-track scroll-w scroll-handle" + (!toggle ? " hidden" : " ")}>
                {loop}
            </div>
        </div>
    )
}

export default UserPackDetailsCard