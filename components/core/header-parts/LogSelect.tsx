'use client'

import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import { useState, useEffect} from 'react'
import { useRiverContext } from "@/app/context/RiverContextProvider"
import arrow from '../../../public/icons/Arrow.png'
import { URL } from "../../../lib/constants"

const LogSelect = (props: any) => {

    const { setLogList, activeLog, setActiveLog } = useRiverContext()
    const [active, setActive] = useState<boolean>(true)

    const pathname = usePathname()
    const router = useRouter()


    useEffect(() => {
        const getAllLogs = async () => {
            setActiveLog("/welcome/totl.life")
            const request = await fetch( URL + "/logs/all-logs-for-drop-down")
            const response = await request.json().catch(err => {
                console.log(err)
            })
            if(await response.status === "success") {
                props.setSelectLog(response.logNames)
                setLogList(response.logNames)
                setActiveHeaderLog()
            }
            
        }
        const setActiveHeaderLog = () => {
            const activeLogInRiver: any = pathname?.split("/river/").pop()
            if(activeLog === "" || activeLogInRiver === "/about" || activeLogInRiver === "/") {
                setActive(false)
                return
            }
            if(activeLogInRiver === "/river") {
                setActiveLog("Home")
                return
            }
            if (!props.selectLog.includes(activeLogInRiver)) {
                setActiveLog("Home")
            } else {
                setActiveLog(activeLogInRiver)
            }
            
        }
        
        getAllLogs()
        
    }, [pathname])

    const logSelect = (event: any) => {
        setActiveLog(event.target.value)
        if (event.target.value !== "home") {
        router.push("/river/" + event.target.value)
        } else {
            router.push("/river")
        }
        setActive(prev => !prev)
    }

    const quickSelect = () => {
        setActiveLog("home")
        router.push("/river")
        setActive(prev => !prev)
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
            <div className="items-center sm:flex hidden gap-4">
                <div className=" bg-gray-500 rounded-md p-1 flex justify-around gap-4 items-center">
                    {active ?
                        <div className="bg-gray-400 p-1 rounded-md px-2">
                        { activeLog.includes("/welcome/totl.life") ?
                        <p>Totl.Life</p>
                        :
                        <p>{!pathname!.includes("/user/") ? "Log/" + activeLog : "User/" + pathname!.split("/").pop()}</p>
                        }
                    </div>
                        :
                        <div>
                            <form className='mx-auto text-gray-800 my-1'>
                                <select className='rounded-md mx-auto shadow-md p-1 text-sm bg-gray-200' defaultValue="default" onChange={(event) => logSelect(event)} id="webpage">
                                    <option className="" value="default" disabled>Select Log</option>
                                    <option value="home">Home</option>
                                    {logDropDownOptions}
                                </select>
                            </form>
                        </div>
                    }
                { !active && 
                <div>
                    {/* <button>Random - Dice Pic</button> */}
                    <button className="flex bg-gray-400 hover:bg-yellow-500 px-2 rounded-md duration-500 hover:shadow-lg shadow-gray-600" onClick={() => quickSelect()}>Home</button>
                </div>
                }
                <div className="flex items-center ">
                    <button onClick={() => setActive(prev => !prev)}>
                        <Image
                        src={arrow}
                        alt=""
                        width={30}
                        height={30}
                        className= { active ? "rotate-90 bg-gray-300 p-1 rounded-md" :"-rotate-90 bg-gray-300 p-1 rounded-md"} 
                        />
                    </button>
                </div>
                </div>
            </div>

            <div className="items-center flex justify-around sm:hidden bg-gray-500 rounded-md gap-2 p-1 m-2">
                {active ?
                <div className="bg-gray-400 p-1 rounded-md px-2">
                    { activeLog.includes("/welcome/totl.life") ?
                    <p>Totl.Life</p>
                    :
                    <p>{!pathname!.includes("/user/") ? "Log/" + activeLog : "User/" + pathname!.split("/").pop()}</p>
                    }
                    </div>
                :
                <div>
                    <form className='mx-auto text-gray-800 my-1'>
                        <select className='rounded-md mx-auto shadow-md p-1 text-sm bg-gray-200' defaultValue="default" onChange={(event) => logSelect(event)} id="mobilelog">
                            <option className="" value="default" disabled>Select Log</option>
                            <option value="home">Home</option>
                            {logDropDownOptions}
                        </select>
                    </form>
                </div>
                }
                <div className="flex items-center ">
                    <button onClick={() => setActive(prev => !prev)}>
                        <Image
                        src={arrow}
                        alt=""
                        width={30}
                        height={30}
                        className= { active ? "rotate-90 bg-gray-300 p-1 rounded-md" :"-rotate-90 bg-gray-300 p-1 rounded-md"} 
                        />
                    </button>
                </div>
            </div>
        </>
    )
}

export default LogSelect