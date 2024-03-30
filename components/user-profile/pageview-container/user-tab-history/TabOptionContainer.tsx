'use client'

import { useState } from "react"
import UserBalesContainer from "./user-bale-container/UserBalesContainer"
import BackPackContainer from "./backpack-container/BackPackContainer"
import LoadingTabOptions from "./LoadingTabOptions"

const TabOptionContainer = (props: any) => {

    const [backPack, setBackPack] = useState(true)
    const [bales, setBales] = useState(false)
    const [comments, setComments] = useState(false)
    const [saved, setSaved] = useState(false)
    const [events, setEvents] = useState(false)
    const [yourLogs, setYourLogs] = useState(false)
    const [loadingTab, setLoadingTab] = useState(false)

    const handleTab = async(name:any) => {

        setLoadingTab(true)
        setBackPack(false)
        setBales(false)
        
        if (name === "bales") {
            setBales(true)    
        }
        if (name === "backPack") {
            setBackPack(true)
        }

        setLoadingTab(false)
    }

    return (
        <div className="">
            <div className="sm:flex mt-3 space-x-2">
                <button className="bg-gray-500 p-1 rounded-md hover:bg-emerald-500 duration-300 shadow-md" onClick={() => handleTab("backPack")}>Back Pack</button>
                <button className="bg-gray-500 p-1 rounded-md hover:bg-emerald-500 duration-300 shadow-md" onClick={() => handleTab("bales")}>Bales</button>
                <button className="bg-gray-500 p-1 rounded-md hover:bg-emerald-500 duration-300 shadow-md" onClick={() => handleTab("comments")}>Comments</button>
                <button className="bg-gray-500 p-1 rounded-md hover:bg-emerald-500 duration-300 shadow-md" onClick={() => handleTab("saved")}>Saved</button>
                <button className="bg-gray-500 p-1 rounded-md hover:bg-emerald-500 duration-300 shadow-md" onClick={() => handleTab("events")}>Events</button>
                <button className="bg-gray-500 p-1 rounded-md hover:bg-emerald-500 duration-300 shadow-md" onClick={() => handleTab("yourLogs")}>Your Logs</button>
            </div>
            <div className="mt-5 p-2 bg-gray-500 rounded-md">

                {
                    loadingTab ? 
                    <LoadingTabOptions />
                    :
                    <></>
                }

                {
                    bales ? 
                    <UserBalesContainer />
                    :
                    <></>
                }
                
                {
                    backPack ? 
                    <BackPackContainer 
                    userName={props.userName}/>
                    :
                    <></>
                }

                
                
            </div>
        </div>
    )
}

export default TabOptionContainer