import GearItemCard from "../gear-item-card/GearItemCard"
import { useUserContext } from "@/app/context/UserContextProvider"
import { usePathname } from "next/navigation"


const GearViewer = (props: any) => {

    const { userName ,userGearList, packImages } = useUserContext()

    const pathname = usePathname()

    const friendName = pathname?.split("/user/").pop()

    const gearListDisplay = userGearList.map((item:any) => {

        const img = packImages.filter(gearVisuals => gearVisuals.category === item.gearItem.category && gearVisuals.type === item.gearItem.type).pop()
        
        return (
            <div className="flex cursor-pointer" onClick={() => handleGearInspection(item, img)} key={item.id}> 
                <GearItemCard 
                gearDetails={item}
                image={img}
                />
            </div>
        )
    })

    const handleGearInspection = (item:any, img:any) => {
        props.setViewSpecificGear({
            gearItem: item,
            image: img
        })
        props.setViewToggle(true)
    }

    return (
        <div className="mt-2">
                        <div className="flex justify-between">
                            <div>
                        {/* Turn this into a component to view the items, and nest it in another turnary for the pack configs. */}
                        <p>Gear Display:</p>
                        </div>
                        <div className="group">
                            <div className="hidden absolute mt-7 -ml-10 sm:-ml-6 shadow-md shadow-gray-800/40 group-hover:flex">
                                <p className="bg-gray-200 p-2 rounded-md">Filter needs to be made</p>
                            </div>
                            <button className="bg-gray-500 text-gray-200 hover:text-gray-900 hover:bg-emerald-500 duration-200 rounded-md p-1">Filter</button>
                        </div>
                        </div>

                        <div className="bg-gray-400/50 rounded-md p-2 flex mt-2 ">
                            { userGearList.length === 0 ? 
                            <div className="mx-auto text-center py-10">
                                {userName === friendName ? <p className=" text-4xl font-normal text-gray-200">Make your first item, select Update Pack!</p> : <p className=" text-4xl font-normal text-gray-200">{friendName} hasn&#39;t added any items to their pack yet.</p>}
                            </div>

                            :
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 sm:gap-2">
                                {gearListDisplay}
                            </div>
                            }
                        </div>
                        
                    </div>
    )
}

export default GearViewer