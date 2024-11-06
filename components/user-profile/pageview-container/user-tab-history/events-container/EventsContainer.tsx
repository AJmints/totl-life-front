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
    
    return (
        <div>
            <div className="p-2 bg-gray-400 rounded-md w-[30%] mb-2">
                <p className=" font-medium text-4xl">Events Page</p>
                <p>What needs to be stored at the top of the component tree and what needs its own calls?</p>
            </div>
            <div className="p-2 w-[100%] bg-gray-300">
                <div>
                    <button onClick={() => setEventToggle((prev) => !prev)}>{eventToggle ? "Back" : "Show Event"}</button>
                </div>
                <div>
                    {eventToggle && <EventView />}
                </div>
                
            </div>
            
        </div>
    )
}

export default EventsContainer