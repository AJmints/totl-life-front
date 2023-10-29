'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from "next/navigation"
import add from '../../public/icons/add-white.png'
import hamMenu from '../../public/icons/menu-burger.png'
import Image from 'next/image'
import NewBalePost from "./NewBalePost"
import CreateNewLog from './CreateNewLog'
import RightMenuContainer from './right-container/RightMenuContainer'

const URL = process.env.NEXT_PUBLIC_BACKEND_URL

export default function BalesOptions(props: any) {

    const [inLog, setInLog] = useState(false)
    const [createPost, setCreatePost] = useState(false)
    const [createLog, setCreateLog] = useState(false)
    const [showLogDesc, setShowLogDesc] = useState<boolean>(true)
    const [sideMenu, setSideMenu] = useState<boolean>(false)
    

    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        props.setLoading(true)
        if (pathname?.split("/logs/").pop() === '/logs') {
            
            // Create a most recent list of bales to return to BalesContainer
            setInLog(false)
            const topBales = async() => {
                props.setAllLogsBales([])
                props.setUpdateBales(true)
                const request = await fetch( URL + "/logs/most-recent-bales/" + props.baleIndex )
                const response = await request.json().catch((err) => {
                    console.log(err)
                })
                if (response) {
                    // console.log(response)
                    if (props.baleNav !== response.total) {
                        props.setBaleNav(response.total)
                    }
                    props.setAllLogsBales(response.baleList)
                    props.setLogName("")
                    if (response.baleList.length === 0) {
                        props.setUpdateBales(false)
                        props.setLoading(false)
                    } else {
                        props.setUpdateBales(true)
                        props.setLoading(false)
                    } 
                    return
                } else {
                    props.setAllLogsBales(["error"])
                    return 
                }
            }
            topBales()
        } else if (pathname?.split("/")[1] === "logs" && pathname?.split("/").length === 3) {
            props.setLogName(pathname?.split("/logs/").pop())

            const allLogBales = async() => {
                props.setAllLogsBales([])
                props.setUpdateBales(true)
                setInLog(true)
                    const waitLogs = await fetch( URL + "/logs/all-bales-in-log/" + pathname?.split("/logs/").pop() + "/" + props.baleIndex)
                    const response = await waitLogs.json().catch((err) => {
                        console.log(err)
                    })
                    
                    if (response.status) {
                        if (props.baleNav !== response.total) {
                            props.setBaleNav(response.total)
                        }
                        props.setAllLogsBales(response.allBales)
                        props.setLogDescription(response.logDescription)
                        if (response.allBales.length === 0) {
                            props.setUpdateBales(false)
                            props.setLoading(false)
                        } else {
                            props.setUpdateBales(true)
                            props.setLoading(false)
                        }                        
                        return
                    } else {
                        props.setAllLogsBales(["error"])
                        return 
                    }
            }
            allLogBales()
        }
    }, [props.baleIndex])

    

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

    const logDropDownOptions = props.logsDropDown.sort((a:any, b:any) => {
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
        <div>
        {/* Selection Bar: Choose Log, Make new Post, Search/filter */}
        <div className="py-3 px-2 sm:px-5 text-gray-200 font-light rounded-md items-center sm:flex space-y-2 sm:space-y-0 justify-between bg-gray-700/90 shadow-lg shadow-gray-800/60">
            {/* create new log button */}
            {   inLog ?
            <>
            <div>
                <form className='mx-auto text-gray-800 mt-1'>
                    {/* <h1 className=''>Visit a new log</h1> */}
                    <select className='rounded-md mx-auto shadow-md p-1 bg-gray-200' defaultValue="default" onChange={(e) => logSelect(e)} id="logs">
                        <option value="default" disabled>Visit Logs</option>
                        {logDropDownOptions}
                    </select>
                </form>
            </div>
            {/* Add new post button */}
            <div className='flex justify-around'>
            <div className="flex justify-center items-center">
                <div onClick={() => handleCreatePost()} className="rounded-full cursor-pointer duration-300 p-2 hover:bg-emerald-600 shadow-md shadow-gray-700 bg-gray-500 z-10">
                    <Image
                        src={add}
                        alt='Add new bale'
                        className={createPost ? 'w-7 h-auto rounded-md duration-200 rotate-45' : 'w-7 duration-200 h-auto rounded-md'}
                    />
                </div>
                <h1 className="flex ml-2 font-normal text-sm ">Start New Bale</h1>
            </div>

            <div className='flex sm:hidden'>
            <Image
                    src={hamMenu}
                    alt=''
                    width={40}
                    height={40}
                    className='bg-gray-500 rounded-md p-1 cursor-pointer hover:bg-gray-300 duration-300'
                    onClick={() => setSideMenu(prev => !prev)}
                />
            </div>
            
            </div>
            </>
            :
            <>
            <div>
                <form className='mx-auto mt-1 text-gray-800'>
                    {/* <h1 className=''>Visit a new log</h1> */}
                    <select className='rounded-md mx-auto shadow-md p-1 bg-gray-200' defaultValue="default" onChange={(e) => logSelect(e)} id="logs">
                        <option value="default" disabled>Visit Logs</option>
                        {logDropDownOptions}
                    </select>
                </form>
            </div>
            <div className='flex justify-around'>
            <div className='text-gray-300 flex justify-center items-center font-normal'>
                <div onClick={() => handleCreateLog()} className="rounded-full cursor-pointer duration-300 p-2 hover:bg-emerald-600 shadow-md shadow-gray-700 bg-gray-500 z-10">
                    <Image
                        src={add}
                        alt=''
                        className={createLog ? 'w-7 h-auto rounded-md duration-200 rotate-45' : 'w-7 duration-200 h-auto rounded-md'}
                    />
                    
                </div>
                <h1 className="flex ml-2 font-normal text-sm">Find a New Log</h1>
            </div>

            <div className='flex sm:hidden'>
            <Image
                    src={hamMenu}
                    alt=''
                    width={40}
                    height={40}
                    className='bg-gray-500 rounded-md p-1 cursor-pointer hover:bg-gray-300 duration-300'
                    onClick={() => setSideMenu(prev => !prev)}
                />
            </div>

            </div>
            
            </>
            }

            <div>
                {/* Search visible lg+, else, right menu toggle  */}
                <div className='hidden lg:block'>
                <p>search/filter</p>
                <p className='text-sm'>Under construction</p>
                </div>

                <div className='hidden sm:flex lg:hidden'>
                <Image
                        src={hamMenu}
                        alt=''
                        width={40}
                        height={40}
                        className='bg-gray-500 rounded-md p-1 cursor-pointer hover:bg-gray-300 duration-300'
                        onClick={() => setSideMenu(prev => !prev)}
                    />
                </div>

                <div>
                    <div className={sideMenu ? 'fixed top-0 rounded-l-md bg-gray-500 h-screen z-20 right-0' : "hidden"}>
                        <div className='mt-5'>
                        <div className='mb-3'>
                            <button className='bg-gray-400 shadow-lg shadow-gray-800/50 hover:bg-emerald-500 duration-500 text-gray-900 p-1 rounded-md' onClick={() => setSideMenu(prev => !prev)}>Close</button>
                        </div>
                        <div className='bg-gray-700/90 mb-4 rounded-md p-2 mx-2'>
                        <p>search/filter</p>
                        <p className='text-sm'>Under construction</p>
                        </div>
                        <RightMenuContainer 
                            showLogDesc={showLogDesc}
                            logName={props.logName}
                            logDescription={props.logDescription}
                            setShowLogDesc={setShowLogDesc}
                        />
                        </div>
                    </div>
                </div>

            </div>
        
        </div>

        {/* Write a new post */}
        <div>
        { createPost ?
            <NewBalePost 
                setAllLogsBales={props.setAllLogsBales}
                logName={props.logName}
                allLogsBales={props.allLogsBales}
                setCreatePost={setCreatePost}
            />
            :
            <></>
        }
        {
            createLog ? 
            <CreateNewLog
            setLogsDropDown={props.setLogsDropDown}
            setCreateLog={setCreateLog}
            />
            :
            <></>
        }
        </div>
        </div>
    )
}