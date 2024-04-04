const GearItemCard = (props : any) => {

    return (
        <div className="bg-gray-400 rounded-md p-2 w-[10rem] h-[13rem]">
            <h1 onClick={() => console.log(props.gearDetails)}>{props.gearDetails.id}</h1>
        </div>
    )
}

export default GearItemCard