const ModifyGearItem = (props : any) => {

    return (
        <div className="bg-gray-400 rounded-md p-2 w-[10rem] h-[13rem]">
            <h1 onClick={() => console.log(props.gearDetails)}>{props.gearDetails.id}</h1>

            {/* Edit form insert, use GearItemCard.tsx to display card details, alternate by boolean */}

            <div className="flex justify-around">
                <div>
                    <button className="bg-emerald-500 p-2 rounded-md hover:bg-emerald-700 duration-300">Update</button>
                </div>
                <div>
                    <button className=" bg-emerald-800/70 p-2 rounded-md hover:bg-emerald-800 duration-300">Delete</button>
                </div>
            </div>
        </div>
    )
}

export default ModifyGearItem