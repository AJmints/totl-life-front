import { useUserContext } from "@/app/context/UserContextProvider"
import GearItemCard from "./gear-item-card/GearItemCard"

const BackPackViewer = (props: any) => {

    const { userGearList, packImages } = useUserContext()

    const gearListDisplay = userGearList.map((item:any) => {

        const img = packImages.filter(gearVisuals => gearVisuals.category === item.gearItem.category && gearVisuals.type === item.gearItem.type).pop()
        
        return (
            <div key={item.id}> 
                <GearItemCard 
                gearDetails={item}
                image={img}
                />
            </div>
        )
    })

    return (
        <>
        {props.packContents ? 
            <div>
                <div className="flex flex-wrap gap-2">
                    <button className="bg-gray-400 hover:bg-emerald-500 duration-200 rounded-md p-2">All Gear</button>
                    <button className="bg-gray-400 hover:bg-emerald-500 duration-200 rounded-md p-2">BackPack Config 1</button>
                    <button className="bg-gray-400 hover:bg-emerald-500 duration-200 rounded-md p-2">BackPack Config 2</button>
                </div>
                <div className="mt-3">
                <p>Gear Display:</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-1 sm:gap-2">
                        {gearListDisplay}
                    </div>
                </div>
            </div>
            :
            <>Loading</>
        } 


        </>
    )
}

export default BackPackViewer