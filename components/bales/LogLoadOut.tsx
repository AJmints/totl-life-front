'use client'

import { useState } from 'react'

import BalesContainer from "./BalesContainer";
import RightMenuContainer from './right-container/RightMenuContainer';
import LeftMenuContainer from './left-container/LeftMenuContainer';

export default function LogLoadOut() {

    const [logName, setLogName] = useState<string>("")
    const [logDescription, setLogDescription] = useState<string>("")
    const [showLogDesc, setShowLogDesc] = useState<boolean>(true)
    const [allLogNames, setAllLogNames] = useState<string[]>([])

    return (
        <div className="mb-10">
            <div className="flex justify-around">
                
            <div className="hidden my-5 ml-2 lg:flex shadow-xl text-lg text-center rounded-lg">
                    <div className="pt-2 rounded-md bg-gray-500/90">
                    <LeftMenuContainer
                            allLogNames={allLogNames}
                        />
                    </div>
                </div>
                
                <div className="shadow-lg flex-1 text-lg  text-center rounded-lg">
                    <BalesContainer 
                        setLogDescription={setLogDescription}
                        logName={logName}
                        logDescription={logDescription}
                        setLogName={setLogName}
                        setAllLogNames={setAllLogNames}
                    />
                </div>

                <div className="hidden my-5 mr-2 lg:flex shadow-xl text-lg text-center rounded-lg">
                    <div className="pt-2 rounded-md bg-gray-500/90">
                        <RightMenuContainer
                            showLogDesc={showLogDesc}
                            logName={logName}
                            logDescription={logDescription}
                            setShowLogDesc={setShowLogDesc}
                        />
                    </div>
                </div>
            
            </div>
        </div>
    )
}