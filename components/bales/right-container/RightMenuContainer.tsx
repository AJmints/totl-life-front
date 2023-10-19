import Image from "next/image"
import arrow from '../../../public/icons/Arrow.png'

export default function RightMenuContainer(props: any) {
     return (
        <div>
        <div className=" max-w-xs">
            {props.logDescription != "" && props.showLogDesc ?
            <div className="py-3 px-2 mx-2 sm:px-5 text-gray-200 font-light rounded-md items-center space-y-2 sm:space-y-0 justify-between bg-gray-700/90 shadow-lg shadow-gray-800/60">
                <h1>log/{props.logName}</h1>
                <p className="text-left text-sm font-extralight pt-5">{props.logDescription}</p>
                <Image 
                src={arrow}
                alt=""
                width={30}
                className=" bg-gray-500 mx-auto cursor-pointer p-1 rounded-md duration-300 -rotate-90"
                onClick={() => props.setShowLogDesc((prev: boolean) => !prev)} />
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
                <Image 
                src={arrow}
                alt=""
                width={30}
                className=" bg-gray-500 mx-auto cursor-pointer duration-300 p-1 rounded-md rotate-90"
                onClick={() => props.setShowLogDesc((prev: boolean) => !prev)} />
                }
                </div>
            </div>
            }

            <div className="w-80 bg-gray-400 over h-4">

            </div>
        </div>
        </div>
     )
}