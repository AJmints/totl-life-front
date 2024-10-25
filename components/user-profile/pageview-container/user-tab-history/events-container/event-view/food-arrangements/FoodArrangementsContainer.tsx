
const FoodArrangementsContainer = () => {

    const t = (<div className="bg-gray-300 p-2 rounded-md text-xs">
        <p>Type: Bfast</p>
        <p>Meal: Eggs</p>
        <p>Feeds: Group (4-5)</p>
        <p>Chef: User 3</p>
        <p>Day: 2-3</p>
    </div>)
    const arr = [t,t,t,t,t,t,t,t,t,t,t,t,t,t,t]

    const loop = arr.map((item) => {
        return item
    })

    return (
        <div className="p-1 w-full bg-gray-400 h-[26rem] space-y-1 rounded-md">
            <div className="h-[28%] flex flex-col gap-1">
            <h1 className="font-semibold text-base bg-gray-200 p-2 rounded-md">Food Arrangements</h1>
            <div className="flex justify-around bg-gray-300 px-1 rounded-md items-center">
                <h1 className="font-semibold text-sm text-center">Filter</h1>
                <button className="bg-gray-200 px-2 my-1 rounded-md">hide</button>
            </div>
                
                <div className="bg-gray-300 rounded-md p-1 flex justify-between lg:justify-around text-xs border-b-2 border-gray-500">
                    <button className="bg-gray-200 rounded-md p-1">Bfast</button>
                    <button className="bg-gray-200 rounded-md p-1">Lunch</button>
                    <button className="bg-gray-200 rounded-md p-1">Dinner</button>
                    <button className="bg-gray-200 rounded-md p-1">Snaxs</button>
                </div>
            </div>
            <div className="h-[62%] flex flex-col">
                
                <div className=" p-1 flex flex-col gap-2 overflow-y-scroll scroll-track scroll-w scroll-handle">
                    {loop}
                </div>

            </div>
            <div className="h-[10%] flex items-center">
                <button className="bg-gray-300 px-1 rounded-md">Add Meal</button>
            </div>
        </div>
    )
}

export default FoodArrangementsContainer