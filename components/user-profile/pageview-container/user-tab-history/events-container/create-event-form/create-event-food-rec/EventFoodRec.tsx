
const EventFoodRec = () => {

    return (
        <>
        <div className="bg-gray-400 p-2 rounded-md flex flex-col gap-2">
            <div className='bg-gray-300 p-2 rounded-md'>
                <h1 className='text-2xl'>Food Recommendation List</h1>
                <h1 className='text-sm'>How Many Meals per Group or Individuals</h1>
            </div>

            <div className="bg-gray-300 p-2 rounded-md flex flex-col gap-2">
                <p>4 Days, 5 Nights</p>
                <p>Meal quantity based on start and end times</p>
                <div className="bg-gray-200 p-2 rounded-md grid grid-cols-4"> 
                    <div className="bg-gray-300 p-1 rounded-md flex flex-col gap-1">
                        <p>Day 1</p>
                        <p>Bfast: N/A</p>
                        <p>Lunch: Group meal</p>
                        <p>Dinner: Per Person</p>
                        <p>Snacks: Per Person</p>
                    </div>
                </div>
            </div>
            <div className="bg-gray-300 p-2 rounded-md">
                <p>Select next when all looks good.</p>
            </div>
        </div>
        </>
    )
}

export default EventFoodRec