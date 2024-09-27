import { usePathname } from "next/navigation"
import AcceptDeclineButton from "../../../user-detail-header/buttons/AcceptDeclineButton"


const FriendRequestContainer = (props: any) => {

    const pathname = usePathname()

    const friendName = pathname?.split("/user/").pop()

    const requestList = [1,2,3,4,5,6,7].map((item: any) => {

        return (
            <div key={item} className="bg-gray-400 p-2 rounded-md xl:w-56 h-auto">
                
                <p>Name : {item}</p>
                <div className="flex my-2 items-center justify-center">
                    <div className="sm:px-20 sm:py-20 px-14 py-14  bg-gray-300 rounded-full">
                        <p></p>
                    </div>
                </div>
                <div className="text-gray-200">
                    <AcceptDeclineButton />
                </div>
            
            </div>
        )
    })

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