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
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1 sm:gap-2">
                {gearListDisplay}
            </div>
        </>
    )
}

export default ModifyGearDisplay