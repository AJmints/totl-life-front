'use client'

import { useState } from "react"
import MealQuickView from "./MealQuickView"

const FoodArrangementsContainer = () => {

    const [toggleParent, setToggleParent] = useState(false)
    const [toggle, setToggle] = useState(true)

    const t = (
        <div className="bg-gray-300 p-2 rounded-md text-xs">
            <p>Type: Bfast</p>
            <p>Meal: Eggs</p>
            <p>Feeds: Group (4-5)</p>
            <p>Chef: User 3</p>
            <p>Day: 2-3</p>
        </div>
        )
    const arr = [t,t,t,t,t,t,t,t,t,t,t,t,t,t,t]

    let num = arr.length
    const loop = arr.map((item) => {
        num--
        return (
            <div key={num}>
                {item}
            </div>   
        )
    })

    return (
        <>
        { toggleParent ? 
            <div className="p-1 w-full bg-gray-400 h-[26rem] flex flex-col gap-1 rounded-md">
                <div className={"flex flex-col gap-1" + ( !toggle ? " h-[18%]" : " h-[28%]")}>
                    <h1 className="font-semibold text-base bg-gray-200 p-2 rounded-md">Food Arrangements</h1>
                    {/* <p> / button to change the view for quick view for number of meals covered for the group</p> */}
                    <div className="flex justify-around bg-gray-300 px-1 rounded-md items-center">
                        <button onClick={() => setToggle((prev: any) => !prev)} className="bg-gray-200 px-2 my-1 rounded-md">{ !toggle ? "Show Filter" : "Hide Filter"}</button>
                        <button onClick={() => setToggleParent((prev: any) => !prev)} className="bg-gray-200 px-1 my-1 rounded-md">Back</button>
                    </div>
                    
                    <div className={"bg-gray-300 rounded-md p-1 flex justify-between lg:justify-around text-xs border-b-2 border-gray-500" + ( !toggle ? " hidden" : "")}>
                        <button className="bg-gray-200 rounded-md p-1">Bfast</button>
                        <button className="bg-gray-200 rounded-md p-1">Lunch</button>
                        <button className="bg-gray-200 rounded-md p-1">Dinner</button>
                        <button className="bg-gray-200 rounded-md p-1">Snaxs</button>
                    </div>
                </div>
                <div className={"flex flex-col" + ( !toggle ? " h-[72%]" : " h-[62%]")}>
                    
                    <div className=" p-1 flex flex-col gap-2 overflow-y-scroll scroll-track scroll-w scroll-handle">
                        {loop}
                    </div>

                </div>
                <div className="h-[10%] flex items-center">
                    <button className="bg-gray-300 px-1 rounded-md">Add Meal</button>
                </div>
            </div>
        : 
        <MealQuickView 
        setToggleParent={setToggleParent}/>
        }
        
        </>
        
    )
}

export default FoodArrangementsContainer