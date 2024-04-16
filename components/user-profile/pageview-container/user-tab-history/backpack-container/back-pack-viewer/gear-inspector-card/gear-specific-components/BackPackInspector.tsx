const BackPackInspector = (props : any) => {

    return (
        <>
        <div>
            <p>Size: {props.gearItem.size}</p>
            <p>Pack Storage: {props.gearItem.storage}</p>
            <p>Reservoir Compatible: {props.gearItem.extraInfo === "false" ? "No" : "Yes"}</p>
            {props.gearItem.weight > 0 ? <p>Empty Pack Weight: {props.gearItem.weight} lbs</p>: <></> }
        </div>
        </>
    )
}

export default BackPackInspector