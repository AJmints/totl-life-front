import { usePathname } from "next/navigation"
import AcceptDeclineButton from "../../../user-detail-header/buttons/AcceptDeclineButton"
import Image from "next/image"
import userIcon from "@/public/icons/profile-pic.png"
import { useUserContext } from "@/app/context/UserContextProvider"
import { useState } from "react"


const FriendRequestContainer = (props: any) => {

    //props.setTurtleRequestList

    const [statusDisplay, setStatusDisplay] = useState<string>("")
    const pathname = usePathname()

    const friendName = pathname?.split("/user/").pop()
    const {userName} = useUserContext();


    const requestList = props.turtleRequestList.map((item: any) => {

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
                    <AcceptDeclineButton friendName={item.requester} userName={userName} setStatusDisplay={setStatusDisplay}/>
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
                <p>Build container for list of friend request</p>
                
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