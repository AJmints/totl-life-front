'use client'

import { useState } from "react"
import UserBalesContainer from "./user-bale-container/UserBalesContainer"
import BackPackContainer from "./backpack-container/BackPackContainer"

const TabOptionContainer = (props: any) => {

    const [backPack, setBackPack] = useState(false)
    const [bales, setBales] = useState(false)
    const [comments, setComments] = useState(false)
    const [saved, setSaved] = useState(false)
    const [events, setEvents] = useState(false)
    const [yourLogs, setYourLogs] = useState(false)

    const handleTab = async(name:any) => {

        if (name === "bales") {
            setBales(true)
            setBackPack(false)
        }
        if (name === "backPack") {
            setBackPack(true)
            setBales(false)
        }
    }

    return (
        <div>
            <div className="sm:flex mt-3 space-x-2">
                <button className="bg-gray-500 p-1 rounded-md hover:bg-emerald-500 duration-300 shadow-md" onClick={() => handleTab("backPack")}>Back Pack</button>
                <button className="bg-gray-500 p-1 rounded-md hover:bg-emerald-500 duration-300 shadow-md" onClick={() => handleTab("bales")}>Bales</button>
                <button className="bg-gray-500 p-1 rounded-md hover:bg-emerald-500 duration-300 shadow-md" onClick={() => handleTab("comments")}>Comments</button>
                <button className="bg-gray-500 p-1 rounded-md hover:bg-emerald-500 duration-300 shadow-md" onClick={() => handleTab("saved")}>Saved</button>
                <button className="bg-gray-500 p-1 rounded-md hover:bg-emerald-500 duration-300 shadow-md" onClick={() => handleTab("events")}>Events</button>
                <button className="bg-gray-500 p-1 rounded-md hover:bg-emerald-500 duration-300 shadow-md" onClick={() => handleTab("yourLogs")}>Your Logs</button>
            </div>
            <div className="mt-5 p-2 px-5 bg-gray-500 rounded-md space-y-2">
                {
                    bales ? 
                    <UserBalesContainer />
                    :
                    <></>
                }
                
                {
                    backPack ? 
                    <BackPackContainer />
                    :
                    <></>
                }
                
            </div>
        </div>
    )
}

export default TabOptionContainer