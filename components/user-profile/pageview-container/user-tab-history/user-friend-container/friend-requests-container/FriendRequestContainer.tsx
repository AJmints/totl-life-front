import AcceptDeclineButton from "../../../user-detail-header/buttons/AcceptDeclineButton"
import Image from "next/image"
import userIcon from "@/public/icons/profile-pic.png"
import { useUserContext } from "@/app/context/UserContextProvider"
import { useState, useEffect } from "react"


const FriendRequestContainer = (props: any) => {

    const [statusDisplay, setStatusDisplay] = useState<string>("")

    const { userName, userTurtleRequestList, setUserFriendList, setUserTurtleRequestList } = useUserContext()


    useEffect(() => {

        if (statusDisplay !== "") {
            const removeRequestFromList = userTurtleRequestList.filter(request => request.requester !== statusDisplay)
            const addFriend = userTurtleRequestList.filter(request => request.requester === statusDisplay)
            setUserTurtleRequestList(removeRequestFromList)
            const user = {
                pfp: addFriend[0].userPFP !== null ? addFriend[0].userPFP : null,
                userName: statusDisplay
            }
            setUserFriendList((prev: any) => [...prev, user])
        }

    }, [statusDisplay])


    const requestList = userTurtleRequestList.map((item: any) => {

        return (
            <div key={item.requester} className="bg-gray-400 p-2 rounded-md xl:w-56 h-auto">
                <p className=" font-semibold text-xl">Name:</p>
                <p className=" font-semibold text-xl">{item.requester}</p>
                <div className="flex my-2 h-36 items-center justify-center">
                    <div className="bg-gray-300 p-2 hover:p-0 hover:m-2 duration-200 rounded-full">
                    { item.userPFP === null ?
                        <div>
                        <Image
                            src={userIcon}
                            alt=''
                            width={90}
                            height={90}
                            className='w-32 rounded-full'
                            onClick={() => console.log(item.userPFP)}
                        /> 
                        </div>

                        :
                        <Image
                            src={'data:image/jpeg;base64,' + item.userPFP.image}
                            alt=""
                            width={30}
                            height={30}
                            className="w-32 rounded-full"
                            onClick={() => console.log(item.userPFP)}
                        />
                    }
                    </div>
                </div>
                <div className="text-gray-200">
                    <AcceptDeclineButton friendName={item.requester} userName={userName} setStatusDisplay={setStatusDisplay} callComponent={"userPage"}/>
                </div>
            
            </div>
        )
    })

    const handleRemove = (userName: string) => {

    }

    return (

        <>
            <div className="py-4 px-4 sm:px-10 text-gray-700 bg-gray-300 rounded-md">
                <p className=" text-xl">User Friend Request</p>
                <div className="flex justify-between mx-2 items-center">
                <p>All friend requests</p>
                
                <p className="bg-gray-400 rounded-md p-2 mb-2">Search Container</p>
                </div>

                <div className="bg-gray-200 p-2 rounded-md grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-1 lg:gap-x-16 xl:gap-6 sm:gap-2">
                    
                    {requestList}
                </div>
            </div>
        </>
    )
}

export default FriendRequestContainer