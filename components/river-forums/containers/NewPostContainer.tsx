'use client'

import CreateNewBale from "./createnewbale/CreateNewBale"
import BaleDisplay from "./baledisplay/BaleDisplay"
import RightMenuContainer from "./rightmenu-container/RightMenuContainer"
import { useState, useEffect } from 'react'

const NewPostContainer = () => {

    useEffect(() => {

        
    }, [])


    return (
        <div className="block sm:flex">

            <div className="space-y-4 m-4 ">
                <CreateNewBale />
                <BaleDisplay />
            </div>

            <div className="mt-4 mr-4">
                <RightMenuContainer />
            </div>

        </div>
    )
}

export default NewPostContainer