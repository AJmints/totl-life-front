'use client'

import CreateNewBale from "./createnewbale/CreateNewBale"
import BaleDisplay from "./baledisplay/BaleDisplay"
import RightMenuContainer from "./rightmenu-container/RightMenuContainer"
import { useState, useEffect } from 'react'
import LogBanner from "./logbanner-phoneview/LogBanner"
import { useRouter } from "next/navigation"
import LoadingBales from "./baledisplay/LoadingBales"

export const authCheck = async() => {
    const infoCall = await fetch("/api/authCheck")
    const status = await infoCall.json().catch((err) => {
        console.log(err)
    })
    return status.loggedIn
}

const RiverContainer = () => {

    const [ verify, setVerify ] = useState(false)
    const router = useRouter()
    
    useEffect(() => {

        const check = async() => {
            if (!await authCheck()) {
                router.push("/login")
            } else {
                setVerify(true)
            }
        }
        
        setTimeout(() => {
            check()
        }, 1000)
        
    }, [])


    return (

        <>
        {
            verify ? 
            <div className="flex flex-col col-span-1">

                <div className="m-4 mb-0 flex justify-center">
                    <LogBanner />
                </div>

                <div className="block sm:flex justify-center">

                    <div className="space-y-4 m-4 sm:mr-0 lg:mr-4 max-w-3xl">
                        <CreateNewBale />
                        <BaleDisplay />
                    </div>

                    <div className="mt-4 mr-4 max-w-sm">
                        <RightMenuContainer />
                    </div>

                </div>
            </div>
            :
            <div className="flex justify-center">
            <div className="m-4 sm:mr-0 lg:mr-4 max-w-3xl">
                <LoadingBales />
            </div>
            </div>
        }
        </>
    )
}

export default RiverContainer