'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from "next/navigation"
import add from '../../public/icons/add-white.png'
import Image from 'next/image'
import NewBalePost from "./NewBalePost"
import CreateNewLog from './CreateNewLog'

const URL = process.env.NEXT_PUBLIC_BACKEND_URL

export default function BalesOptions(props: any) {

    const [inLog, setInLog] = useState(false)
    const [createPost, setCreatePost] = useState(false)
    const [createLog, setCreateLog] = useState(false)
    

    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        if (pathname?.split("/logs/").pop() === '/logs') {
            // Create a most recent list of bales to return to BalesContainer
            setInLog(false)
        } else if (pathname?.split("/")[1] === "logs" && pathname?.split("/").length === 3) {
            props.setVisitingLog(pathname?.split("/logs/").pop())
            const allLogBales = async() => {
                setInLog(true)
                    const waitLogs = await fetch( URL + "/logs/all-bales-in-log/" + pathname?.split("/logs/").pop())
                    const response = await waitLogs.json().catch((err) => {
                        console.log(err)
                    })
                    if (response.status) {
                        console.log(response)
                        props.setAllLogsBales(response.allBales)
                        return
                    } else {
                        props.setAllLogsBales(["error"])
                        return 
                    }
            }
            allLogBales()
        }
        // Account can only own a max of 3 logs, and can own more after submitting a request.
    }, [])

    

    const logSelect = (event: any) => {
        router.push("/logs/" + event.target.value)
    }

    const handleCreatePost = () => {
        if (createLog) {
            setCreateLog(false)
            setCreatePost(true)
            return
        }
        setCreatePost(prev => !prev)
    }

    const handleCreateLog = () => {
        if (createPost) {
            setCreateLog(true)
            setCreatePost(false)
            return
        }
        setCreateLog(prev => !prev)
    }

    const logDropDownOptions = props.logsDropDown.map((item: any) => {
        return (
            <option key={item} value={item}>{item}</option>
        )
    })

    return (
        <div>
        {/* Selection Bar: Choose Log, Make new Post, Search/filter */}
        <div className="py-3 px-2 sm:px-5 rounded-t-md items-center sm:flex space-y-2 sm:space-y-0 justify-between bg-gray-400">
            {/* create new log button */}
            {   inLog ?
            <>
            <div>
                <form className='mx-auto mt-1'>
                    {/* <h1 className=''>Visit a new log</h1> */}
                    <select className='rounded-md mx-auto shadow-md p-1 bg-gray-200' defaultValue="default" onChange={(e) => logSelect(e)} id="logs">
                        <option value="default" disabled>Visit Logs</option>
                        {logDropDownOptions}
                    </select>
                </form>
            </div>
            {/* Add new post button */}
            <div className="flex justify-center items-center">
                <div onClick={() => handleCreatePost()} className="rounded-full cursor-pointer duration-300 p-2 hover:bg-emerald-600 shadow-md shadow-gray-700 bg-gray-500 z-10">
                    <Image
                        src={add}
                        alt=''
                        className={createPost ? 'w-7 h-auto rounded-md duration-200 rotate-45' : 'w-7 duration-200 h-auto rounded-md'}
                    />
                </div>
                <h1 className="flex ml-2 font-normal">Start New Bale</h1>
            </div>
            </>
            
            :
            <>
            <div>
                <form className='mx-auto mt-1'>
                    {/* <h1 className=''>Visit a new log</h1> */}
                    <select className='rounded-md mx-auto shadow-md p-1 bg-gray-200' defaultValue="default" onChange={(e) => logSelect(e)} id="logs">
                        <option value="default" disabled>Visit Logs</option>
                        {logDropDownOptions}
                    </select>
                </form>
            </div>
            <div className='text-gray-900 flex items-center font-normal'>
                <div onClick={() => handleCreateLog()} className="rounded-full cursor-pointer duration-300 p-2 hover:bg-emerald-600 shadow-md shadow-gray-700 bg-gray-500 z-10">
                    <Image
                        src={add}
                        alt=''
                        className={createPost ? 'w-7 h-auto rounded-md duration-200 rotate-45' : 'w-7 duration-200 h-auto rounded-md'}
                    />
                    
                </div>
                <h1 className="flex ml-2 font-normal">Find a New Log</h1>
            </div>
            
            </>
            }
            <p>search/filter</p>
        </div>

        {/* Write a new post */}
        <div>
        { createPost ?
            <NewBalePost 
                visitingLog={props.visitingLog}
            />
            :
            <></>
        }
        {
            createLog ? 
            <CreateNewLog/>
            :
            <></>
        }
        </div>
        </div>
    )
}