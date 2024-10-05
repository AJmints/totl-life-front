'use client'

import { useEffect } from "react"
import { useUserContext } from "@/app/context/UserContextProvider"
import ModifyGearItem from "./modify-gear-item/ModifyGearItem"

const ModifyGearDisplay = () => {

    const { userGearList, setUserGearList, packImages } = useUserContext()

    useEffect(() => {
        
    }, [userGearList])

    const gearListDisplay = userGearList.map((item:any) => {

        let img:any
        if (item.gearItem !== undefined) {
            img = packImages.filter(gearVisuals => gearVisuals.category === item.gearItem.category && gearVisuals.type === item.gearItem.type).pop()
        }
        

        return (
            <div key={item.id}> 
                {/* ModifyGearItem card replaces this */}
                <ModifyGearItem 
                gearDetails={item}
                image={img}
                setUserGearList={setUserGearList}
                />
            </div>
        )
    })


    return (
        <div className="bg-slate-400/70 rounded-md">
            {userGearList.length === 0 ?
            <div className="flex justify-center text-center mt-5 py-5">
                <p className=" text-4xl font-normal text-gray-200">Make your first item, select Add Gear</p>
            </div>
        
            :   
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1 sm:gap-2">
                {gearListDisplay}
            </div>        
        }
            
        </div>
    )
}

export default ModifyGearDisplay