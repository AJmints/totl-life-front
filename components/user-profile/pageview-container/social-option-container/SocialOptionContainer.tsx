

const InfoEditorContainer = () => {

    return (
        <div className="bg-gray-500 rounded-md">
            <div className="flex"> 
            <div className="flex space-x-2 bg-gray-400 rounded-b-none rounded-md p-2">
                <button className="bg-gray-500 hover:bg-emerald-500 duration-300 p-2 rounded-md">Events</button>
                <button className="bg-gray-500 hover:bg-emerald-500 duration-300 p-2 rounded-md">Gear Market</button>
                <button className="bg-gray-500 hover:bg-emerald-500 duration-300 p-2 rounded-md">Friends</button>
            </div>
            </div>
            <div className="">
                <div className="py-14 sm:px-56 bg-gray-300 rounded-md rounded-tl-none">
                    <p className="text-gray-700 text-center text-xl">Under Development</p>
                </div>
            </div>

        </div>
    )
}

export default InfoEditorContainer