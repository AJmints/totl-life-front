import Link from "next/link"
import Image from "next/image"
import LogSelect from "../header-parts/LogSelect"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { swipeEvent } from "@/lib/constants/swipeInputs"


const CollapsedMenu = (props: any) => {

    const pathname = usePathname()

    useEffect(() => {
        if(props.menuToggle) {
            props.setMenuToggle(false)
        }
        swipeEvent(props)

        return () => {

        }

    }, [pathname])

    return (
        <>
        <div className={!props.menuToggle ? "hidden" : "sm:hidden fixed z-20 right-0 -bottom-0 h-screen"}>
                <div className="w-52 min-h-screen text-xl block bg-gray-300 rounded-md font-light">
                    <div className="items-center flex">
                        <button className="text-4xl ml-5 mt-3 font-light text-gray-700" onClick={() => props.setMenuToggle((prev: boolean) => !prev)}>X</button> 
                    </div>

                    {props.userLogged &&
                    <>
                    <div className="mt-[50%]">
                        <LogSelect
                        selectLog={props.selectLog}
                        setSelectLog={props.setSelectLog}
                        />
                    </div>
                    
                    <Link className="m-2 mt-7 flex hover:bg-yellow-500 px-2 rounded-md duration-500 hover:shadow-lg shadow-gray-600" href="/river">Forum Home</Link>
                    </>
                    }
                    <div className="mt-5">
                    {/* <Link className="m-2 mt-3 flex hover:bg-yellow-500 px-2 rounded-md duration-500 hover:shadow-lg shadow-gray-600" href="/river">River</Link> */}
                    <div className="flex items-center">
                    <Link className="m-2 flex hover:bg-yellow-500 px-2 rounded-md duration-500 hover:shadow-lg shadow-gray-600" href="/about">About</Link>
                    <Image src={props.arrow} alt="" className={props.aboutTogglePhone ? "cursor-pointer w-6 h-6 -rotate-90 hover:bg-gray-400 rounded-md p-1 duration-300" : "cursor-pointer w-6 h-6 rotate-90 hover:bg-gray-400 rounded-md p-1 duration-300"} onClick={() => props.setAboutTogglePhone((prev:boolean) => !prev)} />
                    </div>
                    {props.aboutTogglePhone ?
                    <div className="ml-2" >
                        <Link className="m-2 mt-3 flex hover:bg-yellow-500 px-2 rounded-md duration-500 hover:shadow-lg shadow-gray-600" href="/about#Initiative">-Current Initiative</Link>      
                        <Link className="m-2 mt-3 flex hover:bg-yellow-500 px-2 rounded-md duration-500 hover:shadow-lg shadow-gray-600" href="/about#Lifestyle">-TOTL Lifestyle</Link>
                        <Link className="m-2 mt-3  flex hover:bg-yellow-500 px-2 rounded-md duration-500 hover:shadow-lg shadow-gray-600" href="/about#MeetUs">-Meet the Team</Link>

                    </div>
                    :
                    ""
                    }

                    </div>
                </div>
            </div>
        </>
    )
}

export default CollapsedMenu