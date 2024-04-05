'use client'

import { useState } from "react"
import backpackImg from '../../../../../../../../../public/icons/backpack.png'
import daypackImg from '../../../../../../../../../public/icons/daypack.png'
import hydropackImg from '../../../../../../../../../public/icons/hydrationpack.png'
import Image from "next/image"
import backPackBrands from "../../data/backPackBrands"
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
    const [noteCount, setNoteCount] = useState({
        model: "",
        notes: ""
    })
    const { userID, setUserGearList } = useUserContext()

    const handleSubmit = async(e: any) => {
        e.preventDefault()

        return

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

        if (packType === undefined || e.target.brand.value === "null" || e.target.storage.value === "null") {
            setError(true)
            return
        }

        const data = {
            userId: userID,
            category: "Back Pack",
            type: packType,
            brand: e.target.brand.value,
            storage: String(e.target.storage.value) + "L", 
            model: e.target.model.value.replace(/[^a-z0-9 .]/gi, '').replace(/\s+/g, ' '),
            size: e.target.size.value,
            extraInfo: e.target.reservoir.value,
            lendable: e.target.lendable.value,
            weight: e.target.lbs.value + "." + e.target.oz.value,
            additionalDetails: e.target.notes.value.replace(/[^a-z0-9 .]/gi, '').replace(/\s+/g, ' '),
            itemCondition: e.target.condition.value
        }
        
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
        if (response.status === "success") {
            setUserGearList((prev:any) => [...prev, response.newGear])
            setSubmitting(false)
        } else {
            setSubmitting(false)
        }
        

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
        for (let i = 10; i <= maxLiter; i++) {
          capacity.push(<option key={i} value={i}>{i}</option>);
        }
        return capacity;
    }

    const maxLbs = 10
    const lbsOptions = () => {
        let lbs = [];
        for (let i = 0; i <= maxLbs; i++) {
          lbs.push(<option key={i} value={i}>{i}</option>);
        }
        return lbs;
    }

    const maxOz = 16
    const ozOptions = () => {
        let oz = [];
        for (let i = 0; i <= maxOz; i++) {
          oz.push(<option key={i} value={i}>{i}</option>);
        }
        return oz;
    }

    const handleCount = (event: any) => {
        const {name, value} = event.target

        setNoteCount(prevTitleBody => {
            return {
                ...prevTitleBody,
                [name]: value
            }
        })
    }

    

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
                    
                    <div className={ back ? "p-1 bg-gray-400 rounded-md text-gray-900" :"p-1 text-gray-200"}>
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
                    </div>
                </div>

                <div className="sm:flex sm:space-x-2 items-center  p-2 hover:bg-gray-600 duration-200 rounded-md">
                    <h1 className="text-gray-200 font-light">Brand:</h1>
                    <div className='text-gray-800 mt-1'>
                        <select className='rounded-md mx-auto shadow-md p-1 bg-gray-200' defaultValue={"null"} id="brand">
                            <option value="null" disabled>select a brand</option>
                            {packBrandOptions}
                        </select>
                    </div>
                </div>

                <div className="sm:flex sm:space-x-2 items-center  p-2 hover:bg-gray-600 duration-200 rounded-md">
                    <h1 className="text-gray-200 font-light">Pack Capacity(L):</h1>
                    <div className='text-gray-800 mt-1'>
                        <select className='rounded-md mx-auto shadow-md p-1 bg-gray-200' defaultValue={"null"} id="storage">
                            <option value="null" disabled>Liters</option>
                            {capacityOptions()}
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
                        onChange={handleCount}
                        minLength={3} maxLength={20} 
                    />
                    <p className="text-gray-200">{noteCount.model.length}/20</p>
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
                            {lbsOptions()}
                        </select>
                        </div>
                        <div className="flex">
                        <h1 className="text-gray-200 font-light mr-2">Oz:</h1>
                        <select className='rounded-md mx-auto shadow-md p-1 bg-gray-200' defaultValue={0} id="oz">
                            <option value={0} disabled>Ounces</option>
                            {ozOptions()}
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
                    onChange={handleCount}
                />
                <p className="text-gray-200">{noteCount.notes.length}/100</p>
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