'use client'

import RecentBales from '@/components/bales/RecentBales'
import EmptyBalesSkeleton from '@/components/bales/loading-skeleton/EmptyBalesSkeleton'
import { useState, useEffect } from 'react'
import { usePathname, useRouter } from "next/navigation"
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'


const URL = process.env.NEXT_PUBLIC_BACKEND_URL

const BaleDisplay = () => {

    const [loading, setLoading] = useState(false)
    const [baleIndex, setBaleIndex] = useState<number>(0)
    const [updateBales, setUpdateBales] = useState(false)
    const [baleNav, setBaleNav] = useState<number>(0)
    const [allLogsBales, setAllLogsBales] = useState<any[]>(["new"])

    const pathname: string | null = usePathname()
    const router: AppRouterInstance = useRouter()

    useEffect(() => {

        const topBales = async() => {
            setAllLogsBales([])
            setUpdateBales(true)
            const request: Response = await fetch( URL + "/logs/most-recent-bales/" + 1 )
            const response  = await request.json().catch((err: Error) => {
                console.log(err)
            })
            // console.log(response)
            if (response) {
                if (baleNav !== response.total) {
                    setBaleNav(response.total)
                }
                setAllLogsBales(response.baleList)
                // setLogName("")
                setLoading(false)
                return
            } else {
                setAllLogsBales(["error"])
                return 
            }
        }
        topBales()

        if (allLogsBales[0] !== "new") {
            if (allLogsBales.length === 0) {
                setUpdateBales(false)
            } else if (allLogsBales.length > 0) {
                setUpdateBales(true)
            }
        }
        
    }, [])

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
    )
}

export default BaleDisplay