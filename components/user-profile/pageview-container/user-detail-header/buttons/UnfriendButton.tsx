import { useUserContext } from "@/app/context/UserContextProvider"
import { token } from "@/lib/constants/getToken"
import { URL } from "@/lib/globalConstants"

const UnfriendButton = (props:any) => {

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

        if (props.callComponent === "friendPage") {
            props.setStatusDisplay(response.requestStatus)
            return
        } else if (props.callComponent === "userPage") {
            try {
                console.log(response.requester)
                console.log(userName)
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

    return (
        <>
        
            <div className="flex gap-2 justify-around items-center">
                <div className="bg-emerald-500 p-2 rounded-md shadow-md shadow-gray-800/40">Frens</div>
                <button onClick={() => handleRequest("unfriend")} className="p-1 rounded-md bg-gray-500 shadow-md hover:bg-red-600 duration-200">
                    Unfren
                </button>

            </div>
        </>
    )
}

export default UnfriendButton