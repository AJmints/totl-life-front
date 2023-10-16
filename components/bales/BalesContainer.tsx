'use client'

import { useEffect, useState } from "react"
import RecentBales from "./RecentBales"
import BalesOptions from "./BalesOptions"

const URL = process.env.NEXT_PUBLIC_BACKEND_URL


export default function BalesContainer() {

    const [logsDropDown, setLogsDropDown] = useState([])
    const [allLogsBales, setAllLogsBales] = useState<any[]>(["new"])
    const [updateBales, setUpdateBales] = useState(false)
    const [visitingLog, setVisitingLog] = useState('')

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
            setUpdateBales(true)
        }
    }, [allLogsBales, updateBales])

    const viewBalesInLog = allLogsBales.map((item: any) => {
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
                visitingLog={visitingLog}
                setVisitingLog={setVisitingLog}
            />
            </div>
            { updateBales ? 
            <div>
            {viewBalesInLog}
            </div>
            :
            <div>
            {/* {viewBalesInLog} This will cause a key issue, object seems different from other obj*/} 
            </div>
            }        
        </div>  
        </>
    )
}