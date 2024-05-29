'use client'

import sleepBagPic from '../../../../../../../../../public/icons/sleepingbag.png'
import sleepPadPic from '../../../../../../../../../public/icons/sleepingpad.png'
import { useState, useEffect } from "react"
import { useUserContext } from '@/app/context/UserContextProvider'
import Image from "next/image"

const URL: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL

export const token = async() => {
    const getToken: Response = await fetch("/api/headers")
    const status = await getToken.json().catch((err) => {
        console.log(err)
    })
    return status
}

const SleepingBagForm = () => {

    const [ submitting, setSubmitting ] = useState<boolean>(false)
    const [ sleepBag, setSleepBag ] = useState(false)
    const [ sleepPad, setSleepPad] = useState(false)
    const [ quantity, setQuantity ] = useState<number>(1)
    const [noteCount, setNoteCount] = useState({
        model: "",
        notes: ""
    })
    const [error, setError] = useState(false)
    const [ success, setSuccess ] = useState(false)
    const { userID, setUserGearList } = useUserContext()


    const handleSubmit = async(e: any) => {
        e.preventDefault()

        setError(false)
        setSubmitting(true)
        setSuccess(false)

        let sleepGearType

        if (sleepBag) {
            sleepGearType = "Sleeping Bag"
        }
        if (sleepPad) {
            sleepGearType = "Sleep Pad"
        }

        if (sleepGearType === undefined || e.target.brand.value === "null") {
            setError(true)
            return
        }

        const data = {
            userId: userID,
            category: "Tent",
            type: sleepGearType,
            brand: e.target.brand.value,
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

        console.log(data)
    }

    const setSleepItemSelect = (pack:string) => {

        setSleepBag(false)
        setSleepPad(false)

        if (pack === "sleepBag") {
            setSleepBag(true)
        }
        if (pack === "sleepPad") {
            setSleepPad(true)
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
        const maxLbs = 5
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
        <p>Set up Sleeping Bag form
            update java api
            update gear display card
            update gear inspector
        </p>

        <>
            <form onSubmit={handleSubmit}>
            {/* Title for post */}
            <div className="">

                <div className="pt-6 flex">
                    <h1 className="text-gray-200 text-xl px-1 font-medium border-b-[1px]">Required Info:</h1>
                </div>

                <div className="pt-2">
                    <h1 className="text-gray-200 text-medium font-light">Select Sleeping Gear Type:</h1>
                </div>
                <div className="flex items-center gap-2 text-lg text-center font-normal p-2 hover:bg-gray-600 duration-200 rounded-md">
                    
                    <div className={ sleepBag ? "p-1 bg-gray-400 rounded-md text-gray-900" :"p-1 text-gray-200"}>
                        <div 
                        className="hover:bg-emerald-500 p-1 rounded-md duration-200 cursor-pointer"
                        onClick={() => setSleepItemSelect("sleepBag")}
                        >
                        <Image
                        src={sleepBagPic}
                        alt="Sleeping Bag"
                        className="w-auto h-20 mx-auto rounded-md"
                        />
                        </div>
                        <p>Sleeping Bag</p>
                    </div>

                    <div className={ sleepPad ? "p-1 bg-gray-400 rounded-md text-gray-900" :"p-1 text-gray-200"}>
                        <div className="hover:bg-emerald-500 p-1 rounded-md duration-200 cursor-pointer"
                        onClick={() => setSleepItemSelect("sleepPad")}
                        >
                        <Image
                        src={sleepPadPic}
                        alt="Sleeping Pad"
                        className="w-auto h-20 mx-auto rounded-md"
                        />
                        </div>
                        <p>Sleep Pad</p>
                    </div>
                </div>

                <div className="sm:flex sm:space-x-2 items-center  p-2 hover:bg-gray-600 duration-200 rounded-md">
                    <h1 className="text-gray-200 font-light">Brand:</h1>
                    <div className='text-gray-800 mt-1'>
                        <select className='rounded-md mx-auto shadow-md p-1 bg-gray-200' defaultValue={"null"} id="brand">
                            <option value="null" disabled>select a brand</option>
                            {/* {tentBrandOptions} */}
                        </select>
                    </div>
                </div>

                { sleepBag ? <div className="sm:flex sm:space-x-2 items-center  p-2 hover:bg-gray-600 duration-200 rounded-md">
                    <h1 className="text-gray-200 font-light">Sleeping Bag Rating:</h1>
                    <div className='text-gray-800 mt-1'>
                        <select className='rounded-md mx-auto shadow-md p-1 bg-gray-200' id="rating">
                            <option value="liner">Liner</option>
                            <option value="50">50 degrees</option>
                            <option value="20">20 degrees</option>
                        </select>
                    </div>
                </div>
                :
                <div className="sm:flex sm:space-x-2 items-center  p-2 hover:bg-gray-600 duration-200 rounded-md">
                    <h1 className="text-gray-200 font-light">Pad Type:</h1>
                    <div className='text-gray-800 mt-1'>
                        <select className='rounded-md mx-auto shadow-md p-1 bg-gray-200' id="extraInfo">
                            <option value="Foam">Foam Pad</option>
                            <option value="Air">Air Pad</option>
                            <option value="Hybrid">Hybrid</option>
                        </select>
                    </div>
                </div>
                }

                

                <div className="pt-8 pb-2 flex">
                    <h1 className="text-gray-200 text-xl font-medium border-b-[1px]">Optional Info:</h1>
                </div>

                <div className=' p-2 hover:bg-gray-600 duration-200 rounded-md'>
                    <label className="text-gray-200 font-light mr-2" htmlFor='model'>Model:</label>
                    <input 
                        className="rounded-md font-normal pl-2 w-36" 
                        type='text' 
                        autoComplete='off' 
                        placeholder={sleepBag ? "Bag Model" : "Pad Model"}
                        name='model' 
                        onChange={handleCount}
                        minLength={3} maxLength={20} 
                    />
                    {/* <p className="text-gray-200">{noteCount.model.length}/20</p> */}
                </div>

                <div className="items-center p-2 hover:bg-gray-600 duration-200 rounded-md">
                    <h1 className="text-gray-200 font-light">{sleepBag ? "Sleeping Bag Weight:" : "Sleep Pad Weight:"}</h1>
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
                    <h1 className="text-gray-200 font-light">{sleepBag ? "Sleeping Bag Condition:" : "Sleep Pad Condition:"}</h1>
                    <div className='text-gray-800 '>
                        <select className='rounded-md mx-auto shadow-md p-1 bg-gray-200' defaultValue={"used"} id="condition">
                            <option value="used">Used-Good</option>
                            <option value="new">New</option>
                            <option value="poor">Used-Poor</option>
                            <option value="bad">Used-Last Legs</option>
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
        </>
    )
}

export default SleepingBagForm