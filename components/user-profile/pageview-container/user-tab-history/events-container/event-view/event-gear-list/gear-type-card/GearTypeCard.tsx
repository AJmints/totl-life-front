

const GearTypeCard = () => {

    return (
        <div className="bg-gray-400 p-1 rounded-md flex flex-col gap-2">
            <div className="bg-gray-400 p-1 rounded-md gap-1 flex justify-around">
                <div className="bg-gray-300 w-[30%] p-1 h-28 rounded-md">
                    Gear Image
                </div>

                <div className="bg-gray-300 p-1 w-[70%] rounded-md flex gap-5 justify-between">
                    <div className="w-[70%] bg-gray-200 p-2 rounded-md">
                        <p className="h-[50%] xl:text-xl bg-gray-400 rounded-md p-2 text-gray-50">Gear Type</p>
                        <p className="h-[50%] text-3xl mt-2">Tool</p>
                    </div>
                    <div className="flex flex-col w-[30%]">
                        <div className="h-[50%]">
                        </div>
                        <div className="h-[50%] bg-gray-200 rounded-md">
                            <p className="text-center mt-2 text-3xl">x12</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-300 p-1 rounded-md">
                <p>Missing : 3 from rec list</p>
                <p>view contents</p>
            </div>
        </div>
    )
}

export default GearTypeCard