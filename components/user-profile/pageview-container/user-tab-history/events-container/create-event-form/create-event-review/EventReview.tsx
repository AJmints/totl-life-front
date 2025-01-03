'use client'

import { useUserContext } from "@/app/context/UserContextProvider" 

const EventReview = (props: any) => {

    const {userFriendList} = useUserContext()

    return (
        <div>
            <div onClick={() => {console.log(userFriendList) 
                console.log(props)}} className="bg-gray-600 rounded-md p-20">

            </div>
        </div>
    )
}

export default EventReview