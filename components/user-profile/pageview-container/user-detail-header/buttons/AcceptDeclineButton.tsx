
import { useUserContext } from "@/app/context/UserContextProvider"
import { token } from "@/lib/constants/getToken"
import { URL } from "@/lib/globalConstants"

const AcceptDeclineButton = (props: any) => {

    const friendName = props.friendName
    const {userName} = useUserContext()

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

        if (response.response === "empty") {
            console.log("failed successfully")
            props.setStatusDisplay(friendName)
            return
        } else {
            if (props.callComponent === "friendPage") {
                props.setStatusDisplay(response.requestStatus)
                return
            } else if (props.callComponent === "userPage") {
                try {
                    if (response.requester === userName) {
                        props.setStatusDisplay(response.requested)
                    } else if (response.requested === userName) {
                        props.setStatusDisplay(response.requester)
                    }
                } catch(error) {
                    console.log(error)
                }
            }
        }
        
        
        
    }

    return (
        <div className="bg-gray-500 p-1 text-center rounded-md">

            <p>Turtle Request:</p>

            <div className="flex gap-2 justify-around">
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