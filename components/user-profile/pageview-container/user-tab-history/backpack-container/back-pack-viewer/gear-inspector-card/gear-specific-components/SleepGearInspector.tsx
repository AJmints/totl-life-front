const SleepGearInspector = (props: any) => {

    return (
        <>
            <p>{props.gearItem.type === "Sleeping Bag" ? "Sleeping Bag Rating: " : "Sleep Pad Type: "} {props.gearItem.rating}</p>
            <p>{props.gearItem.extraInfo != "null" && props.gearItem.extraInfo}</p>
            {props.gearItem.weight > 0 ? <p>Tent Weight: {props.gearItem.weight} lbs</p>: <></> }

        </>
    )
}

export default SleepGearInspector