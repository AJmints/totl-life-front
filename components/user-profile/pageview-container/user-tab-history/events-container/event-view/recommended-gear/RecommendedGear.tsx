
const RecommendedGearContainer = () => {

    const fixed = 1
    const t = (<div className="bg-gray-300 p-1 flex justify-around rounded-md text-xs">
        <p>Name: BackPack</p>
        <p>Type: Pack</p>
    </div>)

    const arr = [t,t,t,t,t,t,t,t,t,t,t,t,t,t,t]

    const loop = arr.map((item) => {
        
        return item
    })

    return (
        
        <div className="p-1 w-full bg-gray-400 h-[26rem] space-y-1 rounded-md">
            <div className="h-[40%] flex flex-col gap-1">
            <h1 className="font-semibold text-base bg-gray-200 p-2 rounded-md">Recommended Gear</h1>
            <div className="flex justify-around bg-gray-300 px-1 rounded-md items-center">
                <h1 className="font-semibold text-sm text-center">Filter</h1>
                <button className="bg-gray-200 px-2 my-1 rounded-md">hide</button>
            </div>
                <div className="bg-gray-300 rounded-md p-1 grid grid-cols-4 gap-2 justify-between text-xs border-b-2 border-gray-500">
                    <button className="bg-gray-200 rounded-md py-2 p-1">D</button> {/* Pack */}
                    <button className="bg-gray-200 rounded-md p-1">D</button> {/* Tent */}
                    <button className="bg-gray-200 rounded-md p-1">D</button> {/* Sleep */}
                    <button className="bg-gray-200 rounded-md p-1">D</button> {/* Kitchen */}
                    <button className="bg-gray-200 rounded-md py-2 p-1">D</button> {/* Tools */}
                    <button className="bg-gray-200 rounded-md p-1">D</button> {/* Lighting */}
                    <button className="bg-gray-200 rounded-md p-1">D</button> {/* Clean */}
                    <button className="bg-gray-200 rounded-md p-1">D</button> {/* Clothes */}
                </div>
            </div>
            <div className="h-[50%] flex flex-col">

                <div className=" p-1 flex flex-col gap-1 overflow-y-scroll scroll-track scroll-w scroll-handle">
                    {loop}
                </div>

            </div>
            <div className="h-[10%]">
                <button className="bg-gray-300 px-1 rounded-md">Add Gear</button>
            </div>
        </div>
    )
}

export default RecommendedGearContainer