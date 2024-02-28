'use client'

import { useRiverContext } from "@/app/context/RiverContextProvider"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import FollowJoinLog from "../buttons/follow-join-log/FollowJoinLog"

const LogBanner = () => {

    const { desc } = useRiverContext()
    const [logName, setLogName] = useState<string>()
    const [ displayDesc, setDisplayDesc ] = useState<boolean>(false)
    const pathname: string | null = usePathname()
    const router = useRouter()

    useEffect(() => {

        const routeCheck: string | undefined = pathname?.split("/river/").pop()
        if (routeCheck === "/river") {
            setLogName("home")
        } else {
            setLogName(routeCheck)
        }

    }, [])

    return (
        <div className="flex lg:hidden">

            <div className=" mr-2 items-center flex">
                <button className="bg-gray-500 rounded-md p-3 hover:bg-emerald-500 shadow-lg duration-300" onClick={() => router.back()}>Back</button>
            </div>

            <div className="bg-gray-800/90 rounded-md text-gray-200 items-center p-4 block space-y-2 sm:space-y-0 sm:flex justify-center">            

                <div className="p-2 sm:mr-4 bg-gray-700 font-light rounded-md">
                    {logName === "home" ? 
                    <div>
                        <p>Viewing: log/{logName}</p>
                    </div>
                    :
                    <div>
                        <p>Viewing: log/{logName}</p>
                    </div>}
                </div>

                <div className="text-sm font-light">
                    <div className="flex justify-center">
                    
                    {logName === "home" ?
                    <p>{desc}</p>
                    :
                    <div className="flex">
                    <button className="bg-gray-500 mr-2 p-1 rounded-md hover:bg-green-600 duration-200 mb-1" onClick={() => setDisplayDesc(prev => !prev)}>{displayDesc ? "Hide Description" : "Show Description"}</button>
                    <FollowJoinLog 
                    logName={logName}
                    />
                    </div>
                    }
                    </div>
                    { displayDesc ? 
                    <p>About this log: {desc}</p>
                    :
                    <></>
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default LogBanner