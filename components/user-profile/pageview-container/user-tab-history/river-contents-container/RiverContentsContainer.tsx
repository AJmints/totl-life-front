'use client'

import { useState } from "react"
import UserLogContainer from "./user-log-container/UserLogContainer"
import UserBalesContainer from "./user-bale-container/UserBalesContainer"
import UserCommentContainer from "./user-comment-container/UserCommentContainer"
import SavedPostContainer from "./saved-post-container/SavedPostContainer"

const RiverContentsContainer = () => {

    const [ tab, setTab ] = useState<"logs" | "bales" | "comments" | "saved">("bales")

    const handleTab = async(name:any) => {

        switch(name) {
            case "logs":
                setTab(name)
                break
            case "bales":
                setTab(name)
                break
            case "comments":
                setTab(name)
                break
            case "saved":
                setTab(name)
                break
            default:
                setTab("logs")
                break
        }
    }

    return (
        <>

            <div className="flex">
                    <div className="grid grid-cols-3 gap-2 md:flex text-sm md:space-x-2 bg-gray-400 p-1 rounded-md">
                        <button className="bg-gray-500 p-1 rounded-md hover:bg-emerald-500 duration-300 shadow-md" onClick={() => handleTab("logs")}>Logs</button>
                        <button className="bg-gray-500 p-1 rounded-md hover:bg-emerald-500 duration-300 shadow-md" onClick={() => handleTab("bales")}>Bales</button>
                        <button className="bg-gray-500 p-1 rounded-md hover:bg-emerald-500 duration-300 shadow-md" onClick={() => handleTab("comments")}>Comments</button>
                        <button className="bg-gray-500 p-1 rounded-md hover:bg-emerald-500 duration-300 shadow-md" onClick={() => handleTab("saved")}>Saved</button>
                    </div>
                </div>
                <div className=" p-2 bg-gray-500 rounded-md rounded-tl-none">

                { tab === "logs" && <UserLogContainer /> }
                { tab === "bales" && <UserBalesContainer /> }
                { tab === "comments" && <UserCommentContainer /> }
                { tab === "saved" && <SavedPostContainer /> }
            </div>
        </>
    )
}

export default RiverContentsContainer