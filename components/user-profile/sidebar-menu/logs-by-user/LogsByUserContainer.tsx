import { useRouter } from "next/navigation"
import { useState } from "react"
import { useUserContext } from "@/app/context/UserContextProvider"

const LogsByUserContainer = () => {

    const [newLogAbout, setNewLogAbout] = useState<boolean>(false)

    const { createdLogs } = useUserContext()

    const router = useRouter()

    const userLogs: any = createdLogs.map((logName: any) => (
        <div className="" key={logName}>
            <li className='py-1 cursor-pointer hover:bg-emerald-400 duration-500'>
                <p className='ml-2'>{" Log: " + logName}<br/></p>
            </li>
            <hr/>
        </div>
    ))

    return (
        <div className="bg-gray-800/90 mt-2 p-2 mx-auto rounded-md">

        <div className="">
            <h1 className="text-gray-200 font-semibold text-lg">Your Logs</h1>
            <p className="text-gray-200 text-xs">You can make {10 - createdLogs.length} more logs</p>
        </div>

        <div className='mx-1 mt-2 w-48 bg-gray-300 p-0.5 rounded-md shadow-lg'>
            <div className='no-scrollbar container h-20 rounded-md overflow-y-scroll bg-gray-500 '>
            {
                createdLogs.length === 0 ?
                <p className="ml-4 mt-2 font-semibold">Create your first log!</p>
                :
                <ul>
                    {userLogs}
                </ul>
            }
            

            </div>
        </div>

        <div className="mt-2">
            <button 
                className="bg-gray-500 p-1 rounded-md shadow-md text-sm hover:bg-emerald-500 hover:text-gray-100 duration-200"
                onClick={() => router.push("/river/new-log")}
            >Create new log</button>
        </div>

        <div className={newLogAbout ? "" : "flex items-center"}>
            {/* <p className="text-gray-200 font-light text-xs mr-1 mt-1">Learn More:</p> */}
            {newLogAbout ? 
            <>
            <p className="text-gray-200 font-light text-xs mt-2 w-32">Build a new community by starting your own log. A log is a forum for other totlers to join and form a bale that can cover any subject you want.</p>
            <button className="text-gray-200 font-light text-xs cursor-pointer hover:text-green-500 duration-200" onClick={() => setNewLogAbout(prev => !prev)}>Hide</button>
            </>
            :
            <div className="">
            <button className="text-gray-200 font-light text-xs cursor-pointer hover:text-green-500 duration-200" onClick={() => setNewLogAbout(prev => !prev)}>Learn More</button>
            </div>
            }
        </div>
    </div>
    )
}

export default LogsByUserContainer