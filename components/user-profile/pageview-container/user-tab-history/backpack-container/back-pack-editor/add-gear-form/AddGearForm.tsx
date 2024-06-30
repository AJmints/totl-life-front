'use client'

import { useState, useEffect } from "react"
import { useUserContext } from "@/app/context/UserContextProvider"
import Image from "next/image"
import categoryDropDown from "./data/categoryDropDown"
import BackPackForm from "./gear-forms/BackPackForm"
import DryBagForm from "./gear-forms/DryBagForm"
import TentForm from "./gear-forms/TentForm"
import HammockForm from "./gear-forms/HammockForm"
import SleepingBagForm from "./gear-forms/SleepingBagForm"
import ShelterTarpForm from "./gear-forms/ShelterTarpForm"
import CoolerFridgeForm from "./gear-forms/CoolerFridgeForm"
import CampKitchenForm from "./gear-forms/CampKitchenForm"
import CampFurnitureForm from "./gear-forms/CampFurnitureForm"
import CampClothingForm from "./gear-forms/CampClothingForm"
import ToolsForm from "./gear-forms/ToolsForm"
import ElectornicsForm from "./gear-forms/ElectronicsForm"
import HydrationForm from "./gear-forms/HydrationForm"
import ConsumablesForm from "./gear-forms/ConsumablesForm"
import CampGamesForm from "./gear-forms/CampGamesForm"

const AddGearForm = () => {

    const [ category, setCategory ] = useState<"menu" | "BackPack" | "DryBag" | "Hammock" | "SleepGear" | "Tent" | "Shelter/Tarp" | "Cooler/Fridge" | "CampKitchen" | "CampFurniture" | "CampClothing" | "Tools" | "Electronic" | "Hydration" | "Consumables" | "CampGames">("menu")

    const { packImages } = useUserContext()

    const handleSelect = (select:any) => {

        switch(select) {
            case "menu":
                setCategory("menu")
                break
            case "BackPack":
                setCategory("BackPack")
                break
            case "DryBag":
                setCategory("DryBag")
                break
            case "Hammock":
                setCategory("Hammock")
                break
            case "SleepGear":
                setCategory("SleepGear")
                break
            case "Tent":
                setCategory("Tent")
                break
            case "Shelter/Tarp":
                setCategory("Shelter/Tarp")
                break
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
                <div className="mb-2">
                    { category !== "menu" && <button onClick={() => handleSelect("menu")} className="p-2 bg-gray-400 rounded-md hover:bg-emerald-500 duration-300">Back</button> } 
                </div>

                <h1 className="text-gray-200 text-2xl mb-2 border-b-[1px]">Add Item to Gear List:</h1>
            
                <div className="sm:flex sm:justify-between sm:space-x-2 items-center mb-2">
                
                    <div className='text-gray-800 mt-1 flex items-center gap-2'>
                        <h1 className="text-gray-200 font-light">Category:</h1>
                        <select className='rounded-md mx-auto shadow-md p-1 bg-gray-200' defaultValue={"select a category"} onChange={(event) => handleSelect(event.target.value)} id="defaultlog">
                            <option value="select a category" disabled>select a category</option>
                            {categoryOptions}
                        </select>
                    </div>

                </div>

            
            </div>

            <div>
                {
                    category === "menu" ? 
                        <div className="p-2 bg-gray-400 rounded-md grid grid-cols-2 md:grid-cols-3 gap-2">
                            {quickSelectCategory}
                        </div>
                    :
                    <>
                        { category === "BackPack" && <BackPackForm /> }
                        { category === "DryBag" && <DryBagForm /> }
                        { category === "Tent" && <TentForm /> }
                        { category === "Hammock" && <HammockForm /> }
                        { category === "SleepGear" && <SleepingBagForm /> }
                        { category === "Shelter/Tarp" && <ShelterTarpForm /> }
                        { category === "Cooler/Fridge" && <CoolerFridgeForm /> }
                        { category === "CampKitchen" && <CampKitchenForm /> }
                        { category === "CampFurniture" && <CampFurnitureForm /> }
                        { category === "CampClothing" && <CampClothingForm /> } 
                        { category === "Tools" && <ToolsForm /> }
                        { category === "Electronic" && <ElectornicsForm /> }
                        { category === "Hydration" && <HydrationForm /> }
                        { category === "Consumables" && <ConsumablesForm/> }
                        { category === "CampGames" && <CampGamesForm /> }

                    </>
                }
            </div>
            


        </div>
    )
}

export default AddGearForm
