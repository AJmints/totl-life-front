/* UserContext is going to need to have an array with all friendIDs to compare to current profile to display either AddFriend, CancelRequest, or RemoveFriend */

const AddTurtleButton = (props: any) => { // (userID, friendID)

    const addFriend = () => {

        /* Create Time, User, Requested, Status <- What the friend request object has 
        status = added, denied, pending, canceled */

        console.log("Create Time, User, Requested, Status <- What the friend request object has ")
        
    }

    const cancelRequest = () => {



    }

    return (
        <>
            <button onClick={() => addFriend()} className="bg-gray-600 p-2 rounded-md shadow-md shadow-gray-800/40">Add Turtle</button>
        </>
    )
}

export default AddTurtleButton