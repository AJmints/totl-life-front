'use client'

import carImg from "../../../../../../../public/icons/car-icon.png"
import hikeImg from "../../../../../../../public/icons/hike-icon.png"
import floatImg from "../../../../../../../public/icons/float-icon.png"
import bikeImg from "../../../../../../../public/icons/bike-icon.png"
import dayImg from "../../../../../../../public/icons/daypack.png"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { useUserContext } from "@/app/context/UserContextProvider"
import PackConfigDisplayCard from "./pack-or-gear-viewer/PackConfigDisplayCard"

const URL: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL

const PackConfigViewer = (props: any) => {

    const { setUserPackConfigs } = useUserContext()

    const pathname = usePathname()

    useEffect(() => {
        const getUserPacks = async() => {
            const userName = pathname?.split("/user/").pop()

            const createPack = await fetch(URL + "/backpack/get-user-pack-configs/" + userName)
            const response = await createPack.json().catch((err) => {
                console.log(err)
            })
            setUserPackConfigs(response)
        } 
        
        if (props.userPackConfigs.length <= 0) {
            getUserPacks()
        }
        
    }, [])

    const allConfigs = props.userPackConfigs.map((option:any) => {
        return (
            <div key={option.id} className="bg-gray-500 text-gray-100 p-0.5 rounded-md">
                <PackConfigDisplayCard 
                packConfig={option}
                img={option.configType === "Car Camping" && carImg || option.configType === "Day Hike" && dayImg || option.configType === "Back Packing" && hikeImg ||option.configType === "Float Trip" && floatImg || option.configType === "Bike Pack" && bikeImg}
                />
            </div>
            
        )
    })

    return (
        <>
            <div className="my-2">
                <p>Pack Configurations:</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1 sm:gap-2 my-2">
                {allConfigs}
            </div>
        </>
        
    )
}

export default PackConfigViewer