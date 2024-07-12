
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
            <button className="bg-gray-400 hover:bg-emerald-500 text-gray-800 duration-200 p-1 rounded-md" onClick={() => props.setPackView(false)}>Back</button>
        </div>

        <div className="mt-4">
            <div className="bg-gray-600 p-2 rounded-md text-center">
                <p className="text-md">Pack Type</p>
                <h1 className="text-xl font-medium bg-gray-500 p-2 rounded-md">{packDetails.configType}</h1>
            </div>
            <div className="p-2 my-2 bg-gray-600 rounded-md flex justify-center">
                <div className="bg-gray-500 rounded-md p-2">
                <Image
                src={props.specificPack.img.src}
                alt=""
                width={200}
                height={200}
                className="rounded-md"
                />
                </div>
            </div>
        </div>

        <div className="bg-gray-600 p-2 rounded-md">
        <div className="">
            <p className="text-md">Pack Name:</p>
            <div className="text-xs bg-gray-500 p-2 rounded-md">
                <p className="text-xl font-medium">{packDetails.packName}</p>
                <p>Created: {packDetails.dateCreated}</p>
            </div>
        </div>
        
        </div>

        {packDetails.packNotes !== "" && 
            <div className="mt-2 bg-gray-600 p-2 rounded-md">
                <p className="font-normal">Notes:</p>
                <p className="text-sm font-light bg-gray-500 p-2 rounded-md">{packDetails.packNotes}</p>
            </div>
        }

        <div className="">
        <div className="mt-5"> 
            <p>Gear in Pack:</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-1 text-gray-800">
            {viewPackConfigGear}
        </div>
        </div>

        </div>
    )
}

export default PackConfigDetailCard