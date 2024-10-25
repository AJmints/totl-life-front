
const FriendListContainer = () => {

    const t = (
        <div className="flex flex-col gap-1 bg-gray-400 rounded-md p-1">
            <div className="bg-gray-300 p-5 mx-auto text-center rounded-full ">
                <p className="">p</p>
            </div>
            <div className="bg-gray-300 w-32 p-1 rounded-md text-center">
                <p>UserWithNineChar</p>
            </div>
        </div>
    )
    const arr = [t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t]

    const loop = arr.map((item) => {
        return item
    })

    return (
        <div className="p-1 rounded-md text-xs mx-auto flex gap-2 container overflow-x-scroll scroll-track scroll-w scroll-handle">
            {loop}
        </div>
    )
}

export default FriendListContainer