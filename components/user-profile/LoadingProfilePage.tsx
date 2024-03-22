import Image from "next/image"
import imgDefault from "../../public/icons/profile-pic.png"

const LoadingProfilePage = () => {

    return (
        <>
        <div className="bg-gray-700/80 p-10 font-extralight text-white flex justify-center md:justify-between">

        <div className="hidden sm:block">
            <p>box</p>
        </div>

        <div>

        <div>
            <div className="flex justify-between">
                <div className="bg-gray-400/80 p-3 rounded-md ">
                    <div className="flex justify-center">
                        <Image
                        src={imgDefault}
                        alt=""
                        height={100}
                        width={100}
                        className="h-20 w-20 rounded-full" 
                        />
                    </div>
                    <div>
                        <p>t/Loading</p>
                        <p>Verified: Loading</p>
                    </div>
                </div>

                <div className="flex items-end">
                    <p className="bg-gray-500 p-2 rounded-full">DM</p>
                </div>
            </div>
        </div>

        <div className="mt-3">
                <div className="p-2 px-5 bg-gray-500 rounded-md">
                    <div className="py-4 px-40 sm:px-64 bg-gray-300 rounded-md animate-pulse"></div>
                </div>
                <div className="mt-5 p-2 px-5 bg-gray-500 rounded-md space-y-2">
                    <div className="py-14 px-40 sm:px-64 bg-gray-300 rounded-md animate-pulse"></div>
                    <div className="py-14 px-40 sm:px-64 bg-gray-300 rounded-md animate-pulse"></div>
                    <div className="py-14 px-40 sm:px-64 bg-gray-300 rounded-md animate-pulse"></div>
                    <div className="py-14 px-40 sm:px-64 bg-gray-300 rounded-md animate-pulse"></div>
                </div>
            </div>
        </div>
        
        <div className="hidden sm:block">
            <p>Box</p>
        </div>

        </div>

        </>
    )
}

export default LoadingProfilePage