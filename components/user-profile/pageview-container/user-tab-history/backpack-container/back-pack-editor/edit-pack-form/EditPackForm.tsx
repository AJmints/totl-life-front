
const EditPackForm = () => {

    return (
        <div className='bg-gray-600/90 p-2 rounded-md mt-2'> 
        <div className="">
            <h1 className="text-gray-200 text-2xl mb-2 border-b-[1px]">Choose Pack to Edit:</h1>
            <p className="mb-3 text-gray-200">Pack Editor needs to be made - Examples below</p>
        </div>
            <button className="bg-gray-400 hover:bg-emerald-500 duration-200 rounded-md p-1 mr-2">Hiking Config</button>
            <button className="bg-gray-400 hover:bg-emerald-500 duration-200 rounded-md p-1 mr-2">Floating Config</button>
            <button className="bg-gray-400 hover:bg-emerald-500 duration-200 rounded-md p-1">Car Camping Config</button>
        </div>
    )
}

export default EditPackForm