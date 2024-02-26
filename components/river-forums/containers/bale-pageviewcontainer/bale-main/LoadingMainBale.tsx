import Image from "next/image"
import pfpDefault from '../../../../../public/icons/profile-pic.png'

const LoadingMainBale = () => {

    return (
        <>
            <div className='flex left-0'>
                <button className='bg-gray-400 p-3 rounded-md hover:bg-emerald-500 duration-300'>Back</button>
            </div>

            <div className="flex mb-2 justify-between items-center">
            <p className='text-left font-normal text-sm cursor-pointer my-2 bg-gray-400 p-2 rounded-md hover:bg-emerald-500 duration-200'>log/loading...</p>
            <div className="flex justify-center items-center">
                <Image
                    src={pfpDefault}
                    alt=""
                    width={30}
                    height={30}
                    className="mr-2 w-10 h-10 rounded-full cursor-pointer"
                />
            <div className="flex justify-center items-center text-sm font-light text-gray-300">
                <p>t/</p>
                <p className="cursor-pointer">loading...</p>
            </div>
            </div>
            </div>

            <div className="bg-gray-300 rounded-t-md flex justify-center py-6 px-2 sm:px-20 lg:px-20 lg:py-10">
                <h1 className="py-8 px-20 sm:py-8 sm:px-44 lg:p-10 lg:px-72 rounded-md bg-gray-500/60 animate-pulse"></h1>
            </div>
            
            <div className="bg-gray-400 rounded-b-md justify-center flex py-3">
                <h1 className="py-8 px-20 sm:py-8 sm:px-44 lg:p-10 lg:px-72 rounded-md bg-gray-500/60 animate-pulse"></h1>
            </div>
            </>
    )
}

export default LoadingMainBale