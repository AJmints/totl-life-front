'use client'

import RecentBales from './balepost-container/RecentBales'
import EmptyBalesSkeleton from '@/components/bales-depreciated/loading-skeleton/EmptyBalesSkeleton'
import { useState, useEffect } from 'react'
import { useLogDescription } from '@/app/context/LogDescriptionProvidertest'
import { usePathname, useRouter } from "next/navigation"
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'


const URL = process.env.NEXT_PUBLIC_BACKEND_URL

const BaleDisplay = () => {

    const { setDesc } = useLogDescription()

    const [baleIndex, setBaleIndex] = useState<number>(0)
    const [updateBales, setUpdateBales] = useState(false)
    const [baleNav, setBaleNav] = useState<number>(0)
    const [allLogsBales, setAllLogsBales] = useState<any[]>([])

    const pathname: string | null = usePathname()
    const router: AppRouterInstance = useRouter()

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
            if (response.total === 0) {
                setUpdateBales(false)
            } else { 
                setUpdateBales(true)
            }
            setAllLogsBales(response.allBales)
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
            { updateBales ? 
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
            <> 
            <EmptyBalesSkeleton />
            </>
            }
        </>
    )
}


export default BaleDisplay