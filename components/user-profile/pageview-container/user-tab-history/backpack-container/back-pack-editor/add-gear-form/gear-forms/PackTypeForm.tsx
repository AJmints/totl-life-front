'use client'

import { useState } from "react"

const PackTypeForm = () => {

    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = async(e: any) => {
        e.preventDefault()

        console.log(e.target.brand.value)

    }

    const packBrandOptions = ["Marchway", "Osprey"].map(option => {
        return (
            <option key={option} value={option}>{option}</option>
        )
    })

    return (
        <>
        
        <form onSubmit={handleSubmit}>
            {/* Title for post */}
            <div className="">
                <div className="sm:flex sm:space-x-2 items-center mb-2">
                    <h1 className="text-gray-200 font-light">Brand:</h1>
                    <div className='text-gray-800 mt-1'>
                        <select className='rounded-md mx-auto shadow-md p-1 bg-gray-200' defaultValue={"select a brand"} id="brand">
                            <option value="select a brand" disabled>select a brand</option>
                            {packBrandOptions}
                        </select>
                    </div>
                </div>

                { submitting ?
                    <div className='flex justify-center'>
                        <p className="px-2 font-normal text-gray-800 bg-emerald-700 duration-300 rounded-md">Posting...</p>
                    </div>
                    :
                    <button className="px-2 font-normal hover:text-gray-800 hover:bg-emerald-600 duration-300 text-gray-200 bg-gray-500 rounded-md">Submit</button>
                }
            </div>
        </form>
        </>
    )
}

export default PackTypeForm