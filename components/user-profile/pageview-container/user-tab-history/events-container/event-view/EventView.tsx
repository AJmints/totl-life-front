"use client"

import { useState, useEffect } from "react"
import {URL} from "@/lib/globalConstants"
import EventGearListContainer from "./event-gear-list/EventGearListContainer"
import FoodArrangementsContainer from "./food-arrangements/FoodArrangementsContainer"
import FriendListContainer from "./friend-list/FriendListContainer"
import RecommendedGearContainer from "./recommended-gear/RecommendedGear"
import EventTypeImage from "./EventTypeImage"

const EventView = (props: any) => {

    const eventID = props.viewEvent

    const [event, setEvent] = useState<any>({})

    useEffect(() => {
        const listCheck = async() => {
                    const getOtherUserDetails = await fetch(URL + "/campevent/getSpecificEvent/" + eventID, { // Use eventID 68 for testing
                        method: 'GET'
                    })
                    const response = await getOtherUserDetails.json().catch((err) => {
                        console.log(err)
                    })
                    console.log(response)
                    setEvent(response)
                }
                
                listCheck()
    }, [])

    return (
        <div>
            {/* What needs to be stored at the top of the component tree and what needs it's own calls? */}
            {/* What other components are gonna be needed? Events Create form, Events edit form, Events Invite, View Upcoming Events, View Past Events  */}

            <div className="p-2 bg-gray-400 rounded-md text-gray-900">

                <div className="p-2 bg-gray-300 rounded-md gap-2 flex">

                    <div className="bg-gray-300 rounded-md w-full space-y-2">

                        <div className="bg-gray-300 h-auto space-y-2 lg:space-y-0 lg:flex justify-between gap-2">
                            <div className="bg-gray-400 rounded-md p-2 space-y-2 gap-2 lg:w-[50%]">
                                <div className="bg-gray-400 space-y-2 rounded-md">
                                    <div className=" bg-gray-300 w-full rounded-md p-2 space-y-2">
                                        <h1 className="font-light text-3xl bg-gray-200 p-1 rounded-md">{event.eventName}</h1>
                                        <p className="font-extralight text-xs">Made by: {event.createdBy}</p>
                                        <p className="font-extralight text-xs">{event.isPrivate ? "Private" : "Public"} Event</p>
                                    </div>
                                    <div className="bg-gray-300 rounded-md p-2">
                                        <p className="text-sm font-light bg-gray-200 p-1 rounded-md">Park Name:</p>
                                        <p className="text-lg font-light mb-2">{event.parkName}</p>
                                        <p className="text-sm font-light bg-gray-200 p-1 rounded-md">Starts:</p>
                                        <p className="text-lg font-light">{event.startDate} @ {event.startTime}</p>
                                        <p className="text-sm font-light bg-gray-200 p-1 rounded-md">Ends:</p>
                                        <p className="text-lg font-light">{event.endDate} @ {event.endTime}</p>
                                        <p>// a Days b Nights</p>
                                    </div>
                                </div>
                                <div className=" md:w-[100%] md:block p-2 space-y-2 bg-gray-300 rounded-md">
                                    <div className="justify-items-center">
                                        <p className="bg-gray-400 rounded-md p-10">map</p>
                                    </div>
                                    <div className="">
                                        <p className="text-sm font-light bg-gray-200 p-1 rounded-md">Address: </p>
                                        <p className="text-lg font-light">{event.parkAddress}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:w-[50%] space-y-2 w-auto">
                                <div className="bg-gray-400 rounded-md p-2 space-y-2">
                                    <div className="bg-gray-300 rounded-md">
                                        <div className="p-2">
                                            <EventTypeImage type={event.eventType} />
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-400 rounded-md p-2 flex gap-1">
                                    <div className="bg-gray-300 rounded-md p-2">
                                        <p>Description: {event.eventDetails}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        
                        <div className="p-1 bg-gray-400 flex flex-col items-center rounded-md"> 
                            
                            <div className="bg-gray-300 w-full rounded-md mb-1 p-2">
                                <h1 className="font-medium text-base text-center bg-gray-200 p-1 rounded-md mb-1">
                                    Camp Frens
                                </h1>
                                <FriendListContainer 
                                source={""}
                                gearTotal={"0"}
                                list={event.inviteList} />
                            </div>
                        
                        </div>

                        <div className=" bg-gray-300 space-y-2 lg:space-y-0 lg:flex lg:gap-2">
                            
                            <div className="lg:w-[75%] xl:w-[70%]">
                                <EventGearListContainer
                                list={event.inviteList}/>
                            </div>

                            <div className="bg-gray-200 rounded-md flex md:flex-row lg:flex-col flex-col w-full h-[100%] gap-1 lg:w-[25%] xl:w-[30%] p-2">
                                
                                <div className="rounded-md w-full md:w-[50%] lg:w-full h-[50%] flex flex-col">
                                    
                                    <FoodArrangementsContainer />
                                    
                                </div>
                                
                                <div className="rounded-md w-full md:w-[50%] lg:w-full h-[50%] flex flex-col">
                                    
                                    <RecommendedGearContainer />
                                    
                                </div>
                            </div>
                            
                        </div>
                        
                    </div>

                </div>

                <div className="p-4 bg-gray-300 rounded-md mt-2">
                    7. Event Description detail from user 1000 char limit
                    8. Coments
                </div>

            </div>
        </div>
    )
}

export default EventView