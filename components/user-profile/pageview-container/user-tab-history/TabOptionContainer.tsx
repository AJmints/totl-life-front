'use client'

import { useState } from "react"
import UserBalesContainer from "./river-contents-container/user-bale-container/UserBalesContainer"
import BackPackContainer from "./backpack-container/BackPackContainer"
import LoadingTabOptions from "./LoadingTabOptions"
import UserCommentContainer from "./river-contents-container/user-comment-container/UserCommentContainer"
import UserLogContainer from "./river-contents-container/user-log-container/UserLogContainer"
import SavedPostContainer from "./river-contents-container/saved-post-container/SavedPostContainer"
import InfoEditorContainer from "../social-option-container/SocialOptionContainer"
import RiverContentsContainer from "./river-contents-container/RiverContentsContainer"
import UserFriendContainer from "./user-friend-container/UserFriendContainer"

const TabOptionContainer = (props: any) => {

    const [ tab, setTabs  ] = useState<"backpack" | "river" | "events" | "friends">("backpack")
    const [backPack, setBackPack] = useState(true) 
    const [loadingTab, setLoadingTab] = useState(false)

    const handleTab = async(name:any) => {

        switch(name) {
            case "backpack":
                setTabs(name)
                break
            case "river":
                setTabs(name)
                break
            case "events":
                setTabs(name)
                break
            case "friends":
                setTabs(name)
                break
            default:
                setTabs("backpack")
                break
        }
    
    }

    return (
        <div className="">
            <div className="flex">
            <div className="grid grid-cols-4 gap-2 md:flex text-sm mt-3 md:space-x-2 bg-gray-400 p-2 rounded-md rounded-b-none">
                <button className="bg-gray-500 p-1 rounded-md hover:bg-emerald-500 duration-300 shadow-md" onClick={() => handleTab("backPack")}>BackPack</button>
                <button className="bg-gray-500 p-1 rounded-md hover:bg-emerald-500 duration-300 shadow-md" onClick={() => handleTab("river")}>River</button>
                <button className="bg-gray-500 p-1 rounded-md hover:bg-emerald-500 duration-300 shadow-md" onClick={() => handleTab("events")}>Events</button>
                <button className="bg-gray-500 p-1 rounded-md hover:bg-emerald-500 duration-300 shadow-md" onClick={() => handleTab("friends")}>Friends</button>
            </div>
            </div>
            <div className=" p-2 bg-gray-500 rounded-md rounded-tl-none">

                { loadingTab && <LoadingTabOptions /> }
                
                { tab === "backpack" && <BackPackContainer 
                    userInformation={props.userInformation}/> }

                { tab === "river" && <RiverContentsContainer />}

                { tab === "friends" && <UserFriendContainer />}
                
                
            </div>
        </div>
    )
}

export default TabOptionContainer