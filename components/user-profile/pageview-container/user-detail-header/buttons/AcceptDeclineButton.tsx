
import { useUserContext } from "@/app/context/UserContextProvider"
import { token } from "@/lib/constants/getToken"
import { URL } from "@/lib/constants"

const AcceptDeclineButton = (props: any) => {

    const friendName = props.friendName
    const {userName} = useUserContext()

    // props = friend name + user name
    /* Drop these in as props to use so this component can be used as a button when viewing a profile and 
    having independant buttons as a list on the users friend request list. */

    const handleRequest = async(string : string) => {

        const data = {
            requester: userName,
            requested: friendName,
            status: string,
            lastActor: userName
        }

        const createPack = await fetch( URL + "/social/handle-friend-request-action", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "auth-token": "Bearer " + await token()
            },
            body: JSON.stringify(data)
        })
        const response = await createPack.json().catch((err) => {
            console.log(err)
        })
        // console.log(response)

        // Try Catch for Relation Container when viewing friends page, not for list on user. setStatusDisplay is only meant to work on relation container
        try {
            console.log(props.setStatusDisplay() === undefined)
            if (props.setStatusDisplay() === undefined) {
                // Include response handling to setStatusDisplay
            }

        }catch(error){
            // This is on the user page and does not need to include/update setStatusDisplay

            console.log(error)
            try {
                console.log("nest")
            } catch (error) {
                console.log("Double error")
            }
        }
        
    }

    return (
        <div className="bg-gray-500 p-1 text-center rounded-md">

            <p>Turtle Request:</p>

            <div className="flex gap-2">
                <button onClick={() => handleRequest("accept")} className="p-1 rounded-md bg-emerald-500 shadow-md hover:bg-emerald-600 duration-200">
                    Accept
                </button>
                <button onClick={() => handleRequest("decline")} className="p-1 rounded-md bg-red-500 shadow-md hover:bg-red-600 duration-200">
                    Decline
                </button>
            </div>

        </div>
    )
}

export default AcceptDeclineButton