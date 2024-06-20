'use client'

import { useState, useEffect } from "react"
import { useUserContext } from "@/app/context/UserContextProvider"
import categoryDropDown from "./data/categoryDropDown"
import BackPackForm from "./gear-forms/back-pack-form/BackPackForm"
import DryBagForm from "./gear-forms/dry-bag-form/DryBagForm"
import TentForm from "./gear-forms/tent-form/TentForm"
import Image from "next/image"
import SleepingBagForm from "./gear-forms/sleepingbag-form/SleepingBagForm"

const AddGearForm = () => {

    const [ selectCategory, setSelectCategory ] = useState(true)
    const [ backPack, setBackPack] = useState(false)
    const [ dryBag, setDryBag ] = useState(false)
    const [tent, setTent] = useState(false)
    const [ sleepGear, setSleepGear ] = useState(false)
    const { packImages } = useUserContext()

    const handleSelect = (select:any) => {

        setSelectCategory(false)
        setBackPack(false)
        setDryBag(false)
        setTent(false)

        if (select == "menu") {
            setSelectCategory(true)
        }
        if (select === "BackPack") {
            setBackPack(true)
        }
        if (select === "DryBag") {
            setDryBag(true)
        }
        if (select === "Tent") {
            setTent(true)
        }
        if (select === "SleepGear") {
            setSleepGear(true)
        }
    }

    const quickSelectCategory = [packImages[0], packImages[4], packImages[6], packImages[8]].map((img: any) => {
            return (
            <div key={img.id} className="p-2 hover:bg-emerald-600 bg-gray-500/60 cursor-pointer duration-300 rounded-md" onClick={() => handleSelect(img.category.split(" ").join(""))}>

                <h1 className="text-center text-lg font-normal bg-gray-600 text-gray-100 rounded-md mx-2 mb-1">{img.category}</h1>
                <Image
                    src={img.img.src}
                    alt=""
                    width={300}
                    height={300}
                    className="w-[6rem] h-[6rem] sm:w-[10rem] sm:h-[10rem] rounded-md mx-auto"
                />

            </div>
            )   
    }
    )

    const categoryOptions = categoryDropDown.map(categoryName => (
        <option key={categoryName} value={categoryName.split(" ").join("")}>{categoryName}</option>
    ))

    return (
        <div className='bg-gray-600/90 p-2 rounded-md mt-2'>

            <div className="">
                <h1 className="text-gray-200 text-2xl mb-2 border-b-[1px]">Add Item to Gear List:</h1>
            

            <div className="sm:flex sm:justify-between sm:space-x-2 items-center mb-2">
                
                <div className='text-gray-800 mt-1 flex items-center gap-2'>
                    <h1 className="text-gray-200 font-light">Category:</h1>
                    <select className='rounded-md mx-auto shadow-md p-1 bg-gray-200' defaultValue={"select a category"} onChange={(event) => handleSelect(event.target.value)} id="defaultlog">
                        <option value="select a category" disabled>select a category</option>
                        {categoryOptions}
                    </select>
                </div>

                <div>
                    { !selectCategory && <button onClick={() => handleSelect("menu")} className="p-2 bg-gray-400 rounded-md hover:bg-emerald-500 duration-300">Go Back</button> } 
                </div>
            
            </div>

            
            </div>

            <div>
                {
                    selectCategory ? 
                        <div className="p-2 bg-gray-400 rounded-md grid grid-cols-2 md:grid-cols-3 gap-2">
                            {quickSelectCategory}
                        </div>
                    :
                    <>
                        { backPack && <BackPackForm /> }
                        { dryBag && <DryBagForm />}
                        { tent && <TentForm />}
                        { sleepGear && <SleepingBagForm />}
                    </>
                }
            </div>
            


        </div>
    )
}

export default AddGearForm
