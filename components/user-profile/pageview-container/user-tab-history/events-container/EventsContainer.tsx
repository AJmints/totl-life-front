

const EventsContainer = () => {

    return (
        <div>
            <div className="p-2 bg-gray-400 rounded-md w-[30%] mb-2">
                <p className=" font-medium text-4xl">Events Page</p>
                <p>Not working in mobile view yet</p>
            </div>

            <div className="p-4 bg-gray-400 rounded-md text-gray-900">

                <div className="p-4 bg-gray-300 rounded-md gap-2 flex">
                    
                    <div className="p-4 bg-gray-400 rounded-md w-[15%]"> 
                        {/* This is going to be it's own component so it can move on phone view under panel #3 */}
                        <div className="bg-gray-300 rounded-md h-[50%] mb-1 p-4">
                            1. Friends List
                        </div>
                        <div className="bg-gray-300 rounded-md h-[50%] mt-1 p-4">
                             2. Recomendation list of items to bring from Event host
                        </div>
                         
                    </div>

                    <div className="p-4 bg-gray-400 rounded-md w-full">

                        <div className="p-4 bg-gray-300 h-36 rounded-md">
                            3. event name / camp ground details / public or private / date and times / tiny map view with link to location on google maps
                        </div>

                        <div className="p-4 bg-gray-300 flex gap-2 rounded-md mt-2">
                            <div className="p-4 bg-gray-200 rounded-md w-full">
                                <div className="bg-gray-300 rounded-md p-4">
                                    4. Event Pack filter bar
                                </div>
                                <div className="mt-2 bg-gray-300 rounded-md p-4 h-96">
                                    5. User Pack Contents / Map of all user items and the quantities / Container to display contents of specific user from friends list / select item to view item details in Absolute panel that pops up in this container
                                </div>
                            </div>

                            <div className="bg-gray-200 rounded-md w-[30%] p-4">
                                <div className="bg-gray-300 rounded-md h-[40%] mb-1 p-4">
                                    <p>6. (This might get deleted) </p><br/>
                                    <p>Image with type of trip (Float, BackPack, Car) / (Current Season) / Other quick details</p>
                                </div>
                                <div className="bg-gray-300 rounded-md h-[60%] mt-1 p-4">
                                    7. Group Food arrangements
                                </div>
                                
                            </div>
                            
                        </div>
                        
                    </div>

                </div>

                <div className="p-4 bg-gray-300 rounded-md mt-2">
                    8. Coments
                </div>

            </div>
        </div>
    )
}

export default EventsContainer