'use client'

import { useState } from "react"
import UserBalesContainer from "./user-bale-container/UserBalesContainer"
import BackPackContainer from "./backpack-container/BackPackContainer"
import LoadingTabOptions from "./LoadingTabOptions"
import UserCommentContainer from "./user-comment-container/UserCommentContainer"
import UserLogContainer from "./user-log-container/UserLogContainer"
import SavedPostContainer from "./saved-post-container/SavedPostContainer"
import InfoEditorContainer from "../info-and-editor-container/InfoEditorContainer"

const TabOptionContainer = (props: any) => {

    const [backPack, setBackPack] = useState(true)
    const [bales, setBales] = useState(false)
    const [comments, setComments] = useState(false)
    const [saved, setSaved] = useState(false)
    const [yourLogs, setYourLogs] = useState(false)
    const [social, setSocial] = useState(false)
    const [loadingTab, setLoadingTab] = useState(false)

    const handleTab = async(name:any) => {

        setLoadingTab(true)
        setBackPack(false)
        setYourLogs(false)
        setBales(false)
        setComments(false)
        setSaved(false)
        setSocial(false)
        
        if (name === "backPack") {
            setBackPack(true)
        }
        if (name === "yourLogs") {
            setYourLogs(true)    
        }
        if (name === "bales") {
            setBales(true)    
        }
        if (name === "comments") {
            setComments(true)    
        }
        if (name === "saved") {
            setSaved(true)    
        }
        if(name === "social") {
            setSocial(true)
        }

        setLoadingTab(false)
    }

    return (
        <div className="">
            <div className="flex">
            <div className="grid grid-cols-3 gap-2 md:flex text-sm mt-3 md:space-x-2 bg-gray-400 p-2 rounded-md rounded-b-none">
                <button className="bg-gray-500 p-1 rounded-md hover:bg-emerald-500 duration-300 shadow-md" onClick={() => handleTab("backPack")}>BackPack</button>
                <button className="bg-gray-500 p-1 rounded-md hover:bg-emerald-500 duration-300 shadow-md" onClick={() => handleTab("yourLogs")}>Logs</button>
                <button className="bg-gray-500 p-1 rounded-md hover:bg-emerald-500 duration-300 shadow-md" onClick={() => handleTab("bales")}>Bales</button>
                <button className="bg-gray-500 p-1 rounded-md hover:bg-emerald-500 duration-300 shadow-md" onClick={() => handleTab("comments")}>Comments</button>
                <button className="bg-gray-500 p-1 rounded-md hover:bg-emerald-500 duration-300 shadow-md" onClick={() => handleTab("saved")}>Saved</button>
                <button className="bg-gray-500 p-1 rounded-md hover:bg-emerald-500 duration-300 shadow-md xl:hidden" onClick={() => handleTab("social")}>Social</button>

            </div>
            </div>
            <div className=" p-2 bg-gray-500 rounded-md rounded-tl-none">

                {
                    loadingTab ? 
                    <LoadingTabOptions />
                    :
                    <></>
                }
                
                {
                    backPack ? 
                    <BackPackContainer 
                    userInformation={props.userInformation}/>
                    :
                    <></>
                }

                {
                    yourLogs ?
                    <UserLogContainer />
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
                    comments ?
                    <UserCommentContainer />
                    :
                    <></>
                }

                {
                    saved ? 
                    <SavedPostContainer />
                    :
                    <></>
                }

                {
                    social ? 
                    <InfoEditorContainer />
                    :
                    <></>
                }
                
                
            </div>
        </div>
    )
}

export default TabOptionContainer