'use client'

import CreateNewBale from "./createnewbale/CreateNewBale"
import BaleDisplay from "./baledisplay/BaleDisplay"
import RightMenuContainer from "./rightmenu-container/RightMenuContainer"
import { useState, useEffect } from 'react'

const RiverContainer = () => {

    useEffect(() => {

        
    }, [])


    return (
        <div className="block sm:flex justify-center">

            <div className="space-y-4 m-4 max-w-3xl">
                <CreateNewBale />
                <BaleDisplay />
            </div>

            <div className="mt-4 mr-4 max-w-sm">
                <RightMenuContainer />
            </div>

        </div>
    )
}

export default RiverContainer