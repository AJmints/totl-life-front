import FoodArrangementsContainer from "./food-arrangements/FoodArrangementsContainer"
import FriendListContainer from "./friend-list/FriendListContainer"
import RecommendedGearContainer from "./recommended-gear/RecommendedGear"
import RecommendedGear from "./recommended-gear/RecommendedGear"

const EventView = () => {

    return (
        <div>
            <div className="p-2 bg-gray-400 rounded-md w-[30%] mb-2">
                <p className=" font-medium text-4xl">Events Page</p>
                <p>What needs to be stored at the top of the component tree and what needs its own calls?</p>
            </div>
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
                            <div className="p-2 bg-gray-200 rounded-md w-full">

                                <div>
                                    <h1 className="text-center font-medium text-lg">Event Gear List</h1>
                                </div>

                                <div className="bg-gray-300 rounded-md p-4">
                                    Event Pack filter type dropdown / Quick Category Pick: Pack, Kitchen, Shelter, Sleep / List of usernames to view their pack contents
                                </div>
                                <div className="mt-2 p-1 bg-gray-300 rounded-md gap-2 grid grid-cols-1 lg:grid-cols-2">
                                    
                                    <div className="bg-gray-400 p-1 rounded-md">
                                        <div className="bg-gray-300 rounded-md p-1 h-44 lg:h-full overflow-y-scroll scroll-track scroll-w scroll-handle">

                                            <p>Sort by pack or sort by gear type</p>

                                            <div className="bg-gray-400 p-1 rounded-md flex flex-col gap-2">
                                                <div className="bg-gray-300 p-1 rounded-md flex justify-between">
                                                    <div className="bg-gray-200 p-1 rounded-md w-[50%]">
                                                        <p>User: Name</p>
                                                        <p>Pack: Name</p>
                                                    </div>
                                                    <div className="bg-gray-200 p-1 rounded-md">
                                                        <p>Pack Image</p>
                                                    </div>
                                                </div>

                                                <div className="bg-gray-300 p-1 rounded-md">
                                                    <p>Missing : 3 from rec list</p>
                                                    <p>view contents</p>
                                                </div>
                                            </div>

                                            <div className="bg-gray-400 p-1 rounded-md mt-5 gap-1 flex justify-around">
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

                                        </div>
                                    </div>
                                    
                                    <div className="bg-gray-400 p-2 rounded-md space-y-2">
                                        <div className="bg-gray-300 py-28 w-full rounded-md">
                                            Detail Window:
                                            <br/>
                                            <p>Who is missing items from rec list? (Undecided still)</p>
                                            <br/>
                                            <p>details about selected item below</p>
                                        </div>
                                        <div className="bg-gray-300 p-2 py-28 w-full rounded-md">
                                            <p>Can be a list of all that gear type</p>
                                            <br/><br/>
                                            <p>or :: (  based on selection from left panel  )</p>
                                            <br/><br/>
                                            <p>Can be a list of all pack contents</p>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>

                            <div className="bg-gray-200 rounded-md flex md:flex-row lg:flex-col flex-col w-full h-[100%] gap-1 lg:w-[30%] p-2">
                                
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
                    8. Coments
                </div>

            </div>
        </div>
    )
}

export default EventView