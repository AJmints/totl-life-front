'use client'

import { useRouter, usePathname } from "next/navigation"
import { useState, useEffect} from 'react'
import { useLogDescription } from "@/app/context/LogDescriptionProvidertest"

const URL: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL


const LogSelect = (props: any) => {

    const { setLogList } = useLogDescription()
    const [activeLog, setActiveLog] = useState<string>("Visit Log")

    const pathname = usePathname()
    const router = useRouter()


    useEffect(() => {
        const getAllLogs = async () => {
            const request = await fetch( URL + "/logs/all-logs-for-drop-down")
            const response = await request.json().catch(err => {
                console.log(err)
            })
            if(response.status === "success") {
                props.setSelectLog(response.logNames)
                setLogList(response.logNames)
            }
        }
        const setActiveHeaderLog = () => {
            const activeLogInRiver: any = pathname?.split("/river/").pop()
            if (!activeLog.includes(activeLogInRiver)) {
                setActiveLog("Visit Log")
            } else {
                setActiveLog(activeLogInRiver)
            }
        }
        setActiveHeaderLog()
        getAllLogs()

    }, [])

    

    const logSelect = (event: any) => {
        router.push("/river/" + event.target.value)
    }

    const logDropDownOptions = props.selectLog.sort((a:any, b:any) => {
        if (a < b) {
            return -1
        }
        if (a > b) {
            return 1
        }
        return 0
    }).map((item: any) => {
        return (
            <option key={item} value={item}>{item}</option>
        )
    })

    return (
        <>
            <div className="items-center sm:flex hidden">
                <form className='mx-auto text-gray-800 mt-1'>
                    {/* <h1 className=''>Visit a new log</h1> */}
                    <select className='rounded-md mx-auto shadow-md p-1 bg-gray-200' defaultValue={activeLog} onChange={(event) => logSelect(event)} id="defaultlog">
                        <option value={activeLog} disabled>{activeLog}</option>
                        {logDropDownOptions}
                    </select>
                </form>
            </div>

            <div className="items-center flex sm:hidden bg-gray-400 rounded-md p-1 m-2">
                        <form className='mx-auto text-gray-800 my-1'>
                            <h1 className=''>Visit a new log</h1>
                            <select className='rounded-md mx-auto shadow-md p-1 text-sm bg-gray-200' defaultValue="default" onChange={(event) => logSelect(event)} id="mobilelog">
                                <option className="" value="default" disabled>Select Log</option>
                                {logDropDownOptions}
                            </select>
                        </form>
                    </div>
        </>
    )
}

export default LogSelect