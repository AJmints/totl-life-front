'use client'

import { useState } from "react"
import MealQuickView from "./MealQuickView"
import { isTemplateExpression } from "typescript"

const FoodArrangementsContainer = (props: any) => {

    let eventMealList = props?.eventMeals
    const [toggleParent, setToggleParent] = useState(true)
    const [toggle, setToggle] = useState(true)

    const loop = eventMealList?.map((item: any) => {
        return (
            <div key={item.id} className="bg-gray-300 p-2 rounded-md text-xs hover:bg-emerald-400 duration-200">
            <p className="font-semibold">Day: {item.sequenceId}</p>
            <p>Bfast: {item.mealEntry.bfast === "empty" ? "N/A" : item.mealEntry.bfast === "person" ? "Bring your own meal" : "Someone in the group has you covered!"}</p>
            <p>Lunch: {item.mealEntry.lunch === "empty" ? "N/A" : item.mealEntry.lunch === "person" ? "Bring your own meal" : "Someone in the group has you covered!"}</p>
            <p>Dinner: {item.mealEntry.dinner === "empty" ? "N/A" : item.mealEntry.dinner === "person" ? "Bring your own meal" : "Someone in the group has you covered!"}</p>
            <p>Snacks: {item.mealEntry.snacks === "empty" ? "N/A" : item.mealEntry.snacks === "person" ? "Bring your own snacks" : "Someone in the group has you covered!"}</p>
            <div className={(item.userNotes !== "" ? "space-x-2" : "") + " flex items-center mt-1"}>
                <p className="font-semibold">{item.userNotes !== "" ? "Notes:" : ""}</p>
                <button onClick={() => setToggleParent(prev => !prev)}  className="bg-gray-400 p-1 rounded-md">{item.userNotes !== "" ? "Update" : "Update Notes?"}</button>
            </div>
            <p>{item.userNotes !== "" ? item.userNotes : ""}</p>
        </div> 
        )
    })

    return (
        <>
        { toggleParent ? 
            <div className="p-1 w-full bg-gray-400 h-[26rem] flex flex-col gap-1 rounded-md">
                <h1 className="font-semibold text-base bg-gray-200 p-2 rounded-md">Food Arrangements</h1>
                {/* <div className={"flex flex-col gap-1" + ( !toggle ? " h-[18%]" : " h-[28%]")}>
                    <h1 className="font-semibold text-base bg-gray-200 p-2 rounded-md">Food Arrangements</h1> */}
                    {/* <p> / button to change the view for quick view for number of meals covered for the group</p> */}
                    {/* <div className="flex justify-around bg-gray-300 px-1 rounded-md items-center">
                        <button onClick={() => setToggle((prev: any) => !prev)} className="bg-gray-200 px-2 my-1 rounded-md">{ !toggle ? "Show Filter" : "Hide Filter"}</button>
                        <button onClick={() => setToggleParent((prev: any) => !prev)} className="bg-gray-200 px-1 my-1 rounded-md">Back</button>
                    </div>
                    
                    <div className={"bg-gray-300 rounded-md p-1 flex justify-between lg:justify-around text-xs border-b-2 border-gray-500" + ( !toggle ? " hidden" : "")}>
                        <button className="bg-gray-200 rounded-md p-1">Bfast</button>
                        <button className="bg-gray-200 rounded-md p-1">Lunch</button>
                        <button className="bg-gray-200 rounded-md p-1">Dinner</button>
                        <button className="bg-gray-200 rounded-md p-1">Snaxs</button>
                    </div>
                </div> */}
                <div className={"flex flex-col" + ( !toggle ? " h-[90%]" : " h-[82%]")}>
                    
                    <div className=" p-1 flex flex-col gap-2 overflow-y-scroll scroll-track scroll-w scroll-handle">
                        {loop}
                    </div>

                </div>
                {/* <div className="h-[10%] flex items-center">
                    <button className="bg-gray-300 px-1 rounded-md">Add Meal</button>
                </div> */}
            </div>
        : 
        <MealQuickView 
        setToggleParent={setToggleParent}/>
        }
        
        </>
        
    )
}

export default FoodArrangementsContainer