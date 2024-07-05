'use client'

import { useUserContext } from "@/app/context/UserContextProvider"
import { useState } from "react"
import GearItemCard from "../../back-pack-viewer/gear-item-card/GearItemCard"

const URL: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL

export const token = async() => {
    const getToken: Response = await fetch("/api/headers")
    const status = await getToken.json().catch((err) => {
        console.log(err)
    })
    return status
}

const CreatePackForm = (props: any) => {

    const [ submitting, setSubmitting ] = useState(false)
    const [ checked, setChecked ] = useState(false)
    const [ selectedItems, setSelectedItems ] = useState<any[]>([])
    const [ error, setError ] = useState(false)
    const [ success, setSuccess ] = useState(false)
    const [noteCount, setNoteCount] = useState({
        packName: "",
        notes: ""
    })

    const { userGearList, packImages, userID, setUserPackConfigs } = useUserContext()

    const handleSubmit = async(e:any) => {
        e.preventDefault()

        setSubmitting(true)
        setError(false)

        if (selectedItems.length <= 0 || e.target.packName.value === "" || e.target.type.value === "null") {
            setError(true)
            setSubmitting(false)
            return
        }

        const data = {
            userID: userID,
            specificGearItems: selectedItems,
            configType: e.target.type.value,
            packNotes: e.target.notes.value.replace(/[^a-z0-9 .]/gi, '').replace(/\s+/g, ' '),
            packName: e.target.packName.value.replace(/[^a-z0-9 .]/gi, '').replace(/\s+/g, ' '),
            hiddenPack: false
        }

        const createPack = await fetch(URL + "/backpack/create-pack-config", {
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
            setSuccess(true)
            setError(false)
            setUserPackConfigs((prev: any) => [...prev, response.newPack])
            e.target.notes.value = ""
            e.target.packName.value = ""
            setTimeout(() => {
                props.setPackCreate(false)
                props.setStandard(true)
            }, 2500)
        } else {
            setError(true)
            setSubmitting(false)
        }
        
    }

    const gearListDisplay = userGearList.map((item:any) => {

        const img = packImages.filter(gearVisuals => gearVisuals.category === item.gearItem.category && gearVisuals.type === item.gearItem.type).pop()
        
        return (
            <div className="mx-auto cursor-pointer" onClick={() => addedItems(item.id) } key={item.id}> 
                <GearItemCard 
                gearDetails={item}
                image={img}
                checked={checked}
                setChecked={setChecked}
                />
            </div>
        )
    })

    const addedItems = (id : string) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(item => item !== id))
        } else {
            setSelectedItems(prev => [...prev, id])
        }
    }

    const packTypeOptions = ["Car Camping", "Day Hike", "Back Packing", "Float Trip"]
    const typeOptions = packTypeOptions.map(option => {
        return (
            <option key={option} value={option}>{option}</option>
        )
    })

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
        <div className='bg-gray-600/90 p-2 rounded-md mt-2'>

            <div className="">
                <h1 className="text-gray-200 text-2xl mb-2 border-b-[1px]">Create a New Pack Configuration:</h1>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="">

                    <div>
                        <div className=' p-2 hover:bg-gray-600 duration-200 rounded-md'>
                            <label className="text-gray-200 font-light mr-2" htmlFor='packName'>Pack Name:</label>
                            <input 
                                className="rounded-md font-normal pl-3 w-60" 
                                type='text' 
                                autoComplete='off' 
                                placeholder="Name for your pack"
                                name='packName' 
                                onChange={handleCount}
                                minLength={3} maxLength={20} 
                            />
                            <p className="text-gray-200 font-light text-xs mt-2">Required : {noteCount.packName.length}/20</p>
                        </div>

                        <div className='w-full flex flex-col p-2 hover:bg-gray-600 duration-200 rounded-md mb-2'>
                            <label className="text-gray-200 font-light" htmlFor='notes'>Additional Notes:</label>
                            <textarea 
                                className="rounded-md font-normal w-72"
                                rows={2} 
                                placeholder="Add a description about your pack?"
                                name='notes'
                                minLength={3} maxLength={100}
                                onChange={handleCount}
                            />
                            <p className="text-gray-200 font-light text-xs mt-2">Optional : {noteCount.notes.length}/100</p>
                        </div> 

                        <div className="sm:flex sm:space-x-2 items-center p-2 mb-2 hover:bg-gray-600 duration-200 rounded-md">
                            <h1 className="text-gray-200 font-light">Pack Type:</h1>
                            <div className='text-gray-800 mt-1'>
                                <select className='rounded-md mx-auto shadow-md p-1 bg-gray-200' defaultValue={"null"} id="type">
                                    <option value="null" disabled>Select Type</option>
                                    {typeOptions}
                                </select>
                            </div>
                            <p className="text-gray-200 font-light text-xs mt-2">Required</p>
                        </div>
                    </div>

                    <div className="flex">
                        <h1 className="text-gray-200 font-light text-xl border-b-[1px]">Select the gear for this pack configuration:</h1>
                        
                    </div>
                    <div className="flex text-gray-100">
                    <p className={selectedItems.length > 0 ? "bg-emerald-500/70 p-1 rounded-md font-light text-xs my-2" : "bg-red-500/70 p-1 rounded-md font-light text-xs my-2" }>Required 1 item minimum - You have {selectedItems.length} items selected</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-1 sm:gap-2 mb-2">
                        {gearListDisplay}
                    </div>

                    
                    {/* {error && <p className="mb-2 text-emerald-500/90 font-normal text-lg">Thank you for testing Create New Pack section. Check your console to see what you selected.</p>} */}
                    {error && <p className="mb-2 text-red-500/90 font-normal text-lg">Make sure you have selected all required information.</p>}
                    {success && <p className="mb-2 text-emerald-500 font-normal text-lg">Pack successfully added! Redirecting...</p>}

                    <div className="my-4">
                    { submitting ?
                        <div className='flex'>
                            <p className="px-4 py-2 font-normal text-left text-gray-800 bg-emerald-700 duration-300 rounded-md">Creating...</p>
                        </div>
                        :
                        <>
                            <button className="px-4 py-2 font-normal hover:text-gray-800 hover:bg-emerald-600 duration-300 bg-gray-400 rounded-md">Create Pack</button>
                        </>
                    }
                    </div>
                </div>
            </form>



        </div>
    )
}

export default CreatePackForm