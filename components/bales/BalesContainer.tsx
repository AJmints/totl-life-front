'use client'

import { useEffect, useState } from "react"
import RecentBales from "./RecentBales"
import BalesOptions from "./BalesOptions"
import EmptyBalesSkeleton from "./loading-skeleton/EmptyBalesSkeleton"

const URL = process.env.NEXT_PUBLIC_BACKEND_URL


export default function BalesContainer(props: any) {

    const [logsDropDown, setLogsDropDown] = useState([])
    const [allLogsBales, setAllLogsBales] = useState<any[]>(["new"])
    const [updateBales, setUpdateBales] = useState(false)
    const [visitingLog, setVisitingLog] = useState('')
    // const [logDescription, setLogDescription] = useState("")
    // const [showLogDesc, setShowLogDesc] = useState(false)

    useEffect(() => {
        const getLogs = async() => {
            const waitLogs = await fetch( URL + "/logs/all-logs-for-drop-down")
            const response = await waitLogs.json().catch((err) => {
                console.log(err)
            })
            if (response.status == "success") {
                // console.log(response.logNames)
                return setLogsDropDown(response.logNames)
            } else {
                console.log("Get Log names issue in BalesContainer.tsx")
            }
        }
        getLogs()
        if (allLogsBales[0] === "error") {
            console.log("Something went wrong when setting bales")
        } else if (allLogsBales[0] !== "new") {
            // if false, show empty bale skeleton, else, show bales
            if (allLogsBales.length === 0) {
                setUpdateBales(false)
            } else {
                setUpdateBales(true)
            }
        }
    }, [allLogsBales, updateBales])

    const viewBalesInLog = allLogsBales.map((item: any) => {
        // console.log(updateBales)
        return (
            <RecentBales
                key={item.id}
                mappingBale={item}
            />
        )
    })

    return (
        <>
        <div className="space-y-4 my-5 mx-2">
            <div>
            <BalesOptions
                logsDropDown={logsDropDown}
                setLogsDropDown={setLogsDropDown}
                setAllLogsBales={setAllLogsBales}
                logName={props.logName}
                setLogName={props.setLogName}
                setLogDescription={props.setLogDescription}
            />
            </div>

            

            {/* Only render our list of bales after bales have been set, otherwise we get mount and unmount key.id issues. */}
            { updateBales ? 
            <div className="space-y-4 h-screen overflow-y-scroll no-scrollbar">
            {viewBalesInLog}
            </div>
            :
            <> 
            <EmptyBalesSkeleton />
            </>
            }        
        </div>  
        </>
    )
}