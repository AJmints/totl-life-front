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
    

    return (
        <div>
        {/* Selection Bar: Choose Log, Make new Post, Search/filter */}
        <div className="py-3 px-2 sm:px-5 rounded-t-md items-center flex justify-between bg-gray-400">
            <div className='text-gray-900 font-normal'>
                <form>
                    <h1 className=''>Visit a new log</h1>
                    <select className='rounded-md bg-gray-200' defaultValue="default" onChange={(e) => logSelect(e)} id="logs">
                        <option value="default" disabled>Logs</option>
                        <option value="newLog">Make a new Log</option>
                    </select>
                </form>
            </div>
            {/* Add new post button */}
            <div className="">
                <div onClick={() => handleCreatePost()} className="rounded-full cursor-pointer duration-300 p-2 hover:bg-emerald-600 shadow-md shadow-gray-700 bg-gray-500 z-10">
                    <Image
                        src={add}
                        alt=''
                        className={createPost ? 'w-7 h-auto rounded-md duration-200 rotate-45' : 'w-7 duration-200 h-auto rounded-md'}
                    />
                </div>
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