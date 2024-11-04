'use client'

import { useState } from "react"
import FriendListContainer from "../../friend-list/FriendListContainer"
import { increment } from "@/lib/helpers/users/events/eventHelpers"


const EventGearSummary = () => {

    const [quickViewToggle, setQuickViewToggle] = useState(true)
    const [toggle, setToggle] = useState<any>()
    const [hideUsers, setHideUsers] = useState<any>()

    const t = (
        <div className="bg-gray-300 p-2 rounded-md text-xs flex justify-between">
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

    const q = (
        <div onClick={() => filterByType()} className="bg-gray-300 p-1 rounded-md flex justify-between hover:bg-emerald-500 duration-200 cursor-pointer">
            <div className="flex flex-col items-center">
                <p>Current</p>
                <p>0/5</p>
            </div>
            <p className=" flex items-center">Type: Item Type</p>
            <div className="py-4 bg-gray-200 rounded-md px-2">
                pic
            </div>
        </div>
    )

    const arr = [t,t,t,t,t,t,t,t,t,t,t,t,t,t,t]
    const arr2 = [q,q,q,q,q,q,q,q,q,q,q,q,q]

    let num = arr.length
    const loop = arr.map((item) => {
        num--
        return (
            <div key={num}>
                {item}
            </div>   
        )
    })

    let num2 = arr2.length
    const quickView = arr2.map((item) => {
        num2--
        return (
            <li key={num2}>
                {item}
            </li>   
        )
    })

    const filterByType = () => {
        console.log("Filter list by type selected and change to view gear with filtered list")
        setQuickViewToggle((prev) => !prev)
    }

    return (
        <div className="flex flex-col gap-2 h-full">
            <div className="">
                <p className="text-xl font-normal">QuickView:</p>
                <div className="flex">
                    <p>Total Missing Gear: </p>
                    <p className="text-red-600">x10</p>
                </div>
            </div>
            <div className={"p-2 bg-gray-400 rounded-md" + (hideUsers ? " hidden" : "")}>
                <FriendListContainer 
                    source={"gearSummary"}
                    setToggle={setToggle}
                    gearTotal={"9"}
                />
            </div>
            <div className={"p-1 bg-gray-400 rounded-md h-[100%] flex flex-col overflow-y-scroll scroll-track scroll-w scroll-handle " + ( hideUsers ? "lg:h-72 " : "lg:h-48 ")}>
                <div className="flex flex-col gap-1 ">
                    <div className="flex items-center justify-around bg-gray-300 p-1 rounded-md">
                        <button className="bg-gray-400 p-0.5 rounded-md px-2" onClick={() => setQuickViewToggle((prev: boolean) => !prev)}>{quickViewToggle ? "View All Gear" : "View By Type"}</button>
                        <button className="bg-gray-400 p-0.5 rounded-md px-2" onClick={() => setHideUsers((prev: boolean) => !prev)}>{ !hideUsers ? "Hide Frens" : "Show Frens"}</button>
                    </div>
                    { quickViewToggle ? 
                        <div>
                            <p className="text-center font-medium text-sm">Filter By:</p>
                            <ul className="flex flex-col gap-1">
                                {quickView}
                            </ul>
                        </div>
                    :
                        <>
                        {loop}
                        </>
                    }
                    
                </div>
                
            </div>
            
        </div>
    )
}

export default EventGearSummary