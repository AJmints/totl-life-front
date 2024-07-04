'use state'

import Image from "next/image"
import { useState } from "react"

const GearItemCard = (props : any) => {

    const [ checked, setChecked ] = useState(false)
    const [ enter, setEnter ] = useState(false)

    return (
        <div onMouseEnter={() => setEnter(true)} onMouseLeave={() => setEnter(false) } onClick={() => setChecked(prev => !prev)} className={checked ? "p-1 bg-yellow-500 hover:bg-red-600 duration-300 rounded-md" : "p-1 hover:bg-emerald-500 duration-300 rounded-md"}>
        <div className="bg-gray-400 rounded-md p-2 sm:w-[12rem]">

            <div className={checked ? "flex justify-around" : "flex justify-center"}>
                { checked ? 
                <>
                { enter ? 
                <p className="text-xs text-gray-200">Remove</p>
                :
                <p className="text-xs text-gray-200">Added</p>
                }
                </>
                
                :
                <p className="text-xs text-gray-200"></p>
                }
                <h1 className="bg-gray-300 rounded-md px-2 py-1 text-lg font-normal">{props.gearDetails.gearItem.category}</h1>
            </div>

            <div className="rounded-md p-1 flex mb-2">
                <Image 
                src={props.image.img}
                alt="Gear Item"
                className="w-auto h-20 mx-auto rounded-md"
                />
            </div>

            <div className="flex justify-center mb-2 bg-gray-300 rounded-md p-1 text-sm font-light">
                <div className="">
                    <p>Type: {props.gearDetails.gearItem.type}</p>
                    <p>Brand: {props.gearDetails.gearItem.brand}</p>
                    { props.gearDetails.gearItem.category === "Back Pack" || props.gearDetails.gearItem.category === "Dry Bag" ?<p>Capacity: {props.gearDetails.gearItem.storage}</p> : <></>}
                    { props.gearDetails.gearItem.category === "Tent" ?<p>{props.gearDetails.gearItem.size}-Person Tent</p> : <></>}
                    {props.gearDetails.gearItem.category === "Sleep Gear" && <p>{props.gearDetails.gearItem.type === "Sleeping Bag" ? "Rating: " : "Pad: "} {props.gearDetails.gearItem.rating}</p>}
                    <p>Lendable: {props.gearDetails.lendable ? "Yes" : "No"}</p>
                </div>
            </div>
        </div>
        </div>
    )
}

export default GearItemCard