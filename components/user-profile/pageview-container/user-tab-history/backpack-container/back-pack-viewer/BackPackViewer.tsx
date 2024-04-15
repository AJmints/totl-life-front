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
                <button className="bg-gray-400 hover:bg-emerald-500 duration-200 rounded-md p-2">Add New Pack</button>
                    <button className="bg-gray-400 hover:bg-emerald-500 duration-200 rounded-md p-2">All Gear</button>
                    
                    <button className="bg-gray-400 hover:bg-emerald-500 duration-200 rounded-md p-2">BackPack Config 1 Example</button>
                    {/* Clicking All Gear shows all Gear
                    Selecting Add New Pack goes to a form to make a backpack config
                    Selecting Example Config shows all gear that is a part of that configuration + Title changes */}
                </div>
                <div className="mt-3">
                <h1 className="text-2xl font-normal">Viewing All Gear</h1> {/* Title that changes */}
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