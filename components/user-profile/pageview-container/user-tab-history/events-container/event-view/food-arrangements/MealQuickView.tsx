
const MealQuickView = (props: any) => {

    return (
        <div className="p-1 w-full bg-gray-400 h-[26rem] flex flex-col gap-1 rounded-md">
                <div className={"flex flex-col gap-1"}>
                    <h1 className="font-semibold text-base bg-gray-200 p-2 rounded-md">Shared Food Arrangements</h1>
                </div>
                <div className="flex flex-col h-[100%] gap-2">
                    <div className="flex my-auto gap-2 text-sm font-medium bg-gray-300 p-2 rounded-md h-[100%] items-center">
                        <div className="bg-gray-200 p-2 rounded-md flex flex-col gap-1 w-[50%] h-[100%]">
                            <p>Food Recs</p>
                            <p>5 Days</p>
                            <p>Bfast: x3</p>
                            <p>Lunch: x4</p>
                            <p>Dinner: x3</p>
                            <p>And Snacks</p>
                        </div>
                        <div className="bg-gray-200 p-2 text-center rounded-md flex flex-col gap-1 w-[50%] h-[100%]">
                            <div className="">
                                <h1 className="mb-2">Shared Meals</h1>
                                <p>Bfast:</p>
                                <p>0/0</p>
                                <p>Lunch:</p>
                                <p>0/0</p>
                                <p>Dinner:</p>
                                <p>0/0</p>
                                <p>Snacks:</p>
                                <p>0/0</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mx-auto">
                        <button onClick={() => props.setToggleParent((prev: any) => !prev)} className="p-1 px-2 rounded-md bg-gray-500">View Group Meals</button>
                    </div>
                </div>
            
        </div>
    )
}

export default MealQuickView