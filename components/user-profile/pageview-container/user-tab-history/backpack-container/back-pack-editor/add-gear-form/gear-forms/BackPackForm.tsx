'use client'

import { useState } from "react"
import backpackImg from '../../../../../../../../public/icons/backpack.png'
import daypackImg from '../../../../../../../../public/icons/daypack.png'
import hydropackImg from '../../../../../../../../public/icons/hydrationpack.png'
import Image from "next/image"
import backPackBrands from "../data/backPackBrands"
import { useUserContext } from "@/app/context/UserContextProvider"

const URL: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL

export const token = async() => {
    const getToken: Response = await fetch("/api/headers")
    const status = await getToken.json().catch((err) => {
        console.log(err)
    })
    return status
}

const BackPackForm = () => {

    const [submitting, setSubmitting] = useState(false)
    const [back, setBack] = useState(false)
    const [day, setDay] = useState(false)
    const [hydro, setHydro] = useState(false)
    const [error, setError] = useState(false)
    const { userID } = useUserContext()

    const handleSubmit = async(e: any) => {
        e.preventDefault()

        setError(false)
        setSubmitting(true)

        let packType

        if (back) {
            packType = "Hiking"
        }
        if (day) {
            packType = "Day"
        }
        if (hydro) {
            packType = "Hydration"
        }

        if (packType === undefined || e.target.brand.value === "null" || e.target.size.value === "null") {
            setError(true)
            return
        }

        const data = {
            userId: userID,
            category: "Back Pack",
            type: packType,
            brand: e.target.brand.value,
            size: e.target.size.value, 
            model: e.target.model.value,
            extraInfo: e.target.reservoir.value,
            lendable: e.target.lendable.value
        }
        setSubmitting(false)
        return
        
        const createPack = await fetch(URL + "/gear/create-backpack-item", {
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
        // console.log(response)
        setSubmitting(false)

    }

    const setPackSelect = (pack:string) => {

        setBack(false)
        setDay(false)
        setHydro(false)

        if (pack === "back") {
            setBack(true)
        }
        if (pack === "day") {
            setDay(true)
        }
        if (pack === "hydro") {
            setHydro(true)
        }
 
    }

    const packBrandOptions = backPackBrands.map(option => {
        return (
            <option key={option} value={option}>{option}</option>
        )
    })

    const maxLiter = 80
    const capacityOptions = () => {
        let capacity = [];
        for (let i = 10; i < maxLiter; i++) {
          capacity.push(<option key={i} value={i}>{i}</option>);
        }
        return capacity;
    }

    return (
        <>
        
        <form onSubmit={handleSubmit}>
            {/* Title for post */}
            <div className="">

                <div className="pt-2">
                    <h1 className="text-gray-200 text-xl font-medium">Required Info:</h1>
                </div>

                <div className="pt-4">
                    <h1 className="text-gray-200 text-medium font-medium">Select Pack:</h1>
                </div>
                <div className="flex items-center gap-2 sm:-mt-2 mb-2 text-lg text-center font-normal">
                    <div className={ back ? "p-1 bg-gray-400 rounded-md text-gray-900" :"p-1 text-gray-200"}>
                        <div 
                        className="hover:bg-emerald-500 p-2 rounded-md duration-200 cursor-pointer"
                        onClick={() => setPackSelect("back")}>
                        <Image
                        src={backpackImg}
                        alt="back pack"
                        className="w-20 h-auto mx-auto rounded-md"
                        />
                        </div>
                        <p>Hiking Pack</p>
                    </div>

                    <div className={ day ? "p-1 bg-gray-400 rounded-md text-gray-900" :"p-1 text-gray-200"}>
                        <div className="hover:bg-emerald-500 p-2 rounded-md duration-200 cursor-pointer"
                        onClick={() => setPackSelect("day")}
                        >
                        <Image
                        src={daypackImg}
                        alt="day pack"
                        className="w-20 h-auto mx-auto rounded-md"
                        />
                        </div>
                        <p>Day Pack</p>
                    </div>

                    <div className={ hydro ? "p-1 bg-gray-400 rounded-md text-gray-900" :"p-1 text-gray-200"}>
                        <div className="hover:bg-emerald-500 p-2 rounded-md duration-200 cursor-pointer"
                        onClick={() => setPackSelect("hydro")}
                        >
                        <Image
                        src={hydropackImg}
                        alt="hydro pack"
                        className="w-20 h-auto mx-auto rounded-md"
                        />
                        </div>
                        <p>Hydro Pack</p>
                    </div>
                </div>

                <div className="sm:flex sm:space-x-2 items-center mb-2">
                    <h1 className="text-gray-200 font-light">Brand:</h1>
                    <div className='text-gray-800 mt-1'>
                        <select className='rounded-md mx-auto shadow-md p-1 bg-gray-200' defaultValue={"null"} id="brand">
                            <option value="null" disabled>select a brand</option>
                            {packBrandOptions}
                        </select>
                    </div>
                </div>

                <div className="sm:flex sm:space-x-2 items-center mb-2">
                    <h1 className="text-gray-200 font-light">Pack Capacity(L):</h1>
                    <div className='text-gray-800 mt-1'>
                        <select className='rounded-md mx-auto shadow-md p-1 bg-gray-200' defaultValue={"null"} id="size">
                            <option value="null" disabled>Liters</option>
                            {capacityOptions()}
                        </select>
                    </div>
                </div>

                <div className="pt-6 pb-2">
                    <h1 className="text-gray-200 text-xl font-medium">Optional Info:</h1>
                </div>

                <div className='pb-2'>
                    <label className="text-gray-200 font-light mr-2" htmlFor='model'>Model:</label>
                    <input 
                        className="rounded-md font-normal pl-2 w-36" 
                        type='text' 
                        autoComplete='off' 
                        placeholder="Pack Model"
                        id='model' 
                        minLength={5} maxLength={20} 
                    />
                </div>

                <div className="sm:flex sm:space-x-2 items-center mb-2">
                    <h1 className="text-gray-200 font-light">Reservoir Compatible:</h1>
                    <div className='text-gray-800 mt-1'>
                        <select className='rounded-md mx-auto shadow-md p-1 bg-gray-200' defaultValue={"false"} id="reservoir">
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                </div>

                <div className="items-center mb-5">
                    <h1 className="text-gray-200 font-light">Would you lend this to a friend if they need?</h1>
                    <div className='text-gray-800 mt-1'>
                        <select className='rounded-md mx-auto shadow-md p-1 bg-gray-200' defaultValue={"false"} id="lendable">
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                </div>

                {error && <p className="mb-2 text-red-500/90 font-normal text-lg">Make sure you have selected all required information.</p>}

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

export default BackPackForm