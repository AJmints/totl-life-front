
import car from "@/public/icons/car-icon.png"
import float from "@/public/icons/float-icon.png"
import backPack from "@/public/icons/backpack.png"
import bike from "@/public/icons/bike-icon.png"
import Image from "next/image"

const EventTypeImage = (props: any) => {

    let type = car

    const whatType = () => {
        if (props.type === "car") {
            type = car
        } else if ( props.type === "float") {
            type = float
        } else if (props.type === "backPack") {
            type = backPack
        } else  {
            type = bike
        }
    }
    whatType()

    return (
        <>
        <div className="bg-gray-500 text-xs rounded-md p-2 space-y-2">
            <div className="font-light text-lg bg-gray-200 px-2 py-1 rounded-md">
                <p>{props?.type.charAt(0).toUpperCase() + props?.type.slice(1)} Adventure</p>
            </div>
            <Image 
            src={type}
            alt="auto"
            className="w-auto rounded-md mx-auto"
            />
        </div>
        </>
    )
}

export default EventTypeImage