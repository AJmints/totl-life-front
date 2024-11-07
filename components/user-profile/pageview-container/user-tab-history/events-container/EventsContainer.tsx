'use client'

import { useState } from "react"
import EventView from "./event-view/EventView"

const EventsContainer = () => {

    const [eventToggle, setEventToggle] = useState<boolean>(false)

    const test = () => {
        console.time("Timer")
        let num = 1
        for(let i=0; i > 10; i++) {
            num = num + 3
        }
        console.timeEnd("Timer")
    
    }

    const t = (
        <div className={"bg-gray-300 hover:border-emerald-500 border-gray-300 border-2 duration-200 " + "cursor-pointer p-1 md:p-2 flex justify-around rounded-md text-sm"}>
            <div>
                <div className="flex justify-center">
                    <p className="py-10 bg-gray-200 rounded-md">Type Image</p>
                </div>
                <p>Type: Car Camp</p> {/* Car Camping / Overlanding / Floating / BackPacking / MTB / Climbing */}
            </div>
            <div className="text-right flex flex-col justify-center">
                <p>Event Name</p>
                <p>Hosted By</p>
                <p>Date Year</p>
            </div>
            <div className="flex gap-2 flex-col md:flex-row justify-center">
                { true ? 
                    <>
                        <button>Accept</button>
                        <button>Decline</button>
                    </>
                :
                    <>
                        <button>Or Delete/Edit</button>
                    </>
                }
            </div>
            
        </div>
    )

    const arr = [t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t]

    let num = arr.length
    const loop = arr.map((item) => {
        num--
        return (
            <div key={num} onClick={() => setEventToggle((prev: any) => !prev)}>
                {item}
            </div>   
        )
    })
    
    return (
        <div>
            <div className="p-2 bg-gray-400 rounded-md w-[30%] mb-2">
                <p className=" font-medium text-4xl">Events Page</p>
                <p>What needs to be stored at the top of the component tree and what needs its own calls?</p>
            </div>
            <div className="p-2 w-[100%] bg-gray-400 rounded-md text-gray-800">
                <div className="p-1">
                    <button  onClick={() => setEventToggle((prev) => !prev) } className="bg-yellow-400 p-1 px-2 rounded-md">{eventToggle ? "Back" : "Create Event"}</button>
                </div>
                <div >
                    {eventToggle && <EventView />}
                    { !eventToggle && 
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-2xl font-light py-2 text-center bg-gray-300 rounded-md">Your Events</h1>
                            <div className="flex gap-2">
                                <input type="text" className="p-0.5 rounded-md" />
                                <button>Search</button>
                            </div>
                        </div>
                        <div className="bg-gray-500 rounded-md h-[30rem] p-2 md:p-4 flex flex-col gap-2 overflow-y-scroll scroll-track scroll-w scroll-handle">
                            {loop}
                        </div>
                    </div>
                    }
                </div>
                
            </div>
            
        </div>
    )
}

export default EventsContainer