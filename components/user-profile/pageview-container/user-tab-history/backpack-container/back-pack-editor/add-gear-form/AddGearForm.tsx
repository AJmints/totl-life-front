'use client'

import { useState, useEffect } from "react"
import categoryDropDown from "./data/categoryDropDown"
import BackPackForm from "./gear-forms/back-pack-form/BackPackForm"
import DryBagForm from "./gear-forms/dry-bag-form/DryBagForm"

const AddGearForm = () => {

    const [ backPack, setBackPack] = useState(false)
    const [ dryBag, setDryBag ] = useState(false)

    const handleSelect = (select:any) => {

        setBackPack(false)
        setDryBag(false)

        if (select === "BackPack") {
            setBackPack(true)
        }
        if (select === "DryBag") {
            setDryBag(true)
        }
    }

    const categoryOptions = categoryDropDown.map(categoryName => (
        <option key={categoryName} value={categoryName.split(" ").join("")}>{categoryName}</option>
    ))

    return (
        <div className='bg-gray-600/90 p-2 rounded-md mt-2'>

            <div className="">
                <h1 className="text-gray-200 text-2xl mb-2 border-b-[1px]">Add Item to Pack:</h1>
            

            <div className="sm:flex sm:space-x-2 items-center mb-2">
                <h1 className="text-gray-200 font-light">Category:</h1>
                <div className='text-gray-800 mt-1'>
                    <select className='rounded-md mx-auto shadow-md p-1 bg-gray-200' defaultValue={"select a category"} onChange={(event) => handleSelect(event.target.value)} id="defaultlog">
                        <option value="select a category" disabled>select a category</option>
                        {categoryOptions}
                    </select>
                </div>
            </div>
            </div>

            { backPack && <BackPackForm /> }
            { dryBag && <DryBagForm />}

        </div>
    )
}

export default AddGearForm