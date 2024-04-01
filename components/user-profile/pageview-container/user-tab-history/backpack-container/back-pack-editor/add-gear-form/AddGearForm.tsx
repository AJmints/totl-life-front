'use client'

import { useState, useEffect } from "react"
import categoryDropDown from "./data/categoryDropDown"
import PackTypeForm from "./gear-forms/PackTypeForm"

const AddGearForm = () => {

    const [ packType, setPackType] = useState(false)

    const handleSelect = (select:any) => {
        console.log(select)

        setPackType(false)

        if (select === "PackType") {
            setPackType(true)
        }
    }

    const categoryOptions = categoryDropDown.map(categoryName => (
        <option key={categoryName} value={categoryName.split(" ").join("")}>{categoryName}</option>
    ))

    return (
        <div className='bg-gray-600/90 p-2 rounded-md mt-2'>

            <div>
                <h1 className="text-gray-200 text-2xl mb-2">Add Item to Pack:</h1>
            </div>

            <div className="sm:flex sm:space-x-2 items-center mb-2">
                <h1 className="text-gray-200 font-light">Category:</h1>
                <div className='text-gray-800 mt-1'>
                    <select className='rounded-md mx-auto shadow-md p-1 bg-gray-200' defaultValue={"select a category"} onChange={(event) => handleSelect(event.target.value)} id="defaultlog">
                        <option value="select a category" disabled>select a category</option>
                        {categoryOptions}
                    </select>
                </div>
            </div>

            {
                packType ? 
                <PackTypeForm />
                :
                <></>
            }

        </div>
    )
}

export default AddGearForm