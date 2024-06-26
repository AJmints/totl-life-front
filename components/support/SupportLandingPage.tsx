'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import pfpDefault from "../../public/icons/profile-pic.png"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import MakeReport from "./MakeReport/MakeReport"
import LoadingMainBale from "../river-forums/containers/bale-pageviewcontainer/bale-main/LoadingMainBale"
import ReportBale from "./MakeReport/report-bale/ReportBale"
import TotlLingoSupport from "./totl-lingo/TotlLingoSupport"
import Terms from "./terms-conditions/Terms"
import Conditions from "./terms-conditions/Conditions"

const URL: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL

const SupportLandingPageComponent = (props: any) => {

    const [ reportType, setReportType ] = useState<"post" | "general" | "terms" | "conditions" | null | undefined>() 
    const [ content, setContent ] = useState<any>()
    const [ conditions, setConditions ] = useState()
    const [ terms, setTerms ] = useState()
 
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()

    useEffect(() => {
        const conditions = async() => {
            const id: string | null | undefined = searchParams?.get('id')
            const type: string | null | undefined = searchParams?.get('type')
            const log: string | null | undefined = searchParams?.get('log')

            if (type === "post") {
                setReportType("post")
                const makeLogRequest = await fetch( URL + "/logs/get-specific-bale/" + log + "/" + id)
                const response = await makeLogRequest.json().catch((err) => {
                    console.log(err)
                })
                if (response) {
                    setContent(response)
                } else if (response.status === "failed") {
                    console.log("Post failed due to invalid url param")
                } else {
                    console.log("Error, please try again later.")
                }
            } else if (reportType === undefined) {
                setReportType(null)
            }


        }
        conditions()

    }, [])

    return (

        <div className="bg-gray-700/80 rounded-md m-3 sm:m-10 lg:flex">

            <div className="bg-gray-400 lg:w-[20%] lg:space-y-4 rounded-t-md lg:rounded-l-md lg:rounded-none lg:my-10 lg:ml-10 p-5 lg:block grid grid-cols-2 gap-3">

                <div className="bg-gray-500 rounded-md p-2 hover:bg-yellow-500 duration-300 cursor-pointer" onClick={() => setReportType(null)}>
                    <p>Totl Lingo</p>
                </div>
                <div className="bg-gray-500 rounded-md p-2 hover:bg-yellow-500 duration-300 cursor-pointer" onClick={() => setReportType("conditions")}>
                    <p>Terms/Tides</p>
                </div>
                <div className="bg-gray-500 rounded-md p-2 hover:bg-yellow-500 duration-300 cursor-pointer" onClick={() => setReportType("terms")}>
                    <p>User Agreement</p>
                </div>
                <div className="bg-gray-500 rounded-md p-2 hover:bg-yellow-500 duration-300 cursor-pointer" onClick={() => setReportType("general")}>
                    <p>Make A Report</p>
                </div>

            </div>

            <div className="bg-gray-500 lg:w-[80%] rounded-b-md lg:rounded-r-md lg:rounded-none lg:my-10 lg:mr-10 p-5">

                {/* Loading */}
                {
                    reportType === undefined ? 
                    <div className="bg-gray-700/70 max-h-min p-5 rounded-md">
                        <div className="bg-gray-100/80 rounded-md p-5">
                        <div className=" py-5 rounded-md">
                            <p className="flex justify-center py-10 px-22 sm:px-24 md:px-32 xl:px-48 rounded-md bg-gray-50 mx-3 animate-pulse"></p>
                        </div>
                        <div className="py-5 rounded-md">
                            <p className="flex justify-center py-10 px-22 sm:px-24 md:px-32 xl:px-48 rounded-md bg-gray-50 mx-3 animate-pulse"></p>
                        </div>
                        <div className="py-5 rounded-md">
                            <p className="flex justify-center py-10 px-22 sm:px-24 md:px-32 xl:px-48 rounded-md bg-gray-50 mx-3 animate-pulse"></p>
                        </div>
                        <div className="py-5 rounded-md">
                            <p className="flex justify-center py-10 px-22 sm:px-24 md:px-32 xl:px-48 rounded-md bg-gray-50 mx-3 animate-pulse"></p>
                        </div>
                        </div>
                    </div>
                    :
                    <></>
                }

                {/* Lingo */}
                {
                    reportType === null ?
                    <TotlLingoSupport/>
                    :
                    <></>
                }

                { reportType === "terms" && <Terms /> }
                { reportType === "conditions" && <Conditions />}

                {/* General Reporting - Pending */}
                {
                    reportType === "general" ?
                    <>
                    <div className="flex mb-2">
                        <p className="text-2xl font-light  p-3 rounded-md bg-gray-400 ">Make Report</p>
                    </div>
                    <MakeReport 
                    id={null}
                    type={"general"}
                    />
                    </>
                    :
                    <></>
                }
                {/* Comment Reporting - Pending */}
                {/* User Reporting - Pending */}

                {/* Bale Reporting */}
                {
                    reportType === "post" ?
                    <>
                    { content === undefined ? 
                    <LoadingMainBale />
                    :
                    <ReportBale 
                    content={content}
                    reportType={reportType}
                    />
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