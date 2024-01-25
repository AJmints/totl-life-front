'use client'

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useRiverContext } from '@/app/context/RiverContextProvider'
import Link from 'next/link'


const PolicyLogs = (props: any) => {

    return (
        <>
        <div className="py-3 px-2 mx-2 sm:w-72 sm:px-5 text-gray-200 font-light rounded-md items-center space-y-2 sm:space-y-0 justify-between bg-gray-700/90 shadow-lg shadow-gray-800/60">
        <div>
           <Link href="/terms-and-tides" className="text-xs m-1">Terms/Tides</Link>
           <span className='text-xs m-1'>User Agreement</span>
        </div>
            <hr />
        <h1 className='text-sm'>totl.life © 2024</h1>
           {/* <div className="flex items-center justify-center"> */}
       </div>
   </>
    )

}

export default PolicyLogs