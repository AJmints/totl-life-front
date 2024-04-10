import { useUserContext } from "@/app/context/UserContextProvider"
import ModifyGearItem from "./modify-gear-item/ModifyGearItem"

const ModifyGearDisplay = () => {

    const { userGearList } = useUserContext()

    const gearListDisplay = userGearList.map((item:any) => {

        // console.log(item)

        return (
            <div key={item.id}> 
                {/* ModifyGearItem card replaces this */}
                <ModifyGearItem 
                gearDetails={item}
                />
            </div>
        )
    })


    return (
        <>
            <div className="grid grid-cols-3 gap-2">
                {gearListDisplay}
            </div>
        </>
    )
}

export default ModifyGearDisplay