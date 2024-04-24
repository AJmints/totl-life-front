import BackPackInspector from "./gear-specific-components/BackPackInspector"
import Image from "next/image"
import DryBagInspector from "./gear-specific-components/DryBagInspector"
import TentInspector from "./gear-specific-components/TentInspector"

const GearInspectorCard = (props: any) => {

    return (
        <>
        <div className="mt-3 p-2 bg-gray-400 rounded-md text-lg font-light space-y-2">

            {/* <div onClick={() => console.log(props.viewSpecificGear)}>
                <p>Click me to view item in console</p>
            </div> */} 

            <div>
                <button className="bg-gray-500 text-gray-100 mt-2 mb-4 p-1 rounded-md hover:bg-emerald-500 duration-300" onClick={() => props.setViewToggle(false)}>Go Back</button>
            </div>           

            <h1 className=" font-semibold text-gray-100 bg-gray-600/90 p-1 rounded-md">Gear Details:</h1>
            <div className="p-2 bg-gray-300 rounded-md text-lg">
                
                <p className="font-normal text-xl">Category: {props.viewSpecificGear.gearItem.gearItem.category}</p>
                <div className="p-2 my-3">
                    <Image
                    src={props.viewSpecificGear.image.img.src}
                    alt=""
                    width={100}
                    height={100}
                    className="w-[10rem] h-auto rounded-md"
                    />
                </div>
                <p>Type: {props.viewSpecificGear.gearItem.gearItem.type}</p>
                <p>Brand: {props.viewSpecificGear.gearItem.gearItem.brand}</p>

                {props.viewSpecificGear.gearItem.gearItem.category === "Back Pack" && <BackPackInspector gearItem={props.viewSpecificGear.gearItem.gearItem}/>}
                {props.viewSpecificGear.gearItem.gearItem.category === "Dry Bag" && <DryBagInspector gearItem={props.viewSpecificGear.gearItem.gearItem}/>}
                {props.viewSpecificGear.gearItem.gearItem.category === "Tent" && <TentInspector gearItem={props.viewSpecificGear.gearItem.gearItem}/>}


                {/* This will be a bunch of optoinal forms to view all specific details in the correct context
                Ex: props.viewSpecificGear.gearItem.category === "Back Pack" && <BackPackInspectorCard /> */}
            </div>

            <h1 className=" font-semibold text-gray-100 bg-gray-600/90 p-1 rounded-md">User Info:</h1>
            <div className="p-2 bg-gray-300 rounded-md text-lg">
                <p>Date Added: {props.viewSpecificGear.gearItem.dateCreated}</p>
                <p>Lendable: {props.viewSpecificGear.gearItem.lendable ? "Yes" : "No"}</p>
                <p>Item Condition: {props.viewSpecificGear.gearItem.itemCondition}</p>
                <p>Owner has {props.viewSpecificGear.gearItem.quantity} of this item.</p>
                <p>{props.viewSpecificGear.gearItem.additionalDetails !== "" ? "User Notes: " + props.viewSpecificGear.gearItem.additionalDetails : <></>}</p>
            </div>
        </div>
        </>
    )
}

export default GearInspectorCard