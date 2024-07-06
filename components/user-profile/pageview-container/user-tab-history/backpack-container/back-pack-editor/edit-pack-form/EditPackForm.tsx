'use client'
import carImg from "../../../../../../../public/icons/car-icon.png"
import hikeImg from "../../../../../../../public/icons/hike-icon.png"
import floatImg from "../../../../../../../public/icons/float-icon.png"
import bikeImg from "../../../../../../../public/icons/bike-icon.png"
import dayImg from "../../../../../../../public/icons/daypack.png"

import { useUserContext } from "@/app/context/UserContextProvider"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
import PackConfigDisplayCard from "../../back-pack-viewer/pack-or-gear-viewer/pack-or-gear-viewer/PackConfigDisplayCard"
import DeletePackConfig from "./DeletePackConfig"

const URL: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL

const EditPackForm = (props: any) => {

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
                <div className="flex justify-center my-2">
                <DeletePackConfig 
                packConfig={option.id}/>
                </div>
            </div>
            
        )
    })

    return (
        <div className='bg-gray-600/90 p-2 rounded-md mt-2'> 

        <div className="">
            <h1 className="text-gray-200 text-2xl mb-2 border-b-[1px]">Choose Pack to Edit:</h1>
            <p className="mb-3 text-gray-200">Select Pack to Edit or Remove - (Edit ability needs to be made)</p>
        </div>
    
        <div className="grid grid-cols-2 md:grid-cols-3 gap-1 sm:gap-2 my-2">
            {allConfigs}
        </div>
        
        </div>
    )
}

export default EditPackForm