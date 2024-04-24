const TentInspector = (props: any) => { 

    return (
        <>
            <p>{props.gearItem.size} Person Tent</p>
            <p>Rating: {props.gearItem.rating}</p>
            <p>RainFly: {props.gearItem.extraInfo}</p>
            {props.gearItem.length > 0 && props.gearItem.width > 0 ? <p>FootPrint Dimensions (Width x Length): {props.gearItem.width}in x {props.gearItem.length}in</p>: <></> }
            {props.gearItem.weight > 0 ? <p>Tent Weight: {props.gearItem.weight} lbs</p>: <></> }
        </>
    )
}

export default TentInspector