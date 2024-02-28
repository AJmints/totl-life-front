'use client'

import AboutLogContainer from "./aboutlog-container/AboutLogContainter"
import { useState } from "react"
import FollowingLogs from "./log-following-container/FollowingLogs"
import PolicyLogs from "./policylog-container/policylogs"

const RightMenuContainer = () => {

    const [following, setFollowing] = useState<boolean>(false)

    return (
        <div className="bg-gray-800/90 hidden lg:flex rounded-md p-1">

            <div className="space-y-2">

            <AboutLogContainer 
            />

            <FollowingLogs 
            setFollowing={setFollowing}
            />

            <PolicyLogs
            setFollowing={setFollowing}
            />
            
            </div>
        </div>
    )
}

export default RightMenuContainer