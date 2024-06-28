'use client'

import packTent from '../../../../../../../../public/icons/packtent.png'
import campTent from '../../../../../../../../public/icons/camptent.png'
import tentBrands from '../data/brands/tentBrands'
import Image from "next/image"
import { useState } from "react"
import { useUserContext } from '@/app/context/UserContextProvider'

const URL: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL

export const token = async() => {
    const getToken: Response = await fetch("/api/headers")
    const status = await getToken.json().catch((err) => {
        console.log(err)
    })
    return status
}

const TentForm = () => {

    const [submitting, setSubmitting] = useState<boolean>(false)
    const [ tentType, setTent ] = useState("")
    const [ success, setSuccess ] = useState(false)
    const [backpacking, setBackpacking] = useState<boolean>(false)
    const [camping, setCamping] = useState<boolean>(false)
    const [ personQuantity, setPersonQuantity ] = useState<number>(2)
    const [ quantity, setQuantity ] = useState<number>(1)
    const [error, setError] = useState(false)
    const [noteCount, setNoteCount] = useState({
        model: "",
        notes: ""
    })
    const { userID, setUserGearList } = useUserContext()
    
    const handleSubmit = async(e: any) => {
        e.preventDefault()

        setError(false)
        setSubmitting(true)
        setSuccess(false)

        let tentType

        if (backpacking) {
            tentType = "BackPacking Tent"
        }
        if (camping) {
            tentType = "Camping Tent"
        }

        if (tentType === undefined || e.target.brand.value === "null") {
            setError(true)
            return
        }

        const data = {
            userId: userID,
            category: "Tent",
            type: tentType,
            brand: e.target.brand.value,
            size: personQuantity,
            rating: e.target.rating.value,
            model: e.target.model.value.replace(/[^a-z0-9 .]/gi, '').replace(/\s+/g, ' '),
            weight: e.target.lbs.value + "." + e.target.oz.value,
            width: e.target.width.value,
            extraInfo: e.target.extraInfo.value,
            length: e.target.length.value,
            itemCondition: e.target.condition.value,
            lendable: e.target.lendable.value,
            quantity: quantity,
            additionalDetails: e.target.notes.value.replace(/[^a-z0-9 .]/gi, '').replace(/\s+/g, ' ')
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

            e.target.model.value = ""
            e.target.width.value = ""
            e.target.length.value = ""
            e.target.lendable.value = "false"
            e.target.lbs.value = 0
            e.target.oz.value = 0
            e.target.notes.value = ""
            e.target.condition.value = ""
            setQuantity(1)
            setPersonQuantity(2)
            setBackpacking(false)
            setCamping(false)

            setSuccess(true)
            return
        } else {
            setError(true)
            setSubmitting(false)
            return
        }
        
    }

    const tentBrandOptions = tentBrands.map(option => {
        return (
            <option key={option} value={option}>{option}</option>
        )
    })

    const setTentSelect = (pack:string) => {

        setBackpacking(false)
        setCamping(false)

        if (pack === "backpack") {
            setBackpacking(true)
        }
        if (pack === "camp") {
            setCamping(true)
        }
 
    }

    const personCount = (person: any) => {
        if (personQuantity >= 8 && person === "plus" || person === "minus" && personQuantity <= 1) {
            return
        }

        if (person === "plus") {
            setPersonQuantity(personQuantity + 1)
        } else if (person === "minus") {
            setPersonQuantity(personQuantity - 1)
        }
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

    const lbsOptions = () => {
        const maxLbs = 20
        let lbs = [];
        for (let i = 0; i <= maxLbs; i++) {
          lbs.push(<option key={i} value={i}>{i}</option>);
        }
        return lbs;
    }
    
    const ozOptions = () => {
        const maxOz = 16
        let oz = [];
        for (let i = 0; i <= maxOz; i++) {
          oz.push(<option key={i} value={i}>{i}</option>);
        }
        return oz;
    }

    const widthOptions = () => {
        const maxWidth = 240
        let width = []
        for (let i = 24; i <= maxWidth; i++) {
          width.push(<option key={i} value={i}>{i} in</option>)
        }
        return width
    }
    
    const lengthOptions = () => {
        const maxLength = 240
        let length = []
        for (let i = 24; i <= maxLength; i++) {
          length.push(<option key={i} value={i}>{i} in</option>)
        }
        return length
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
                    <h1 className="text-gray-200 text-medium font-light">Select Tent Type:</h1>
                    <p className="text-gray-200 text-xs font-light">Did you get this tent to put in a backpack?</p>
                </div>
                <div className="flex items-center gap-2 text-lg text-center font-normal p-2 hover:bg-gray-600 duration-200 rounded-md">
                    
                    <div className={ backpacking ? "p-1 bg-gray-400 rounded-md text-gray-900" :"p-1 text-gray-200"}>
                        <div 
                        className="hover:bg-emerald-500 p-1 rounded-md duration-200 cursor-pointer"
                        onClick={() => setTentSelect("backpack")}
                        >
                        <Image
                        src={packTent}
                        alt="Back Packing Tent"
                        className="w-auto h-20 mx-auto rounded-md"
                        />
                        </div>
                        <p>BackPaking</p>
                    </div>

                    <div className={ camping ? "p-1 bg-gray-400 rounded-md text-gray-900" :"p-1 text-gray-200"}>
                        <div className="hover:bg-emerald-500 p-1 rounded-md duration-200 cursor-pointer"
                        onClick={() => setTentSelect("camp")}
                        >
                        <Image
                        src={campTent}
                        alt="Camping Tent"
                        className="w-auto h-20 mx-auto rounded-md"
                        />
                        </div>
                        <p>Camping</p>
                    </div>
                </div>

                <div className="items-center p-2 hover:bg-gray-600 duration-200 rounded-md">
                    <h1 className="text-gray-200 font-light">{personQuantity} Person Tent:</h1>
                    <div className='text-gray-800 mt-1 flex gap-2 font-normal'>
                        <div>
                            <p className='p-1 bg-gray-400 rounded-md px-2 hover:bg-emerald-500 duration-300 cursor-pointer' onClick={() => personCount("minus")}>-</p>
                        </div>
                        <div className='p-1 bg-gray-200 rounded-md px-2'>
                            <p id='quantity'>{String(personQuantity)}</p>
                        </div>
                        <div >
                            <p className='p-1 bg-gray-400 rounded-md px-2 hover:bg-emerald-500 duration-300 cursor-pointer' onClick={() => personCount("plus")}>+</p>
                        </div>
                    </div>
                </div>

                <div className="sm:flex sm:space-x-2 items-center  p-2 hover:bg-gray-600 duration-200 rounded-md">
                    <h1 className="text-gray-200 font-light">Brand:</h1>
                    <div className='text-gray-800 mt-1'>
                        <select className='rounded-md mx-auto shadow-md p-1 bg-gray-200' defaultValue={"null"} id="brand">
                            <option value="null" disabled>select a brand</option>
                            {tentBrandOptions}
                        </select>
                    </div>
                </div>

                <div className="sm:flex sm:space-x-2 items-center  p-2 hover:bg-gray-600 duration-200 rounded-md">
                    <h1 className="text-gray-200 font-light">Tent Rating:</h1>
                    <div className='text-gray-800 mt-1'>
                        <select className='rounded-md mx-auto shadow-md p-1 bg-gray-200' id="rating">
                            <option value="3-Season">3-Season</option>
                            <option value="4-Season">4-Season</option>
                        </select>
                    </div>
                </div>

                <div className="sm:flex sm:space-x-2 items-center  p-2 hover:bg-gray-600 duration-200 rounded-md">
                    <h1 className="text-gray-200 font-light">Rainfly:</h1>
                    <div className='text-gray-800 mt-1'>
                        <select className='rounded-md mx-auto shadow-md p-1 bg-gray-200' id="extraInfo">
                            <option value="Includes Rainfly">Included</option>
                            <option value="Excludes Rainfly">Excludes</option>
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
                        placeholder="Tent Model"
                        name='model' 
                        onChange={handleCount}
                        minLength={3} maxLength={20} 
                    />
                    <p className="text-gray-200">{noteCount.model.length}/20</p>
                </div>

                <div className="items-center p-2 hover:bg-gray-600 duration-200 rounded-md">
                    <h1 className="text-gray-200 font-light">Tent Weight:</h1>
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

                <div className="items-center p-2 hover:bg-gray-600 duration-200 rounded-md">
                    <h1 className="text-gray-200 font-light">Tent Floor Dimensions(Inches):</h1>
                    <div className='text-gray-800 mt-1 flex'>
                        <div className="flex mr-2">
                        <h1 className="text-gray-200 font-light mr-2">Width:</h1>
                        <select className='rounded-md mx-auto shadow-md p-1 bg-gray-200' defaultValue={0} id="width">
                            <option value={"0"}>0 in</option>
                            {widthOptions()}
                        </select>
                        </div>
                        <div className="flex">
                        <h1 className="text-gray-200 font-light mr-2">Length:</h1>
                        <select className='rounded-md mx-auto shadow-md p-1 bg-gray-200' defaultValue={0} id="length">
                            <option value={"0"}>0 in</option>
                            {lengthOptions()}
                        </select>
                        </div>
                    </div>
                </div>

                <div className="sm:flex sm:space-x-2 items-center p-2 hover:bg-gray-600 duration-200 rounded-md">
                    <h1 className="text-gray-200 font-light">Tent Condition:</h1>
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

export default TentForm