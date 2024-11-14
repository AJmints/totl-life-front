
const FriendListContainer = (props: any) => {

    const source = props.source
    const total = props.gearTotal



    const t = (
        <div className={"flex flex-col gap-1 rounded-md p-1 " + ( source !== "gearSummary" ? " bg-gray-400 " : (true ? " border-emerald-500 border-2 bg-gray-500" : " border-red-800 border-2 bg-gray-500"))}>
            <div className="flex items-center">
                <div className="text-gray-100">
                    {source === "gearSummary" ? total + "/10" : ""}
                </div>    
                <div className="bg-gray-300 p-5 mx-auto text-center rounded-full ">
                    <p className=""></p>
                </div>
            </div>
            <div className="bg-gray-300 w-32 p-1 rounded-md text-center">
                <p>UserWithNineChar</p>
            </div>
        </div>
    )
    const arr = [t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t]

    let num = arr.length
    const loop = arr.map((item) => {
        num--
        return (
            <div key={num}>
                {item}
            </div>   
        )
    })

    return (
        <div className="p-1 rounded-md text-xs mx-auto flex gap-2 overflow-x-scroll scroll-track scroll-w scroll-handle">
            {loop}
        </div>
    )
}

export default FriendListContainer