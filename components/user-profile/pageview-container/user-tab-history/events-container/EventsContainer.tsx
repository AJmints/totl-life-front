'use client'

import { useState } from "react"

const EventsContainer = () => {

    const [recListToggle, setRecListToggle] = useState<boolean>(false)

    return (
        <div>
            <div className="p-2 bg-gray-400 rounded-md w-[30%] mb-2">
                <p className=" font-medium text-4xl">Events Page</p>
                <p>What needs to be stored at the top of the component tree and what needs it's own calls?</p>
            </div>
            {/* What needs to be stored at the top of the component tree and what needs it's own calls? */}

            <div className="p-2 bg-gray-400 rounded-md text-gray-900">

                <div className="p-2 bg-gray-300 rounded-md gap-2 flex">                    

                    <div className="bg-gray-300 rounded-md w-full space-y-2">

                        <div className="bg-gray-300 h-auto space-y-2 lg:space-y-0 lg:flex justify-between gap-2">
                            <div className="bg-gray-400 rounded-md p-2 space-y-2 lg:w-[50%] w-auto">
                                <div className=" bg-gray-300 items-center rounded-md p-2 space-y-2">
                                    <h1 className="font-light text-3xl">event name</h1>
                                    <p className="font-extralight text-xs">created by</p>
                                </div>
                                
                                <div className="bg-gray-300 rounded-md p-2">
                                    <p>camp ground/park/trail/river name</p>
                                    <p>public or private</p>
                                    <p>date time</p>
                                </div>
                            </div>

                            <div className="flex lg:w-[50%] gap-2 w-auto">
                                <div className="bg-gray-400 rounded-md p-2 w-[30%] space-y-2">
                                    <div className="bg-gray-300 p-4 rounded-md py-10">
                                        <p>Map</p>
                                    </div>
                                    <p>Map with link on Google Maps</p>
                                </div>

                                <div className="bg-gray-400 rounded-md p-2 w-[70%] flex gap-1">
                                    <div className="bg-gray-300 text-xs rounded-md p-2 h-20 w-[30%]">
                                    Image with type of trip (Float, BackPack, Car, Bike, Climb)
                                    </div>
                                    
                                    <div className="bg-gray-300 rounded-md p-2 w-[70%]">
                                        <p> / (Current Season **box within trip type) / User Notes about event</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        
                        <div className="p-1 bg-gray-400 w-full justify-between gap-2 flex flex-col col-span-1 items-center rounded-md"> 
                            <h1 className="font-medium text-base text-center">
                                Camp Frens
                            </h1>
                            <div className="bg-gray-300 rounded-md w-full mb-1 p-2">
                                <div className="bg-gray-400 p-1 w-32 rounded-md text-xs flex flex-col gap-2 justify-center">
                                    <div className="bg-gray-300 p-5 mx-auto text-center rounded-full ">
                                        <p className="absolute">photo</p>
                                    </div>
                                    <div className="bg-gray-300 p-1 rounded-md text-center">
                                        User Name
                                    </div>
                                </div>
                            </div>
                        
                        </div>

                        <div className=" bg-gray-300 space-y-2 lg:space-y-0 lg:flex lg:gap-2">
                            <div className="p-2 bg-gray-200 rounded-md w-full">

                                <div>
                                    <h1 className="text-center font-medium text-lg">Event Gear List</h1>
                                </div>

                                <div className="bg-gray-300 rounded-md p-4">
                                    Event Pack filter type dropdown / Quick Category Pick: Pack, Kitchen, Shelter, Sleep / List of usernames to view their pack contents
                                </div>
                                <div className="mt-2 p-2 bg-gray-300 rounded-md gap-2 grid grid-cols-1 lg:grid-cols-2">
                                    
                                    <div className="bg-gray-400 p-2 rounded-md">
                                        <div className="bg-gray-300 rounded-md p-2 h-44 lg:h-full">
                                            <p>Displayed in card or row card form</p><br/>
                                            <p>Ex. 10x packs, 4x sleepbags, 7x tents, 3x hammocks</p>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-gray-400 p-2 rounded-md space-y-2">
                                        <div className="bg-gray-300 py-28 w-full rounded-md">
                                            Detail Window:
                                            <br/>
                                            <p>Who is missing items from rec list? (Undecided still)</p>
                                            <br/>
                                            <p>details about selected item below</p>
                                        </div>
                                        <div className="bg-gray-300 py-28 w-full rounded-md">
                                            List of each item from List of all items window on left
                                            <br/>
                                            <p>Ex. List of 4 sleepbags with the owners name next to it</p>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>

                            <div className="bg-gray-200 rounded-md block space-y-2 md:space-y-0 md:flex items-center gap-2 lg:block lg:w-[30%] p-2">
                                <div className="bg-gray-300 rounded-md lg:h-[40%] lg:w-full lg:mb-1 p-4 md:w-[50%] md:h-80 h-56 ">
                                    <p>7. Group Food arrangements</p>
                                </div>
                                <div className="bg-gray-300 rounded-md lg:h-[60%] lg:w-full lg:mt-1 p-4 md:w-[50%] md:h-80 h-56 ">
                                    2. Recomendation list of items to bring from Event host
                                </div>
                            </div>
                            
                        </div>
                        
                    </div>

                </div>

                <div className="p-4 bg-gray-300 rounded-md mt-2">
                    8. Coments
                </div>

            </div>
        </div>
    )
}

export default EventsContainer