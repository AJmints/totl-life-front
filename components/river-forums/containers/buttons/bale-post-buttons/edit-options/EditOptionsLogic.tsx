type EditOptionsLogicChildren = {
    baleId: number, 
    redirect: boolean,
    isActive: boolean,
}

type EditOptionsLogicProps = {
    optionReact: EditOptionsLogicChildren
}

const EditOptionsLogic = (props: EditOptionsLogicProps) => {

    /* NEEDS TO HANDLE BALES AND COMMENTS
    CURRENTLY HANDLES BALES, NEXT COMMENTS */

    return (
        <div className="absolute p-1 bg-gradient-to-b from-gray-500 to-gray-400 rounded-md space-y-2 mb-32 sm:-mb-44 -ml-20 sm:ml-0">
            <div className="p-2 bg-gray-300 rounded-md cursor-pointer hover:bg-emerald-500 duration-200">
                <p>Edit (If user)</p>
            </div>
            <div className="p-2 bg-gray-300 rounded-md cursor-pointer hover:bg-emerald-500 duration-200">
                <p>Report (If viewer)</p>
            </div>
            <div className="p-2 bg-gray-300 rounded-md cursor-pointer hover:bg-emerald-500 duration-200" onClick={() => console.log(props.optionReact)}>
                <p>Delete (If user)</p>
            </div>
        </div>
    )
}

export default EditOptionsLogic