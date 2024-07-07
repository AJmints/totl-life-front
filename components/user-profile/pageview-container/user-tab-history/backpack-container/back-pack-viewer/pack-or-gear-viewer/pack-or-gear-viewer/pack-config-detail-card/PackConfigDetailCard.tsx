
import Image from "next/image"
import { useUserContext } from "@/app/context/UserContextProvider"
import GearItemCard from "../../../gear-item-card/GearItemCard"

const PackConfigDetailCard = (props: any) => {

    const packDetails = props.specificPack.specificPackConfig

    const { packImages } = useUserContext()

    const viewPackConfigGear = packDetails.userGearList.map((item:any) => {

        const img = packImages.filter(gearVisuals => gearVisuals.category === item.gearItem.category && gearVisuals.type === item.gearItem.type).pop()
        
        return (
            <div className="mx-auto"  key={item.id}> 
            {/* onClick={() => handleGearInspection(item, img)} -- Update to create a display of the gear items details*/}
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
        <div className="m-2 rounded-md p-2 text-lg bg-gray-500 text-gray-100">

        <div>
            <button className="bg-gray-400 hover:bg-emerald-500 duration-200 p-1 rounded-md" onClick={() => props.setPackView(false)}>Back</button>
        </div>

        <div className="mt-4">
            <div>
                <p className="text-md">Pack Type:</p>
                <h1 className="text-xl font-medium">{packDetails.configType}</h1>
            </div>
            <Image
            src={props.specificPack.img.src}
            alt=""
            width={200}
            height={200}
            className="rounded-md my-2"
            />
        </div>
        <div className="my-2">
            <p className="text-md">Pack Name:</p>
            <p className="text-xl font-medium">{packDetails.packName}</p>
        </div>

        <div>
            <p>Created: {packDetails.dateCreated}</p>
        </div>

        {packDetails.packNotes !== "" && <><p>Notes:</p><p className="text-sm font-medium">{packDetails.packNotes}</p></>}  

        <div>
            <p>Gear in Pack:</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
            {viewPackConfigGear}
        </div>
        </div>
    )
}

export default PackConfigDetailCard