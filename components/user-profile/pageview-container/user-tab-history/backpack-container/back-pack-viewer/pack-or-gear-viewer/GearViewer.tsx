import GearItemCard from "../gear-item-card/GearItemCard"
import { useUserContext } from "@/app/context/UserContextProvider"


const GearViewer = (props: any) => {

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

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-1 sm:gap-2">
                            {gearListDisplay}
                        </div>
                        
                    </div>
    )
}

export default GearViewer