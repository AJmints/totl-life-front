
const MealQuickView = (props: any) => {

    return (
        <div className="p-1 w-full bg-gray-400 h-[26rem] flex flex-col gap-1 rounded-md">
                <div className={"flex flex-col gap-1"}>
                    <h1 className="font-semibold text-base bg-gray-200 p-2 rounded-md">Food Arrangements</h1>
                </div>
                <div className="flex flex-col my-auto gap-4 text-base font-medium bg-gray-300 p-2 rounded-md h-[100%] items-center">
                    <h1>Meals per group or per person</h1>
                    <p>Bfast: 1 meal of 2 days</p>
                    <p>Lunch: 2 meal of 2 days</p>
                    <p>Dinner: 0 meal of 2 days</p>
                    <p>Snacks: 5 snacks contributed</p>
                    <div>
                        <button onClick={() => props.setToggleParent((prev: any) => !prev)} className="p-1 px-2 rounded-md bg-gray-500">Menu Details</button>
                    </div>
                    
                </div>
            
        </div>
    )
}

export default MealQuickView