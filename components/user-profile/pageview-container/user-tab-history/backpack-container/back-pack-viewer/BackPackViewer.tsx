'use client'

import { useState } from "react"
import { useUserContext } from "@/app/context/UserContextProvider"
import GearItemCard from "./gear-item-card/GearItemCard"
import GearInspectorCard from "./gear-inspector-card/GearInspectorCard"

const BackPackViewer = (props: any) => {

    const [ viewSpecificGear, setViewSpecificGear ] = useState<any>()
    const [ viewToggle, setViewToggle ] = useState<boolean>(false)
    const { userGearList, packImages } = useUserContext()

    const gearListDisplay = userGearList.map((item:any) => {

        const img = packImages.filter(gearVisuals => gearVisuals.category === item.gearItem.category && gearVisuals.type === item.gearItem.type).pop()
        
        return (
            <div className=" cursor-pointer" onClick={() => handleGearInspection(item, img)} key={item.id}> 
                <GearItemCard 
                gearDetails={item}
                image={img}
                />
            </div>
        )
    })

    const handleGearInspection = (item:any, img:any) => {
        setViewSpecificGear({
            gearItem: item,
            image: img
        })
        setViewToggle(true)
    }

    return (
        <>
        {props.packContents ? 
            <>
            
            <div>
                <div className="flex flex-wrap gap-2 font-light">
                    <button className="bg-gray-500 text-gray-200 hover:text-gray-900 hover:bg-emerald-500 duration-200 rounded-md p-2">All Gear</button>
                    
                    <button className="bg-gray-500 text-gray-200 hover:text-gray-900 hover:bg-emerald-500 duration-200 rounded-md p-1">Floating Pack Config</button>
                <button className="bg-gray-500 text-gray-200 hover:text-gray-900 hover:bg-emerald-500 duration-200 rounded-md p-1">Hiking Pack Config</button>
                    {/* Clicking All Gear shows all Gear
                    Selecting Add New Pack goes to a form to make a backpack config
                    Selecting Example Config shows all gear that is a part of that configuration + Title changes */}
                </div>
                
                { viewToggle ?
                    <GearInspectorCard
                    viewSpecificGear={viewSpecificGear}
                    setViewToggle={setViewToggle}
                    />
                    :
                    <div className="mt-3">
                        <div className="flex justify-between">
                            <div>
                        <h1 className="text-2xl font-normal">Viewing All Gear</h1> {/* Title that changes */}
                        <p>Gear Display:</p>
                        </div>
                        <div>
                            <button className="bg-gray-500 text-gray-200 hover:text-gray-900 hover:bg-emerald-500 duration-200 rounded-md p-1">Filter</button>
                        </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-1 sm:gap-2">
                            {gearListDisplay}
                        </div>
                        
                    </div>
                }

            </div>
            
            </>
            :
            <>Loading</>
        } 
        </>
    )
}

export default BackPackViewer