import { useUserContext } from "@/app/context/UserContextProvider"

const URL: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL

export const token = async() => {
    const getToken: Response = await fetch("/api/headers")
    const status = await getToken.json().catch((err) => {
        console.log(err)
    })
    return status
}

const CreatePackForm = () => {

    const {userID} = useUserContext()

    const handleSubmit = async() => {

        const data = {
            userID: userID,
            specificGearItems: [1,2],
            configType: "Test Pack",
            packName: "Pack setup",
            hiddenPack: false
        }

        console.log(data)

        const createPack = await fetch(URL + "/backpack/create-pack-config", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "auth-token": "Bearer " + await token()
            },
            body: JSON.stringify(data)
        })
        const response = await createPack.json().catch((err) => {
            console.log(err)
        })
        console.log(response)
    }

    const getPackConfigData = async() => {
        const createPack = await fetch(URL + "/backpack/get-user-pack-configs/" + userID)
        const response = await createPack.json().catch((err) => {
            console.log(err)
        })
        console.log(response)

    }

    return (
        <div className='bg-gray-600/90 p-2 rounded-md mt-2'>

            <div className="">
                <h1 className="text-gray-200 text-2xl mb-2 border-b-[1px]">Create a New Pack Configuration:</h1>
            </div>

            <div>
                <p className="text-gray-200">Pack Configuration under construction</p>
                {/* <button onClick={() => handleSubmit()}>Testing</button> */}
                <button onClick={() => getPackConfigData()}>GetDetails</button>
            </div>

            <form onSubmit={handleSubmit}>
            {/* Title for post */}
            <div className="">

                <div className="pt-6 flex">
                    <h1 className="text-gray-200 text-xl px-1 font-medium border-b-[1px]">Required Info:</h1>
                </div>

                <div className="pt-2">
                    <h1 className="text-gray-200 text-medium font-light">Select Pack Type:</h1>
                </div>
                <div className="flex items-center gap-2 text-lg text-center font-normal p-2 hover:bg-gray-600 duration-200 rounded-md">
                    
                    {/* <div className={ back ? "p-1 bg-gray-400 rounded-md text-gray-900" :"p-1 text-gray-200"}>
                        <div 
                        className="hover:bg-emerald-500 p-1 rounded-md duration-200 cursor-pointer"
                        onClick={() => setPackSelect("back")}>
                        <Image
                        src={backpackImg}
                        alt="back pack"
                        className="w-auto h-20 mx-auto rounded-md"
                        />
                        </div>
                        <p>Hiking</p>
                    </div>

                    <div className={ day ? "p-1 bg-gray-400 rounded-md text-gray-900" :"p-1 text-gray-200"}>
                        <div className="hover:bg-emerald-500 p-1 rounded-md duration-200 cursor-pointer"
                        onClick={() => setPackSelect("day")}
                        >
                        <Image
                        src={daypackImg}
                        alt="day pack"
                        className="w-auto h-20 mx-auto rounded-md"
                        />
                        </div>
                        <p>Day</p>
                    </div>

                    <div className={ hydro ? "p-1 bg-gray-400 rounded-md text-gray-900" :"p-1 text-gray-200"}>
                        <div className="hover:bg-emerald-500 p-1 rounded-md duration-200 cursor-pointer"
                        onClick={() => setPackSelect("hydro")}
                        >
                        <Image
                        src={hydropackImg}
                        alt="hydro pack"
                        className="w-auto h-20 mx-auto rounded-md"
                        />
                        </div>
                        <p>Hydro</p>
                    </div> */}
                </div>

                <div className="sm:flex sm:space-x-2 items-center  p-2 hover:bg-gray-600 duration-200 rounded-md">
                    <h1 className="text-gray-200 font-light">Brand:</h1>
                    <div className='text-gray-800 mt-1'>
                        <select className='rounded-md mx-auto shadow-md p-1 bg-gray-200' defaultValue={"null"} id="brand">
                            <option value="null" disabled>select a brand</option>
                            {/* {packBrandOptions} */}
                        </select>
                    </div>
                </div>

                <div className="sm:flex sm:space-x-2 items-center  p-2 hover:bg-gray-600 duration-200 rounded-md">
                    <h1 className="text-gray-200 font-light">Pack Capacity(L):</h1>
                    <div className='text-gray-800 mt-1'>
                        <select className='rounded-md mx-auto shadow-md p-1 bg-gray-200' defaultValue={"null"} id="storage">
                            <option value="null" disabled>Liters</option>
                            {/* {capacityOptions()} */}
                        </select>
                    </div>
                </div>

                <div className="pt-8 pb-2 flex">
                    <h1 className="text-gray-200 text-xl font-medium border-b-[1px]">Optional Info:</h1>
                </div>

                <div className=' p-2 hover:bg-gray-600 duration-200 rounded-md'>
                    <label className="text-gray-200 font-light mr-2" htmlFor='model'>Model:</label>
                    <input 
                        className="rounded-md font-normal pl-2 w-36" 
                        type='text' 
                        autoComplete='off' 
                        placeholder="Pack Model"
                        name='model' 
                        // onChange={handleCount}
                        minLength={3} maxLength={20} 
                    />
                    {/* <p className="text-gray-200">{noteCount.model.length}/20</p> */}
                </div>

                <div className="items-center p-2 hover:bg-gray-600 duration-200 rounded-md">
                    <h1 className="text-gray-200 font-light">How many do you have?</h1>
                    <div className='text-gray-800 mt-1 flex gap-2 font-normal'>
                        <div>
                            {/* <p className='p-1 bg-gray-400 rounded-md px-2 hover:bg-emerald-500 duration-300 cursor-pointer' onClick={() => itemCount("minus")}>-</p> */}
                        </div>
                        <div className='p-1 bg-gray-200 rounded-md px-2'>
                            {/* <p id='quantity'>{String(quantity)}</p> */}
                        </div>
                        <div >
                            {/* <p className='p-1 bg-gray-400 rounded-md px-2 hover:bg-emerald-500 duration-300 cursor-pointer' onClick={() => itemCount("plus")}>+</p> */}
                        </div>
                    </div>
                </div>

                <div className="sm:flex sm:space-x-2 items-center p-2 hover:bg-gray-600 duration-200 rounded-md">
                    <h1 className="text-gray-200 font-light">Pack Size:</h1>
                    <div className='text-gray-800 '>
                        <select className='rounded-md mx-auto shadow-md p-1 bg-gray-200' defaultValue={"Multi-size"} id="size">
                            <option value="Multi-size">Multi-Size</option>
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                        </select>
                    </div>
                </div>

                <div className="items-center p-2 hover:bg-gray-600 duration-200 rounded-md">
                    <h1 className="text-gray-200 font-light">Empty Pack Weight:</h1>
                    <div className='text-gray-800 mt-1 flex'>
                        <div className="flex mr-2">
                        <h1 className="text-gray-200 font-light mr-2">Lbs:</h1>
                        <select className='rounded-md mx-auto shadow-md p-1 bg-gray-200' defaultValue={0} id="lbs">
                            <option value={0} disabled>Lbs</option>
                            {/* {lbsOptions()} */}
                        </select>
                        </div>
                        <div className="flex">
                        <h1 className="text-gray-200 font-light mr-2">Oz:</h1>
                        <select className='rounded-md mx-auto shadow-md p-1 bg-gray-200' defaultValue={0} id="oz">
                            <option value={0} disabled>Ounces</option>
                            {/* {ozOptions()} */}
                        </select>
                        </div>
                    </div>
                </div>

                <div className="sm:flex sm:space-x-2 items-center p-2 hover:bg-gray-600 duration-200 rounded-md">
                    <h1 className="text-gray-200 font-light">Reservoir Compatible:</h1>
                    <div className='text-gray-800 '>
                        <select className='rounded-md mx-auto shadow-md p-1 bg-gray-200' defaultValue={"false"} id="reservoir">
                            <option value="Reservoir Compatible">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                </div>

                <div className="sm:flex sm:space-x-2 items-center p-2 hover:bg-gray-600 duration-200 rounded-md">
                    <h1 className="text-gray-200 font-light">Pack Condition:</h1>
                    <div className='text-gray-800 '>
                        <select className='rounded-md mx-auto shadow-md p-1 bg-gray-200' defaultValue={"used"} id="condition">
                            <option value="used">Used</option>
                            <option value="new">New</option>
                            <option value="poor">Poor</option>
                            <option value="bad">Last Legs</option>
                        </select>
                    </div>
                </div>

                <div className="items-center p-2 hover:bg-gray-600 duration-200 rounded-md">
                    <h1 className="text-gray-200 font-light">Would you lend this to a friend if they need?</h1>
                    <div className='text-gray-800 mt-1'>
                        <select className='rounded-md mx-auto shadow-md p-1 bg-gray-200' defaultValue={"false"} id="lendable">
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                </div>

                <div className='w-full flex flex-col p-2 hover:bg-gray-600 duration-200 rounded-md mb-8'>
                <label className="text-gray-200 font-light" htmlFor='notes'>Additional Notes:</label>
                <textarea 
                    className="rounded-md font-normal w-72"
                    rows={2} 
                    placeholder="Anything about this item you wish to note?"
                    name='notes'
                    minLength={3} maxLength={100}
                    // onChange={handleCount}
                />
                {/* <p className="text-gray-200">{noteCount.notes.length}/100</p> */}
                </div>

                {/* {error && <p className="mb-2 text-red-500/90 font-normal text-lg">Make sure you have selected all required information.</p>}
                {success && <p className="mb-2 text-emerald-500 font-normal text-lg">Item successfully added!</p>} */}

                {/* { submitting ?
                    <div className='flex'>
                        <p className="px-2 font-normal text-left text-gray-800 bg-emerald-700 duration-300 rounded-md">Posting...</p>
                    </div>
                    :
                    <button className="px-2 font-normal hover:text-gray-800 hover:bg-emerald-600 duration-300 bg-gray-400 rounded-md">Add Item</button>
                } */}
            </div>
        </form>



        </div>
    )
}

export default CreatePackForm