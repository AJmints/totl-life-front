import Image from "next/image"
import arrow from '../../../public/icons/Arrow.png'
import LogFollowList from "./LogFollowList"

export default function RightMenuContainer(props: any) {


    const followLog = async(log: string) => {
        console.log(log)
    }

     return (
        <div>
        <div className=" max-w-xs">
            {props.logDescription != "" && props.showLogDesc ?
            <div className="py-3 px-2 mx-2 sm:px-5 text-gray-200 font-light rounded-md items-center space-y-2 sm:space-y-0 justify-between bg-gray-700/90 shadow-lg shadow-gray-800/60">
                <h1>log/{props.logName}</h1>
                <div className="pt-2">
                <button 
                        className="bg-gray-400 hover:bg-emerald-500 duration-300 p-1 rounded-md text-gray-800"
                        onClick={() => followLog(props.logName)}>Follow</button>
                </div>
                <p className="text-left text-sm font-extralight pt-5">{props.logDescription}</p>
                
                <div className="flex items-center justify-center">
                <Image 
                src={arrow}
                alt=""
                width={30}
                className=" bg-gray-500 mr-2 cursor-pointer p-1 rounded-md duration-300 -rotate-90"
                onClick={() => props.setShowLogDesc((prev: boolean) => !prev)} />
                <p className="text-sm">Hide</p>
                </div>
            </div>
            :
            <div className=" px-2 text-gray-200 font-light flex rounded-md items-center space-y-2 sm:space-y-0 justify-center ">
                <div className="bg-gray-700/90 shadow-lg shadow-gray-800/60 p-3 px-10 rounded-md">
                {props.logName === "" &&
                <h1 className="text-sm font-light">You are currently chilling on your home log.</h1>
                }
                    <div className="flex justify-center items-center">
                    {props.logName !== "" && <h1 className="">log/</h1>}
                        <h1>{props.logName}</h1>
                    </div>
                {props.logName !== "" && 
                <div className="flex justify-center">
                <Image 
                src={arrow}
                alt=""
                width={30}
                className=" bg-gray-500 cursor-pointer mr-2 duration-300 p-1 rounded-md rotate-90"
                onClick={() => props.setShowLogDesc((prev: boolean) => !prev)} />
                </div>
                }
                </div>
            </div>
            }

            <div className="w-80 over h-1 mt-4"></div>

            <div className="flex items-baseline space-x-2 justify-center">
                <div className="bg-gray-200">
                <LogFollowList />
                </div>
            </div>            
            
        </div>
        </div>
     )
}