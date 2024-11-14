import EventGearListContainer from "./event-gear-list/EventGearListContainer"
import FoodArrangementsContainer from "./food-arrangements/FoodArrangementsContainer"
import FriendListContainer from "./friend-list/FriendListContainer"
import RecommendedGearContainer from "./recommended-gear/RecommendedGear"

const EventView = () => {

    return (
        <div>
            {/* What needs to be stored at the top of the component tree and what needs it's own calls? */}
            {/* What other components are gonna be needed? Events Create form, Events edit form, Events Invite, View Upcoming Events, View Past Events  */}

            <div className="p-2 bg-gray-400 rounded-md text-gray-900">

                <div className="p-2 bg-gray-300 rounded-md gap-2 flex">                    

                    <div className="bg-gray-300 rounded-md w-full space-y-2">

                        <div className="bg-gray-300 h-auto space-y-2 lg:space-y-0 lg:flex justify-between gap-2">
                            <div className="bg-gray-400 rounded-md p-2 space-y-2 lg:w-[50%] w-auto">
                                <div className=" bg-gray-300 items-center rounded-md p-2 space-y-2">
                                    <h1 className="font-light text-3xl">event name</h1>
                                    <p className="font-extralight text-xs">created by</p>
                                </div>
                                
                                <div className="bg-gray-300 rounded-md p-2">
                                    <p>camp ground/park/trail/river name</p>
                                    <p>public or private</p>
                                    <p>date time</p>
                                </div>
                            </div>

                            <div className="flex lg:w-[50%] gap-2 w-auto">
                                <div className="bg-gray-400 rounded-md p-2 w-[30%] space-y-2">
                                    <div className="bg-gray-300 p-4 rounded-md py-10">
                                        <p>Map</p>
                                    </div>
                                    <p>Map with link on Google Maps</p>
                                </div>

                                <div className="bg-gray-400 rounded-md p-2 w-[70%] flex gap-1">
                                    <div className="bg-gray-300 text-xs rounded-md p-2 h-20 w-[30%]">
                                    Image with type of trip (Float, BackPack, Car, Bike, Climb)
                                    </div>
                                    
                                    <div className="bg-gray-300 rounded-md p-2 w-[70%]">
                                        <p> / (Current Season **box within trip type) / User Notes about event</p>
                                        <br/>
                                        <p>5 Days, 4 Nights</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        
                        <div className="p-1 bg-gray-400 flex flex-col items-center rounded-md"> 
                            
                            <div className="bg-gray-300 w-full rounded-md mb-1 p-2">
                                <h1 className="font-medium text-base text-center bg-gray-200 p-1 rounded-md mb-1">
                                    Camp Frens
                                </h1>
                                <FriendListContainer />
                            </div>
                        
                        </div>

                        <div className=" bg-gray-300 space-y-2 lg:space-y-0 lg:flex lg:gap-2">
                            
                            <div className="lg:w-[75%] xl:w-[70%]">
                                <EventGearListContainer />
                            </div>

                            <div className="bg-gray-200 rounded-md flex md:flex-row lg:flex-col flex-col w-full h-[100%] gap-1 lg:w-[25%] xl:w-[30%] p-2">
                                
                                <div className="rounded-md w-full md:w-[50%] lg:w-full h-[50%] flex flex-col">
                                    
                                    <FoodArrangementsContainer />
                                    
                                </div>
                                
                                <div className="rounded-md w-full md:w-[50%] lg:w-full h-[50%] flex flex-col">
                                    
                                    <RecommendedGearContainer />
                                    
                                </div>
                            </div>
                            
                        </div>
                        
                    </div>

                </div>

                <div className="p-4 bg-gray-300 rounded-md mt-2">
                    7. Event Description detail from user 1000 char limit
                    8. Coments
                </div>

            </div>
        </div>
    )
}

export default EventView