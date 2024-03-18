'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import pfpDefault from "../../public/icons/profile-pic.png"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import MakeReport from "./MakeReport/MakeReport"
import LoadingMainBale from "../river-forums/containers/bale-pageviewcontainer/bale-main/LoadingMainBale"

const URL: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL

const SupportLandingPageComponent = (props: any) => {

    const [ reportType, setReportType ] = useState<"post" | null>(null) 
    const [ content, setContent ] = useState<any>()

    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()

    useEffect(() => {
        const conditions = async() => {
            const id: string | null | undefined = searchParams?.get('id')
            const type: string | null | undefined = searchParams?.get('type')
            const log: string | null | undefined = searchParams?.get('log')

            if (type === "post") {
                const makeLogRequest = await fetch( URL + "/logs/get-specific-bale/" + log + "/" + id)
                const response = await makeLogRequest.json().catch((err) => {
                    console.log(err)
                })
                if (response) {
                    setReportType("post")
                    setContent(response)
                } else if (response.status === "failed") {
                    console.log("Post failed due to invalid url param")
                } else {
                    console.log("Error, please try again later.")
                }
            }

        }
        conditions()
        

    }, [])

    return (

        <div className="bg-gray-700/80 rounded-md m-3 sm:m-10 lg:flex">

            <div className="bg-gray-400 lg:w-[20%] rounded-t-md lg:rounded-l-md lg:rounded-none lg:my-10 lg:ml-10 p-5">

                <div>
                    Totl Lingo
                </div>
                <div>
                    Terms/Tides
                </div>
                <div>
                    User Agreement
                </div>
                <div>
                    Make A Report
                </div>

            </div>

            <div className="bg-gray-500 lg:w-[80%] rounded-b-md lg:rounded-r-md lg:rounded-none lg:my-10 lg:mr-10 p-5">

                {/* Comment Reporting - Pending */}
                {/* User Reporting - Pending */}

                {/* Bale Reporting */}
                {
                    reportType === "post" ?
                    <>
                <div className="flex mb-2">
                    <p className="text-2xl font-light  p-3 rounded-md bg-gray-400 ">Report Bale</p>
                </div>
                { reportType === null ? 
                <LoadingMainBale />
                :
                <>
                <div className="p-2 bg-gray-700/90 rounded-md mb-3">
                <div className="flex mb-2 justify-between items-center">
                    <div className="sm:flex items-center sm:space-x-2">
                        <p className='text-left font-normal text-sm cursor-pointer my-2 bg-gray-400 p-2 rounded-md hover:bg-emerald-500 duration-200' onClick={() => router.push("/river/" + content?.parentLog)}>log/{content?.parentLog}</p>
                        <p className={content?.edited ? " text-xs text-gray-400" : "hidden"}>[Edited]</p>
                    </div>
                <div className="flex justify-center items-center">
                    <Image
                        src={content?.userPFP === null ? pfpDefault : 'data:image/jpeg;base64,' + content?.userPFP}
                        alt=""
                        width={30}
                        height={30}
                        className="mr-2 w-10 h-10 rounded-full cursor-pointer"
                        onClick={() => router.push("/user/" + content?.userName)}
                    />
                <div className="flex justify-center items-center text-sm font-light text-gray-300">
                    <p>t/</p>
                    <p className="cursor-pointer" onClick={() => router.push("/user/" + content?.userName)}>{content?.userName}</p>
                </div>
                </div>
                </div>
                <div className="bg-gray-300 rounded-t-md flex p-3">
                    <h1 className="text-lg sm:text-2xl font-light">{content?.title}</h1>
                </div>
                
                <div className="bg-gray-400 rounded-b-md flex p-3 mb-2">
                    <h1 onClick={() => console.log(content)} className="text-sm sm:text-lg font-light">{content?.body}</h1>
                </div>
                </div>
                <MakeReport 
                baleId={content.id}
                type={"bale"}
                />
                </>
                }
                </>
                :
                <></>
                }

                
            </div>
        
        </div>
    
    )
}

export default SupportLandingPageComponent