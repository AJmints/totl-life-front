const DryBagInspector = (props: any) => {

    return (
        <>
        <div >
            <p>Pack Storage: {props.gearItem.storage}</p>
            <p>Reservoir Compatible: {props.gearItem.extraInfo === "false" ? "No" : "Yes"}</p>
            <p>Has BackPack Straps? {props.gearItem.extraInfo === "BackPack Straps" ? "Yes" : "No"}</p>
        </div>
        </>
    )
}

export default DryBagInspector