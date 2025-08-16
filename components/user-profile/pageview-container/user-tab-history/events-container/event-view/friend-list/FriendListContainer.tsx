'use client'

import Image from "next/image"
import defaultPFP from "@/public/icons/profile-pic.png"

const FriendListContainer = (props: any) => {

    const source = props.source
    const total = props.gearTotal
    const list = props.list

    const loop = list?.map((item: any) => {
        return (
            <div key={item.id}>
                <div className={"flex flex-col gap-1 rounded-md p-1 " + ( source !== "gearSummary" ? " bg-gray-400 " : (true ? " border-emerald-500 border-2 bg-gray-500" : " border-red-800 border-2 bg-gray-500"))}>
                    <div className="flex items-center">
                        <div className="text-gray-100">
                            {source === "gearSummary" ? total + "/10" : ""}
                        </div>    
                        <div className="bg-emerald-300 rounded-full p-1 mx-auto text-center">
                            {item.userPFP !== '' ? 
                                <Image
                                src={'data:image/jpeg;base64,' + item.userPFP}
                                alt=""
                                width={30}
                                height={30}
                                className="w-20 h-20 rounded-full"
                                />
                                :
                                <Image
                                src={defaultPFP.src}
                                alt=""
                                width={30}
                                height={30}
                                className="w-20 h-20 rounded-full"
                                />
                            }
                        </div>
                    </div>
                    <div className="bg-gray-300 w-32 p-1 rounded-md text-center">
                        <p>{item.userName}</p>
                    </div>
                </div>
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