'use client'

import { useEffect, useState } from "react"

const EventFoodRec = (props: any) => {

    let difference = props.eventDetails.eventEnd.getTime() - props.eventDetails.eventStart.getTime()
    let totalDays = Math.round(difference / (1000 * 3600 * 24))

    useEffect(() => {
        updateList()
    }, [])

    const updateList = () => {
        let difference = props.eventDetails.eventEnd.getTime() - props.eventDetails.eventStart.getTime()
        let totalDays = Math.round(difference / (1000 * 3600 * 24))
        let timeStart = Number(props.eventDetails.startTime.substring(0,2))
        let timeEnd = Number(props.eventDetails.endTime.substring(0,2))

        let arr = []
        for (let i = 1; i <= totalDays; i++) {
            let day = {}
            if (i === 1) {
                day = {
                    ID: i,
                    bfast: (timeStart < 10 ? "person" : "empty"), // make logic to determine if meal is needed based on start/end time
                    lunch: (timeStart < 14 ? "person" : "empty"),
                    dinner: (timeStart < 20 ? "person" : "empty"),
                    snacks: "person",
                    notes: ""
                }
            } else if (i === totalDays) {
                day = {
                    ID: i,
                    bfast: (timeEnd > 10 ? "person" : "empty"), // make logic to determine if meal is needed based on start/end time
                    lunch: (timeEnd > 14 ? "person" : "empty"),
                    dinner: (timeEnd > 20 ? "person" : "empty"),
                    snacks: "person",
                    notes: ""
                }
            } else {
                day = {
                    ID: i,
                    bfast: "person", // make logic to determine if meal is needed based on start/end time
                    lunch: "person",
                    dinner: "person",
                    snacks: "person",
                    notes: ""
                }
            }
            
            arr.push(day)
        }
        props.setMealPlan(arr)
    }

    const viewDays = props.mealPlan.map((day:any) => { 
        return (
            <div key={day.ID} className="bg-gray-200 p-2 rounded-md"> 
                <div className="bg-gray-300 p-1 rounded-md flex flex-col gap-1">
                    <p className="bg-gray-100 rounded-md p-1">Day {day.ID}</p>
                    {day.bfast === "empty" ? 
                    <p className="p-1">Bfast: N/A</p> 
                    :                    
                    <div className="flex gap-1 items-center justify-between">
                        <p className={"rounded-md px-1 " + (day.bfast === "person" ? "bg-emerald-300" : "bg-green-300")}>Bfast: Per-{day.bfast === 'person' ? "person" : "group"}</p>
                        <button className="bg-gray-400 rounded-full py-1 px-3 hover:bg-yellow-500 shadow-md duration-200" onClick={() => updateDay("bfast", day)}>{day.bfast === 'person' ? "<" : ">"}</button>
                    </div>
                    }
                    {day.lunch === "empty" ? 
                    <p className="p-1">Lunch: N/A</p> 
                    :    
                    <div className="flex gap-1 items-center justify-between">
                        <p className={"rounded-md px-1 " + (day.lunch === "person" ? "bg-emerald-300" : "bg-green-300")}>Lunch: Per-{day.lunch}</p>
                        <button className="bg-gray-400 rounded-full py-1 px-3 hover:bg-yellow-500 shadow-md duration-200" onClick={() => updateDay("lunch", day)}>{day.lunch === 'person' ? "<" : ">"}</button>
                    </div>
                    }
                    {day.dinner === "empty" ? 
                    <p className="p-1">Dinner: N/A</p> 
                    :    
                    <div className="flex gap-1 items-center justify-between">
                        <p className={"rounded-md px-1 " + (day.dinner === "person" ? "bg-emerald-300" : "bg-green-300")}>Dinner: Per-{day.dinner}</p>
                        <button className="bg-gray-400 rounded-full py-1 px-3 hover:bg-yellow-500 shadow-md duration-200" onClick={() => updateDay("dinner", day)}>{day.dinner === 'person' ? "<" : ">"}</button>
                    </div>
                    }
                    <div className="flex gap-1 items-center justify-between">
                        <p className={"rounded-md px-1 " + (day.snacks === "person" ? "bg-emerald-300" : "bg-green-300")}>Snacks: Per-{day.snacks}</p>
                        <button className="bg-gray-400 rounded-full py-1 px-3 hover:bg-yellow-500 shadow-md duration-200" onClick={() => updateDay("snacks", day)}>{day.snacks === 'person' ? "<" : ">"}</button>    
                    </div>
                    
                    <div className='flex flex-col duration-200 rounded-md'>
                        <label className=" font-light">Note:</label>
                        <div className="flex gap-4">
                        <textarea 
                            className="rounded-md font-normal w-[40rem] p-1 px-2 resize-none overflow-y-scroll scroll-track scroll-w scroll-handle"
                            rows={4} 
                            placeholder="Special meal details for this day?"
                            defaultValue={day.notes}
                            minLength={3} maxLength={100}
                            onChange={() => handleNote(event, day)}
                        />
                        
                        </div>
                        <p className="">{day.notes.length}/100</p>
                    </div>
                </div>
            </div>
        )
    })
    
    const updateDay = (name: string, day: any) => {

        let arr = props.mealPlan
        let update = props.mealPlan.filter((updateTarget: any) => {
            return updateTarget.ID === day.ID
        }).pop()

        if(update[name] === "person") {
            update[name] = "group"
        } else {
            update[name] = "person"
        }
        arr[update.ID - 1] = update
        props.setMealPlan([...arr])
    }

    const handleNote = (event: any, day: any) => {
        event.preventDefault()
        let arr = props.mealPlan
        let update = props.mealPlan.filter((updateTarget: any) => {
            return updateTarget.ID === day.ID
        }).pop()
        update.notes = event.target.value
        arr[update.ID - 1] = update
        props.setMealPlan([...arr])
    }



    return (
        <>
        <div className="bg-gray-400 p-2 rounded-md flex flex-col gap-2">
            <div className='bg-gray-300 p-2 rounded-md'>
                <h1 className='text-2xl'>Food Recommendation List</h1>
                <h1 className='text-sm'>How are meals handled for the following days? By the individual, or is this a group meal?</h1>
            </div>
            <div className="flex justify-center">
                <div className="bg-gray-300 p-2 rounded-md flex flex-col justify-center">
                    <p className="text-center font-bold">Event from:</p>
                    <p>Start: {props.eventDetails.eventStart.toDateString()} - End: {props.eventDetails.eventEnd.toDateString()}</p>
                    <p className="text-center">For: {totalDays} days</p>
                </div>

            </div>
            <div className="bg-gray-300 p-2 rounded-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                {viewDays}
            </div>
            <div className="bg-gray-300 p-2 rounded-md">
                <p>When your meal schedule looks correct, select next.</p>
            </div>
        </div>
        </>
    )
}

export default EventFoodRec