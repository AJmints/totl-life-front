
import { useUserContext } from "@/app/context/UserContextProvider"

const AcceptDeclineButton = (props: any) => {

    const friendName = props.friendName
    const {userName} = useUserContext()

    // props = friend name + user name
    /* Drop these in as props to use so this component can be used as a button when viewing a profile and 
    having independant buttons as a list on the users friend request list. */

    const acceptRequest = () => {
        console.log("Accept")
    }

    const declineRequest = () => {
        console.log("Decline")
    }

    return (
        <div className="bg-gray-500 p-1 text-center rounded-md">

            <p>Turtle Request:</p>

            <div className="flex gap-2">
                <button onClick={() => acceptRequest()} className="p-1 rounded-md bg-emerald-500 shadow-md hover:bg-emerald-600 duration-200">
                    Accept
                </button>
                <button onClick={() => declineRequest()} className="p-1 rounded-md bg-red-500 shadow-md hover:bg-red-600 duration-200">
                    Decline
                </button>
            </div>

        </div>
    )
}

export default AcceptDeclineButton