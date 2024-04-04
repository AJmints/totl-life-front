import GearItemCard from "./gear-item-card/GearItemCard"
import { useUserContext } from "@/app/context/UserContextProvider"

const BackPackViewer = (props: any) => {

    const { userGearList } = useUserContext()

    const gearListDisplay = userGearList.map((item:any) => {

        return (
            <div key={item.id}> 
                <GearItemCard 
                gearDetails={item}
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
                    <div className="grid grid-cols-3 gap-2">
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