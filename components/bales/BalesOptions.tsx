'use client'

import { useEffect, useState } from 'react'
import add from '../../public/icons/add-white.png'
import Image from 'next/image'
import NewBalePost from "./NewBalePost"
import CreateNewLog from './CreateNewLog'

export default function BalesOptions() {

    const [createPost, setCreatePost] = useState(false)
    const [createLog, setCreateLog] = useState(false)

    useEffect(() => {
        // Get list of all logs
        // Account can only own a max of 3 logs, and can own more after submitting a request.
    }, [])

    const logSelect = (event: any) => {

        if(event.target.value === "newLog") {
            setCreateLog(prev => !prev)
            return
        }
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
    

    return (
        <div>
        {/* Selection Bar: Choose Log, Make new Post, Search/filter */}
        <div className="py-3 px-2 sm:px-5 rounded-t-md items-center sm:flex space-y-2 sm:space-y-0 justify-between bg-gray-400">
            <div className='text-gray-900 flex sm:block font-normal'>
                <button onClick={() => handleCreateLog()} className='shadow-md shadow-gray-600 text-sm bg-emerald-500 hover:bg-emerald-700 duration-300 p-1 rounded-md mr-2'>{createLog ? "Close" : "Create New Log"}</button>
                <form className='mx-auto mt-1'>
                    {/* <h1 className=''>Visit a new log</h1> */}
                    <select className='rounded-md mx-auto shadow-md p-1 bg-gray-200' defaultValue="default" onChange={(e) => logSelect(e)} id="logs">
                        <option value="default" disabled>Visit Logs</option>
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
            <p>search/filter</p>
        </div>

        {/* Write a new post */}
        <div>
        { createPost ?
            <NewBalePost />
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