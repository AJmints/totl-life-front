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

const CreatePackForm = () => {

    const [ submitting, setSubmitting ] = useState(false)
    const [ checked, setChecked ] = useState(false)
    const [ selectedItems, setSelectedItems ] = useState<any[]>([])
    const [ error, setError ] = useState(false)
    const [noteCount, setNoteCount] = useState({
        model: "",
        notes: ""
    })

    const { userGearList, packImages, userID } = useUserContext()

    const handleSubmit = async(e:any) => {
        e.preventDefault()

        setSubmitting(true)

        setTimeout(() => {
            setSubmitting(false)
        }, 2000)

        const data = {
            userID: userID,
            specificGearItems: selectedItems,
            configType: e.target.brand.value,
            packNotes: e.target.notes.value.replace(/[^a-z0-9 .]/gi, '').replace(/\s+/g, ' '),
            packName: e.target.packName.value.replace(/[^a-z0-9 .]/gi, '').replace(/\s+/g, ' '),
            hiddenPack: false
        }

        console.log(data)
        setError(true)

        return


        

        console.log(data)

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
        console.log(response)
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

    const getPackConfigData = async() => {
        const createPack = await fetch(URL + "/backpack/get-user-pack-configs/" + userID)
        const response = await createPack.json().catch((err) => {
            console.log(err)
        })
        console.log(response)
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

            {/* <div>
                <p className="text-gray-200">Pack Configuration under construction</p> */}
                {/* <button onClick={() => handleSubmit()}>Testing</button> */}
                {/* <button onClick={() => getPackConfigData()}>GetDetails</button> */}
            {/* </div> */}

            <form onSubmit={handleSubmit}>
            {/* Title for post */}
            <div className="">

                {/* <div className="pt-6 pb-2 flex">
                    <h1 className="text-gray-200 text-xl px-1 font-medium border-b-[1px]">Create New Pack Configuration:</h1>
                </div> */}

                {/* <div className="pt-2">
                    <h1 className="text-gray-200 text-medium font-light">Create New Pack Configuration:</h1>
                </div> */}

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
                        <p className="text-gray-200 font-light text-xs mt-2">{noteCount.model.length}/20</p>
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
                        <p className="text-gray-200 font-light text-xs mt-2">{noteCount.notes.length}/100</p>
                    </div> 

                    <div className="sm:flex sm:space-x-2 items-center p-2 mb-2 hover:bg-gray-600 duration-200 rounded-md">
                        <h1 className="text-gray-200 font-light">Pack Type:</h1>
                        <div className='text-gray-800 mt-1'>
                            <select className='rounded-md mx-auto shadow-md p-1 bg-gray-200' defaultValue={"null"} id="brand">
                                <option value="null" disabled>Select Type</option>
                                {typeOptions}
                            </select>
                        </div>
                    </div>
                </div>

                {/* <div className="flex items-center gap-2 text-lg text-center font-normal p-2 hover:bg-gray-600 duration-200 rounded-md"> */}

                    {/* Use this section to display user gear */}

                    {/* <div className={ back ? "p-1 bg-gray-400 rounded-md text-gray-900" :"p-1 text-gray-200"}>
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
                    </div> */}

                    <div className="mb-2 flex">
                        <h1 className="text-gray-200 font-light text-xl border-b-[1px]">Select the gear for this pack configuration:</h1>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-1 sm:gap-2 mb-2">
                        {gearListDisplay}
                    </div>

                {/* </div> */}

                
                {error && <p className="mb-2 text-emerald-500/90 font-normal text-lg">Thank you for testing Create New Pack section. Check your console to see what you selected.</p>}
                {/* {error && <p className="mb-2 text-red-500/90 font-normal text-lg">Make sure you have selected all required information.</p>}
                {success && <p className="mb-2 text-emerald-500 font-normal text-lg">Item successfully added!</p>} */}

                <div className="my-4">
                { submitting ?
                    <div className='flex'>
                        <p className="px-4 py-2 font-normal text-left text-gray-800 bg-emerald-700 duration-300 rounded-md">Creating...</p>
                    </div>
                    :
                    <>
                        {/* <p onClick={() => console.log(selectedItems)}>check</p> */}
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