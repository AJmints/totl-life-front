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
import PackConfigDetailCard from "./pack-or-gear-viewer/pack-config-detail-card/PackConfigDetailCard"

import { URL } from '@/lib/globalConstants'

const PackConfigViewer = (props: any) => {

    const [ packView, setPackView ] = useState<boolean>(false)
    const [ packConfig, setPackConfig ] = useState<null | any>(null)
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
        console.log(props)
        
    }, [])

    const togglePackView = (specificPack: any) => {
        setPackView(true)
        let img
        if (specificPack.configType === "Car Camping") {
            img = carImg
        }
        if (specificPack.configType === "Day Hike") {
            img = dayImg
        }
        if (specificPack.configType === "Back Packing") {
            img = hikeImg
        }
        if (specificPack.configType === "Float Trip") {
            img = floatImg
        }
        if (specificPack.configType === "Bike Pack") {
            img = bikeImg
        }
        setPackConfig({
            specificPackConfig: specificPack, 
            img: img
        })
    }

    const allConfigs = props.userPackConfigs.map((option:any) => {
        return (
            <div key={option.id} onClick={() => togglePackView(option)} className="bg-gray-500 cursor-pointer text-gray-100 p-0.5 rounded-md">
                <PackConfigDisplayCard 
                packConfig={option}
                img={option.configType === "Car Camping" && carImg || option.configType === "Day Hike" && dayImg || option.configType === "Back Packing" && hikeImg ||option.configType === "Float Trip" && floatImg || option.configType === "Bike Pack" && bikeImg}
                />
            </div>
            
        )
    })

    return (
        <>
            { packView ? 
            <>
                <PackConfigDetailCard 
                setPackView={setPackView}
                specificPack={packConfig}/>
            </>
            :
            <div>
                <div className="my-2">
                    <p>Pack Configurations:</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-1 sm:gap-2 my-2">
                    {allConfigs}
                </div>
                <div>
                    {allConfigs.length === 0 && <>
                    
                    <div className="bg-gray-400 p-2 rounded-md h-96 flex justify-center items-center">
                        <div className="">
                            <button className="bg-gray-500 text-gray-100 p-2 rounded-md flex ">Create a new pack configuration</button>
                        </div>
                    </div>
                    
                    </>    
                    }
                </div>
            </div>
            }
        </>
        
    )
}

export default PackConfigViewer