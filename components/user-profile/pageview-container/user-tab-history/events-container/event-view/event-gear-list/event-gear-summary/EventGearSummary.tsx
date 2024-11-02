import FriendListContainer from "../../friend-list/FriendListContainer"


const EventGearSummary = () => {

    return (
        <div className="flex flex-col gap-2">
            <div>
                <p>QuickView:</p>
                <p>Total Missing Gear: x10</p>
            </div>
            <div className="p-2 bg-gray-200 rounded-md">
                <FriendListContainer />
            </div>
            <div className="p-1 bg-gray-200 rounded-md">
                <p>Row of list of users with green or red background depending on their pack items vs recommended</p>
                
                <p>List of items from specific user selected above</p>
                <p>button letting your friend know you can lend them an item from your pack</p>
            </div>
            
        </div>
    )
}

export default EventGearSummary