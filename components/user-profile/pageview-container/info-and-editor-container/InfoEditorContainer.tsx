import Image from "next/image"
import addSign from '../../../../public/icons/add-white.png'

const InfoEditorContainer = () => {

    return (
        <div className="bg-gray-500 rounded-md">
            <div className="flex"> 
            <div className="flex space-x-2 bg-gray-400 rounded-b-none rounded-md p-2">
                <button className="bg-gray-500 hover:bg-emerald-500 duration-300 p-2 rounded-md">BackPack Editor</button>
                <button className="bg-gray-500 hover:bg-emerald-500 duration-300 p-2 rounded-md">Events</button>
                <button className="bg-gray-500 hover:bg-emerald-500 duration-300 p-2 rounded-md">Market Place</button>
            </div>
            </div>
            <div className="">
                <div className="py-14 sm:px-56 bg-gray-300 rounded-md rounded-tl-none">
                    <p className="text-gray-700 text-center text-xl">Under Development</p>
                </div>
            </div>

            <div className="ml-2 items-center hidden">
                <div>
                <Image
                    src={addSign}
                    alt=""
                    className="w-10 h-auto rounded-full p-2 bg-emerald-600 mx-auto hover:bg-yellow-500 duration-300 cursor-pointer"    
                />
                <h1 className="text-lg ml-2">Add Gear</h1>
                </div>
            </div>

        </div>
    )
}

export default InfoEditorContainer