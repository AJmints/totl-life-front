'use client'

import RecentBales from './balepost-container/RecentBales'
import EmptyBalesSkeleton from './EmptyBalesSkeleton'
import { useState, useEffect } from 'react'
import { usePathname } from "next/navigation"
import { useRiverContext } from '@/app/context/RiverContextProvider'
import LoadingBales from './LoadingBales'

const URL = process.env.NEXT_PUBLIC_BACKEND_URL

const BaleDisplay = () => {

    const { setDesc } = useRiverContext()

    const [baleIndex, setBaleIndex] = useState<number>(0)
    const [updateBales, setUpdateBales] = useState(false)
    const [baleNav, setBaleNav] = useState<number>(0)
    const [allLogsBales, setAllLogsBales] = useState<any[]>([])

    const pathname: string | null = usePathname()

    useEffect(() => {
        baleListMethod()        
    }, [baleIndex])

    const allLogBales = async() => {

        const waitLogs: Response = await fetch( URL + "/logs/all-bales-in-log/" + pathname?.split("/river/").pop() + "/" + baleIndex)
        const response: any = await waitLogs.json().catch((err: Error) => {
            console.log(err)
        })
        if (response.status) {
            if (baleNav !== response.total) {
                setBaleNav(response.total)
            }
            console.log(response)
            setAllLogsBales(response.allBales)
            setUpdateBales(true)
            setDesc(response.logDescription)            
            return
        } else {
            setAllLogsBales(["error"])
            return 
        }
    }

    const topBales = async() => {
        const request: Response = await fetch( URL + "/logs/most-recent-bales/" + baleIndex )
        const response: any  = await request.json().catch((err: Error) => {
            console.log(err)
        })
        if (response.total > 0) {
            if (baleNav !== response.total) {
                setBaleNav(response.total)
            }
            setUpdateBales(true)
            setAllLogsBales(response.baleList)
            setDesc("You are chilling on your home log")
            return
        } else {
            return 
        }
    }

    const baleListMethod = () => {
        if (pathname?.split("/river/").pop() === '/river') {
            topBales()
        } else if (pathname?.split("/")[1] === "river" && pathname?.split("/").length === 3) {
            allLogBales()
        }
    }

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
            <div className='bg-gray-700/80 p-2 rounded-md min-h-screen'>
            { updateBales ? 
            <>
            { allLogsBales.length > 0 ?
            <div className="space-y-4">
            <div className="bg-gray-600/80 py-2 rounded-md justify-center flex">
                <div className="flex">
                    <p>Page:</p>
                    {balePageNav(baleNav)}
                </div>
            </div>
                {viewBalesInLog}
            <div className="bg-gray-600/80 py-2 rounded-md justify-center flex">
                <div className="flex">
                    <p>Page:</p>
                    {balePageNav(baleNav)}
                </div>
            </div>
            </div>
            :
            <EmptyBalesSkeleton />
            }
            </>
            :
            <> 
            <LoadingBales />  
            </>
            }
            </div>
        </>
    )
}


export default BaleDisplay