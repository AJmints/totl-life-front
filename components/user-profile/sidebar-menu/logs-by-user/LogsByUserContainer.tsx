import { useRouter } from "next/navigation"
import { useState } from "react"

const LogsByUserContainer = (props: any) => {

    const [newLogAbout, setNewLogAbout] = useState<boolean>(false)

    const router = useRouter()

    const arr = ["test", "pigs", "more", "amazing", "longnameforfun"]

    const userLogs: any = arr.map((article: any) => (
        <>
        <li className='py-1 cursor-pointer hover:bg-emerald-400 duration-500'>
        <p className='ml-2'>{" Log: " + article}<br/></p>
        </li>
        <hr/>
        </>
    ))

    return (
        <div className="bg-gray-800/90 mt-2 p-2 mx-auto rounded-md">

        <div className="">
            <h1 className="text-gray-200 font-semibold text-lg">Your Logs</h1>
        </div>

        <div className='mx-1 mt-2 w-48 bg-gray-100 rounded-md shadow-lg'>
            <div className='no-scrollbar container h-24 rounded-md overflow-y-scroll bg-gray-300 '>
            
            <ul>
                {userLogs}
                Pending...
            </ul>

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