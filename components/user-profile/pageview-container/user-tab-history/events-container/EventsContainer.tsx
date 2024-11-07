'use client'

import { useState } from "react"
import EventView from "./event-view/EventView"
import CreateEventForm from "./create-event-form/CreateEventForm"

const EventsContainer = () => {

    const [eventToggle, setEventToggle] = useState<boolean>(false)
    const [createToggle, setCreateToggle] = useState<boolean>(false)

    const test = () => {
        console.time("Timer")
        let num = 1
        for(let i=0; i > 10; i++) {
            num = num + 3
        }
        console.timeEnd("Timer")
    
    }

    const t = (
        <div className={"bg-gray-300 hover:border-emerald-500 border-gray-300 border-4 duration-200 " + "cursor-pointer p-1 flex justify-between px-4 rounded-md text-sm"}>
            <div>
                <div className="flex justify-center">
                    <p className="py-10 bg-gray-200 rounded-md">Type Image</p>
                </div>
                <p>Type: Car Camp</p> {/* Car Camping / Overlanding / Floating / BackPacking / MTB / Climbing */}
            </div>
            <div className="text-right flex flex-col justify-center">
                <p>Event Name</p>
                <p>Hosted By</p>
                <p>Date Range</p>
                <p>5 Invited</p>
            </div>
            <div className="flex gap-2 flex-col md:flex-row justify-center">
                { true ? 
                    <>
                        <button>Accept</button>
                        <button>Decline</button>
                        <button>Maybe</button> {/* Maybe has limited functionality in Events and can't contribute to food nor will thier gear be accounted for, but they can lend gear still */}
                    </>
                :
                    <>
                        <p>Status: Accepted</p>
                        <button>Delete/Edit</button> {/* If creator display these */}
                        <button>Leave</button> {/* If user, provide this option */}
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
            <div className="flex">
                <p className="bg-gray-400 p-2 px-4 rounded-md mb-2 font-medium text-2xl sm:text-4xl">Events Page</p>
            </div>
            <div className="p-2 w-[100%] bg-gray-400 rounded-md text-gray-800">
                <div className="p-1">
                    {eventToggle && <button  onClick={() => setEventToggle((prev) => !prev) } className="bg-yellow-400 p-1 px-2 rounded-md">Back</button>}
                </div>
                <div >
                    {eventToggle && <EventView />}
                    { !eventToggle && 
                    
                    <div className="flex flex-col gap-2">
                        { createToggle ?
                            <>
                            </>
                        :
                            <>
                            <div className="flex flex-col gap-2">
                                <h1 className="text-2xl font-light py-2 text-center bg-gray-300 rounded-md">Your Events</h1>
                                <div className="flex gap-2 flex-col sm:flex-row sm:justify-around">
                                    <div className="flex justify-end">
                                    <button  onClick={() => setCreateToggle((prev) => !prev) } className="bg-yellow-400 p-1 px-2 rounded-md">Create Event</button>
                                    </div>
                                    
                                    <div className="flex justify-end gap-2">
                                        <input type="text" className="p-0.5 rounded-md" />
                                        <button className="bg-gray-300 p-1 px-2 rounded-md">Search</button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2 justify-between p-1 rounded-md bg-gray-500">
                                <button className="bg-emerald-400 p-1 px-2 rounded-md">Events you created</button>
                                <button className="bg-emerald-400 p-1 px-2 rounded-md">Events Invited to</button>
                                <button className="bg-emerald-400 p-1 px-2 rounded-md">Drafts</button>
                            </div>
                            </>
                        }
                        
                        { createToggle ? 
                            <>
                            <div className="p-1">
                                <button  onClick={() => setCreateToggle((prev) => !prev) } className="bg-yellow-400 p-1 px-2 rounded-md">Back</button>
                            </div>
                                <CreateEventForm />
                            </>
                            :
                            <div className="bg-gray-500 rounded-md h-[30rem] p-2 md:p-4 flex flex-col gap-2 overflow-y-scroll scroll-track scroll-w scroll-handle">
                            
                                { arr.length === 0 ? 
                                <div className="bg-gray-400 p-10 text-center rounded-md">
                                    <p className="text-2xl">You Have no events yet</p>
                                </div>
                                :
                                <>
                                    {loop}
                                </>
                                }
                            </div>
                        }
                    </div>
                    }
                </div>
                
            </div>
            
        </div>
    )
}

export default EventsContainer