import AddTurtleButton from "./buttons/AddTurtleButton"


const InteractionContainer = () => {


    return (
        <div className="bg-gray-400 flex items-center rounded-md p-2 -mb-32 -ml-3">
            
            <div className="">

                <div className="">
                    <div className="mb-2 flex justify-center">
                        <AddTurtleButton />
                    </div>
                    <div>
                    <button onClick={() => console.log("launch follow turtle function")} className="bg-gray-600 p-2 rounded-md shadow-md shadow-gray-800/40">Follow Turtle</button>
                    </div>
                </div>

            </div>

            {/* <div className="flex group items-end">
                        <p className="bg-gray-500 p-2 rounded-full">DM</p> 
                        {/* Turn this into A component and reoganize */}
                        {/* <div className="hidden group-hover:flex absolute">
                            <p className="bg-gray-600 p-2 rounded-md -mb-10 -ml-10 shadow-md shadow-gray-800/40">Direct Messages need to be built</p>
                        </div>
                    </div> */}
            
            
        </div>
    )
}

export default InteractionContainer