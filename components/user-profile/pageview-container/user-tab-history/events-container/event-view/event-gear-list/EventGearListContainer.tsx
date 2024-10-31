import { useState } from "react"
import GearTypeCard from "./gear-type-card/GearTypeCard"
import UserPackDetailsCard from "./user-pack-details/UserPackDetailsCard"

const EventGearListContainer = () => {

    const [toggle, setToggle] = useState<boolean>(false)

    const toggleHandler = () => {

    }

    const pack = [1,2,3,4,5,6,7,8].map(item => {
        return (
            <div key={item}>
                <UserPackDetailsCard />
            </div>
            
        )
    })

    const gear = [1,2,3,4,5,6,7,8].map(item => {
        return (
            <div key={item}>
                <GearTypeCard />
            </div>
            
        )
    })

    return (
        <div className="p-2 bg-gray-200 rounded-md w-full">

            <div>
                <h1 className="text-center font-medium text-lg">Event Gear List</h1>
            </div>

            <div className="bg-gray-300 rounded-md p-4">
                Event Pack filter type dropdown / Quick Category Pick: Pack, Kitchen, Shelter, Sleep / List of usernames to view their pack contents
            </div>
            <div className="mt-2 p-1 bg-gray-300 rounded-md gap-2 lg:grid flex flex-col lg:grid-cols-2">
                
                <div className="bg-gray-400 p-1 h-[35rem] lg:h-[45rem] rounded-md">
                    <div className="h-[12%]">
                    <div className="bg-gray-400 p-1 rounded-md flex flex-col">
                            <div className="text-center">
                                Viewing {toggle ? "Pack" : "Gear"}
                            </div>
                            <div className="flex  justify-around">
                                <button className="bg-gray-300 px-1 rounded-md" onClick={() => setToggle(false)}>Gear</button>
                                <button className="bg-gray-300 px-1 rounded-md" onClick={() => setToggle(true)}>Pack</button>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-300 rounded-md p-2 h-[88%] gap-2 flex flex-col overflow-y-scroll scroll-track scroll-w scroll-handle">

                        

                        {
                            toggle ? 
                            <div className="flex flex-col gap-2">
                                {pack}
                            </div>
                            :
                            <div className="flex flex-col gap-2">
                                {gear}
                            </div>
                        }
                        
                        
                        

                    </div>
                </div>
                
                <div className="bg-gray-400 p-1 h-96 lg:h-full flex gap-2 lg:flex-col rounded-md">
                    <div className="bg-gray-300 p-2 h-[100%] lg:h-[50%] w-full rounded-md">
                        Detail Window: Food Status - all meals covered?
                        <br/>
                        <p>Who has all items</p>
                        <br/>
                        <p>Who is missing items</p>
                    </div>
                    <div className="bg-gray-300 p-2 h-[100%] lg:h-[50%] w-full rounded-md">
                        <p>Item details from window on left/bottom</p>
                    </div>
                </div>
                
            </div>
        </div>
        
    )
}

export default EventGearListContainer