'use client'

import dryBag from '../../../../../../../../../public/icons/drybag.png'
import drySack from '../../../../../../../../../public/icons/drysack.png'
import duffleSack from '../../../../../../../../../public/icons/packsack.png'
import Image from "next/image"
import { useState } from "react"

const TentForm = () => {

    const [submitting, setSubmitting] = useState()
    const [packStraps, setPackStraps] = useState()
    const [noStrap, setNoStrap] = useState()
    const [packSack, setPackSack] = useState()
    
    const handleSubmit = () => {}

    const itemCount = (status: any) => {}

    return (
        <>
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
                    
                    <div className={ packStraps ? "p-1 bg-gray-400 rounded-md text-gray-900" :"p-1 text-gray-200"}>
                        <div 
                        className="hover:bg-emerald-500 p-1 rounded-md duration-200 cursor-pointer"
                        // onClick={() => setPackSelect("strap")}
                        >
                        <Image
                        src={dryBag}
                        alt="back pack"
                        className="w-auto h-20 mx-auto rounded-md"
                        />
                        </div>
                        <p>DryPack</p>
                    </div>

                    <div className={ noStrap ? "p-1 bg-gray-400 rounded-md text-gray-900" :"p-1 text-gray-200"}>
                        <div className="hover:bg-emerald-500 p-1 rounded-md duration-200 cursor-pointer"
                        // onClick={() => setPackSelect("none")}
                        >
                        <Image
                        src={drySack}
                        alt="hydro pack"
                        className="w-auto h-20 mx-auto rounded-md"
                        />
                        </div>
                        <p>DryBag</p>
                    </div>

                    <div className={ packSack ? "p-1 bg-gray-400 rounded-md text-gray-900" :"p-1 text-gray-200"}>
                        <div className="hover:bg-emerald-500 p-1 rounded-md duration-200 cursor-pointer"
                        // onClick={() => setPackSelect("sack")}
                        >
                        <Image
                        src={duffleSack}
                        alt="hydro pack"
                        className="w-auto h-20 mx-auto rounded-md"
                        />
                        </div>
                        <p>Duffle</p>
                        {/* Make each state hold type and if its a bag or duffle. Store duffle or bag in model */}
                    </div>
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

                <div className="items-center p-2 hover:bg-gray-600 duration-200 rounded-md">
                    <h1 className="text-gray-200 font-light">How many do you have?</h1>
                    <div className='text-gray-800 mt-1 flex gap-2 font-normal'>
                        <div>
                            <button className='p-1 bg-gray-400 rounded-md px-2 hover:bg-emerald-500 duration-300 cursor-pointer' onClick={() => itemCount("minus")}>-</button>
                        </div>
                        <div className='p-1 bg-gray-200 rounded-md px-2'>
                            {/* <p id='quantity'>{String(quantity)}</p> */}
                        </div>
                        <div >
                            <button className='p-1 bg-gray-400 rounded-md px-2 hover:bg-emerald-500 duration-300 cursor-pointer' onClick={() => itemCount("plus")}>+</button>
                        </div>
                        
                           
                    </div>
                </div>

                <div className="pt-8 pb-2 flex">
                    <h1 className="text-gray-200 text-xl font-medium border-b-[1px]">Optional Info:</h1>
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
                            <option value="false">No</option>
                            <option value="true">Yes</option>
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

                {/* {error && <p className="mb-2 text-red-500/90 font-normal text-lg">Make sure you have selected all required information.</p>} */}

                { submitting ?
                    <div className='flex'>
                        <p className="px-2 font-normal text-left text-gray-800 bg-emerald-700 duration-300 rounded-md">Posting...</p>
                    </div>
                    :
                    <button className="px-2 font-normal hover:text-gray-800 hover:bg-emerald-600 duration-300 bg-gray-400 rounded-md">Add Item</button>
                }
            </div>
        </form>
        </>
    )
}

export default TentForm