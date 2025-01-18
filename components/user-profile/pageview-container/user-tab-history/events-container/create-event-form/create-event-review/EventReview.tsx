'use client'

import Image from "next/image"
import userIcon from "@/public/icons/profile-pic.png"
import { useUserContext } from "@/app/context/UserContextProvider" 

const EventReview = (props: any) => {

    const {userFriendList} = useUserContext()

    const eventDetails = props.eventDetails
    const gearRecList = props.gearRecList
    const mealPlan = props.mealPlan

    const check = () => {
        let maybe = Date.parse(props.eventDetails.startDate)
        return new Date(maybe)
    }

    const viewGear = props.gearRecList.map((item:any) => {
            return (
                <div key={item.id} className='bg-gray-400 rounded-md p-1 flex sm:flex-row flex-col justify-around gap-1 items-center'>
                    <div className=''>
                        <Image
                        src={item.img}
                        alt={""}
                        width={100}
                        height={100}
                        className='rounded-md h-12 sm:h-auto w-auto'
                        />
                    </div>
                    <div className='flex flex-col gap-2 text-sm'>
                        <div className='bg-gray-300 p-2 rounded-md'>
                            <p>Category: {item.category}</p>
                            <p>Type: {item.gearType}</p>
                            <p>{item.count} per {item.groupType}</p>
                        </div>
                        {/* <div className='flex justify-end'>
                            <button onClick={() => remove(item)} className='bg-yellow-500/90 px-2 rounded-md'>Remove</button>
                        </div> */}
                    </div>
                    
                </div>
            )
        })
        const viewMeals = props.mealPlan.map((day:any) => { 
            return (
                <div key={day.ID} className="bg-gray-200 p-2 rounded-md"> 
                    <div className="bg-gray-300 p-1 rounded-md flex flex-col gap-1">
                        <p className="bg-gray-100 rounded-md p-1">Day {day.ID}</p>
                        {day.bfast === "empty" ? 
                        <p className="p-1">Bfast: N/A</p> 
                        :                    
                        <div className="flex gap-1 items-center justify-between">
                            <p className={"rounded-md px-1 " + (day.bfast === "person" ? "bg-emerald-300" : "bg-green-300")}>Bfast: Per-{day.bfast === 'person' ? "person" : "group"}</p>
                            {/* <button className="bg-gray-400 rounded-full py-1 px-3 hover:bg-yellow-500 shadow-md duration-200" onClick={() => updateDay("bfast", day)}>{day.bfast === 'person' ? "<" : ">"}</button> */}
                        </div>
                        }
                        {day.lunch === "empty" ? 
                        <p className="p-1">Lunch: N/A</p> 
                        :    
                        <div className="flex gap-1 items-center justify-between">
                            <p className={"rounded-md px-1 " + (day.lunch === "person" ? "bg-emerald-300" : "bg-green-300")}>Lunch: Per-{day.lunch}</p>
                            {/* <button className="bg-gray-400 rounded-full py-1 px-3 hover:bg-yellow-500 shadow-md duration-200" onClick={() => updateDay("lunch", day)}>{day.lunch === 'person' ? "<" : ">"}</button> */}
                        </div>
                        }
                        {day.dinner === "empty" ? 
                        <p className="p-1">Dinner: N/A</p> 
                        :    
                        <div className="flex gap-1 items-center justify-between">
                            <p className={"rounded-md px-1 " + (day.dinner === "person" ? "bg-emerald-300" : "bg-green-300")}>Dinner: Per-{day.dinner}</p>
                            {/* <button className="bg-gray-400 rounded-full py-1 px-3 hover:bg-yellow-500 shadow-md duration-200" onClick={() => updateDay("dinner", day)}>{day.dinner === 'person' ? "<" : ">"}</button> */}
                        </div>
                        }
                        <div className="flex gap-1 items-center justify-between">
                            <p className={"rounded-md px-1 " + (day.snacks === "person" ? "bg-emerald-300" : "bg-green-300")}>Snacks: Per-{day.snacks}</p>
                            {/* <button className="bg-gray-400 rounded-full py-1 px-3 hover:bg-yellow-500 shadow-md duration-200" onClick={() => updateDay("snacks", day)}>{day.snacks === 'person' ? "<" : ">"}</button>     */}
                        </div>
                        
                        <div className='flex flex-col duration-200 rounded-md bg-gray-100 p-1'>
                            <label className=" font-light">{day.notes.length > 0 ? "Note:" : ""}</label>
                            <p>{day.notes}</p>
                        </div>
                    </div>
                </div>
            )
        })

        const loop = userFriendList.map((item:any) => {
            return (
            <div className={"flex flex-col gap-1 rounded-md p-1 " + ( item.userName !== "gearSummary" ? " bg-gray-400 " : (true ? " border-emerald-500 border-2 bg-gray-500" : " border-red-800 border-2 bg-gray-500"))}>
            <div className="flex items-center">
                <div className=" mx-auto text-center">
                { item.pfp === null ?
                        <div>
                        <Image
                            src={userIcon}
                            alt=''
                            width={90}
                            height={90}
                            className='w-20 rounded-full'
                        /> 
                        </div>

                        :

                        <Image
                            src={'data:image/jpeg;base64,' + item.pfp.image}
                            alt=""
                            width={30}
                            height={30}
                            className="w-20 rounded-full"
                            
                        />
                    }
                </div>
            </div>
            <div className="bg-gray-300 w-32 p-1 rounded-md text-center">
                <p>{item.userName}</p>
            </div>
        </div>)
        })

    return (
        <div onClick={() => console.log(userFriendList)}>
            <div className="bg-gray-600 rounded-md p-1">
                <div className="bg-gray-400 rounded-md p-2 flex flex-col gap-1">
                    <div className="bg-gray-300 rounded-md p-1 text-center">
                        <h1 className="font-light text-xl">Your Event Details</h1>
                        <p>Please check that all information entered is correct</p>
                    </div>

                    <div className="bg-gray-300 rounded-md flex flex-col gap-1 p-1">
                        <div className="flex-col md:flex-row gap-1 flex justify-around">
                            <div className="bg-gray-200 rounded-md p-2">
                                <h1>Event Name: {eventDetails.eventName}</h1>
                                <p>Event is {eventDetails.isPrivate ? "Private" : "Public"}</p>
                                <h1>Address: {eventDetails.campGround.addressString}</h1>
                            </div>

                            <div className="bg-gray-200 rounded-md p-2">
                                <h1>Park Name: {eventDetails.campGround.name}</h1>
                                <p>Event Starts: {eventDetails.startDate}</p>
                                <p>Event End: {eventDetails.endDate}</p>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div className=" rounded-md bg-gray-100 p-2">
                                <p>Event Detail Notes:</p>
                                <p> {eventDetails.userDescription}</p>
                            </div>
                        </div>

                    </div>

                    <div className="bg-gray-300 p-2 gap-2 rounded-md flex-col w-[100%] lg:flex-row flex justify-around">

                        <div className="bg-gray-200 p-2 rounded-md lg:w-[70%]">
                            <p className="text-xl">BackPack Rec</p>
                            <p>These are all items you are recommending participants to bring</p>
                            <div className='p-2 h-[30rem] bg-gray-500 rounded-md  overflow-y-scroll scroll-track scroll-w scroll-handle'>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                                    {viewGear}
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-200 p-2 rounded-md lg:w-[30%]">
                            <p className="text-xl">Meal Plan</p>
                            <p>Meal plan breakdown</p>
                            <div className='p-2 h-[30rem] bg-gray-500 rounded-md  overflow-y-scroll scroll-track scroll-w scroll-handle'>
                                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-2'>
                                    {viewMeals}
                                </div>
                            </div>
                        </div>
                        
                    </div>

                    <div className="bg-gray-300 p-2 rounded-md flex flex-col gap-1">
                        <div className="bg-gray-100 p-1 rounded-md">
                            <p className="text-2xl">Friend List</p>
                            <p>Who would you like to invite to this event?</p>
                        </div>
                        <div className="bg-gray-100 p-1 rounded-md">
                            <div>
                                <p>search</p>
                            </div>
                            <div className="p-1 rounded-md text-xs mx-auto flex gap-2 overflow-x-scroll scroll-track scroll-w scroll-handle">
                                {loop}
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-300 p-2 rounded-md">
                        <div>
                            <p>If all looks good, select "Submit" to create your event</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventReview