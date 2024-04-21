'use client'

import dryBag from '../../../../../../../../../public/icons/drybag.png'
import drySack from '../../../../../../../../../public/icons/drysack.png'
import duffleSack from '../../../../../../../../../public/icons/packsack.png'
import dryBagBrands from "../../data/brands/dryBagBrands"
import { useState } from 'react'
import { useUserContext } from '@/app/context/UserContextProvider'
import Image from 'next/image'

const URL: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL

export const token = async() => {
    const getToken: Response = await fetch("/api/headers")
    const status = await getToken.json().catch((err) => {
        console.log(err)
    })
    return status
}

const DryBagForm = () => {

    const [ submitting, setSubmitting ] = useState(false)
    const [ packStraps, setPackStraps ] = useState(false)
    const [ packSack, setPackSack] = useState(false)
    const [ noStrap, setNoStrap ] = useState(false)
    const [ error, setError ] = useState(false)
    const [ success, setSuccess ] = useState(false)
    const [ quantity, setQuantity ] = useState<number>(1)
    const [noteCount, setNoteCount] = useState({
        model: "",
        notes: ""
    })

    const { userID, setUserGearList} = useUserContext()

    const handleSubmit = async(e: any) => {
        e.preventDefault()

        setError(false)
        setSubmitting(true)
        setSuccess(false)

        let packType
        let hasStraps = "No Straps"

        if (packStraps) {
            packType = "Dry Pack"
            hasStraps = "BackPack Straps"
        }
        if (noStrap) {
            packType = "Dry Bag"
        }
        if (packSack) {
            packType = "Dry Duffle"
        }

        if (packType === undefined || e.target.brand.value === "null" || e.target.storage.value === "null") {
            setError(true)
            return
        }
        // return console.log(packType)

        const data = {
            userId: userID,
            category: "Dry Bag",
            type: packType,
            brand: e.target.brand.value,
            storage: String(e.target.storage.value) + "L", 
            quantity: quantity,
            extraInfo: hasStraps,
            lendable: e.target.lendable.value,
            additionalDetails: e.target.notes.value.replace(/[^a-z0-9 .]/gi, '').replace(/\s+/g, ' '),
            itemCondition: e.target.condition.value
        }
        
        const createPack = await fetch(URL + "/gear/create-item", {
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

                e.target.brand.value = <option value="null" disabled>Liters</option>
                e.target.storage.value = "Liters"
                e.target.lendable.value = "No"
                e.target.condition.value = "Used"
                e.target.notes.value=""
                setPackStraps(false)
                setPackSack(false)
                setNoStrap(false)
                setSuccess(true)
            
        } else {
            setSubmitting(false)
        }
    }

    const setPackSelect = (dryBag:string) => {

        setPackStraps(false)
        setNoStrap(false)
        setPackSack(false)

        if (dryBag === "strap") {
            setPackStraps(true)
        }
        if (dryBag === "sack") {
            setPackSack(true)
        }
        if (dryBag === "none") {
            setNoStrap(true)
        }
 
    }

    const packBrandOptions = dryBagBrands.map(option => {
        return (
            <option key={option} value={option}>{option}</option>
        )
    })
    
    const capacityOptions = () => {
        let capacity = [];
        const maxLiter = 23
        let liter = 0

        for (let i = 0; i <= maxLiter; i++) {
            liter = liter + 5
            capacity.push(<option key={i} value={liter}>{liter}</option>);
        }
        return capacity;
    }

    const itemCount = (operator: string) => {

        if (quantity >= 10 && operator === "plus" || operator === "minus" && quantity <= 1) {
            return
        }

        if (operator === "plus") {
            setQuantity(quantity + 1)
        } else if (operator === "minus") {
            setQuantity(quantity - 1)
        }
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
                <div>
                    <p className='text-gray-200 text-xs'>*DryPack = Has BackPack Straps, DryBag = No Straps</p>
                </div>
                <div className="flex items-center gap-2 text-lg text-center font-normal p-2 hover:bg-gray-600 duration-200 rounded-md">
                    
                    <div className={ packStraps ? "p-1 bg-gray-400 rounded-md text-gray-900" :"p-1 text-gray-200"}>
                        <div 
                        className="hover:bg-emerald-500 p-1 rounded-md duration-200 cursor-pointer"
                        onClick={() => setPackSelect("strap")}>
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
                        onClick={() => setPackSelect("none")}
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
                        onClick={() => setPackSelect("sack")}
                        >
                        <Image
                        src={duffleSack}
                        alt="hydro pack"
                        className="w-auto h-20 mx-auto rounded-md"
                        />
                        </div>
                        <p>DryDuffle</p>
                        {/* Make each state hold type and if its a bag or duffle. Store duffle or bag in model */}
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

                <div className="items-center p-2 hover:bg-gray-600 duration-200 rounded-md">
                    <h1 className="text-gray-200 font-light">How many do you have?</h1>
                    <div className='text-gray-800 mt-1 flex gap-2 font-normal'>
                        <div>
                            <p className='p-1 bg-gray-400 rounded-md px-2 hover:bg-emerald-500 duration-300 cursor-pointer' onClick={() => itemCount("minus")}>-</p>
                        </div>
                        <div className='p-1 bg-gray-200 rounded-md px-2'>
                            <p id='quantity'>{String(quantity)}</p>
                        </div>
                        <div >
                            <p className='p-1 bg-gray-400 rounded-md px-2 hover:bg-emerald-500 duration-300 cursor-pointer' onClick={() => itemCount("plus")}>+</p>
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
                    onChange={handleCount}
                />
                <p className="text-gray-200">{noteCount.notes.length}/100</p>
                </div>

                {error && <p className="mb-2 text-red-500/90 font-normal text-lg">Make sure you have selected all required information.</p>}
                {success && <p className="mb-2 text-emerald-500 font-normal text-lg">Item successfully added!</p>}

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

export default DryBagForm