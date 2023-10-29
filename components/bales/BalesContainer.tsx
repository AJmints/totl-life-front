'use client'

import { useEffect, useState } from "react"
import RecentBales from "./RecentBales"
import BalesOptions from "./BalesOptions"
import EmptyBalesSkeleton from "./loading-skeleton/EmptyBalesSkeleton"
import LoadingBalesSkeleton from "./loading-skeleton/LoadingBalesSkeleton copy"

const URL = process.env.NEXT_PUBLIC_BACKEND_URL


export default function BalesContainer(props: any) {

    const [loading, setLoading] = useState(false)
    const [logsDropDown, setLogsDropDown] = useState([])
    const [allLogsBales, setAllLogsBales] = useState<any[]>(["new"])
    const [updateBales, setUpdateBales] = useState(false)
    const [baleIndex, setBaleIndex] = useState<number>(0)
    const [baleNav, setBaleNav] = useState<number>(0)

    useEffect(() => {
        setLoading(true)
        const getLogs = async() => {
            const waitLogs = await fetch( URL + "/logs/all-logs-for-drop-down" )
            const response = await waitLogs.json().catch((err) => {
                console.log(err)
            })
            if (response.status == "success") {
                props.setAllLogNames(response.logNames)
                return setLogsDropDown(response.logNames)
            } else {
                console.log("Get Log names issue in BalesContainer.tsx")
            }
        }
        if (allLogsBales.length <= 0) {
            getLogs()
        }
        if (allLogsBales[0] === "error") {
            console.log("Something went wrong when setting bales")
        } else if (allLogsBales[0] !== "new") {
            if (allLogsBales.length === 0) {
                setUpdateBales(false)
            } else {
                setUpdateBales(true)
            }
        }
        setLoading(false)
    }, [allLogsBales, updateBales])

    const viewBalesInLog = allLogsBales.sort((a:any, b:any) => {
        return b.id - a.id
    }).map((item: any) => {
        return (
            <RecentBales
                key={item.id}
                mappingBale={item}
            />
        )
    })


    const balePageNav = (baleNav: number) => {

        const pageNum = Math.ceil(baleNav / 10)
        const arr = []
        let num = 1
        for(let i = 0; i < pageNum; i++) {
            arr.push(num)
            num++
        }
        return arr.map(item => {
            return (
                <div 
                    onClick={() => setBaleIndex(item - 1)} 
                    key={item}
                    className={ baleIndex + 1 === item ? "bg-emerald-300 mx-1 rounded-md px-2 cursor-pointer hover:bg-emerald-500 duration-300" : "bg-gray-500 mx-1 rounded-md px-2 cursor-pointer hover:bg-emerald-500 duration-300"}    
                >
                    <p>{item}</p>
                </div>
            )
        })
    }


    return (
        <>
        <div className="space-y-4 my-5 mx-2">
            <div>
            <BalesOptions
                logsDropDown={logsDropDown}
                setLogsDropDown={setLogsDropDown}
                setAllLogsBales={setAllLogsBales}
                allLogsBales={allLogsBales}
                logName={props.logName}
                setLogName={props.setLogName}
                setLogDescription={props.setLogDescription}
                baleIndex={baleIndex}
                setBaleNav={setBaleNav}
                baleNav={baleNav}
                logDescription={props.logDescription}
            />
            </div>

            

            {/* Only render our list of bales after bales have been set, otherwise we get mount and unmount key.id issues. */}
            { loading ? 
            <>
            <LoadingBalesSkeleton />
            </>
            :
            <>
            { updateBales ? 
            <div className="space-y-4 h-screen overflow-y-scroll no-scrollbar">
            <div className="bg-gray-600/80 py-2 rounded-md justify-center flex">
                <div className="flex">
                    <p>Page:</p>
                    {balePageNav(baleNav)}
                </div>
            </div>
            {viewBalesInLog}
            </div>
            :
            <> 
            <EmptyBalesSkeleton />
            </>
            }
            </>
            }        
        </div>  
        </>
    )
}