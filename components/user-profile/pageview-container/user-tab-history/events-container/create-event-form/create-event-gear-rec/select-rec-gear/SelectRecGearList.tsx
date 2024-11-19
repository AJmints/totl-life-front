'use client'

import Image from "next/image"
import { useState } from "react"
import { arrayBuffer } from "stream/consumers"

const SelectRecGearList = (props: any) => {

    const item = props.item

    const [ itemCount, setItemCount ] = useState<number>(0)
    const [ personOrGroup, setPersonOrGroup ] = useState<"person" | "group">("person")
    const [ gear, setGear ] = useState<string>(item.category + " - General")
    const [ error, setError ] = useState<string>("")
    const [ isAdded, setIsAdded ] = useState<boolean>(false)

    const gearDropDown = item.dropDown.map((item:any) => {
        return (
            <option key={item} value={item}>{item}</option>
        )
    })

    const handleItemCount = (action: string) => {
        if (itemCount >= 0  && action === "add") {
            setItemCount(prev => prev + 1)
            return
        } else if (itemCount <= 0 && action === "minus") {
            return
        } else {
            setItemCount(prev => prev - 1)
        }
    }

    const handleSelected = (event: any) => {
        event.preventDefault()
        setGear(event.target.value)
        event.target.value = "null"
    }

    const handleAdd = () => {
        if (gear !== null &&  itemCount !== 0) {
            setItemCount(0)
            setPersonOrGroup("person")
            setGear(item.category + " - General")
            setError("")
            setIsAdded(true)
            setTimeout(() => {
                setIsAdded(false)
            }, 3500)
            props.setGearRecList([...props.gearRecList, {
                id: item.id,
                img: item.img,
                category: item.category,
                groupType: personOrGroup,
                count: itemCount,
                gearType: gear
            }])
        } else {
            setError("Item not added : Gear or Quantity not set")
            setTimeout(() => {
                setError("")
            }, 3500)
            
        }

    }

    return (
        <>
            <div className='flex justify-between rounded-md p-1 '>
                <Image 
                src={item.img}
                alt=''
                width={80}
                height={80}
                className='rounded-md h-20 w-auto'
                />
                {
                    // TODO: Make a display showing how many items of this category are included so far
                }
            </div>

            <div className="">
                <p className="text-2xl bg-gray-500 py-1 px-2 rounded-md text-gray-50">{item.category}</p>    
            </div>
            
            <div className='flex flex-col justify-between gap-2'>
                <div className="flex flex-col gap-1 justify-between">
                    <select className='rounded-md shadow-md p-1 bg-gray-200' onInput={() => handleSelected(event)} defaultValue={"null"} id="gearSpecific">
                        <option value="null" disabled>Change Gear Choice</option>
                        <option key={item.category} value={item.category + " - General"}>{item.category + " - General"}</option>
                        {gearDropDown}
                    </select>
                    <div className="bg-gray-100 p-1 rounded-md">
                        <p className="text-lg">Gear Choice:</p>
                        <p className="text-sm">{gear}</p>
                    </div>
                </div>
                
                <div className="flex flex-col gap-1 justify-between">
                    <div className="bg-gray-300 p-1 rounded-md flex gap-2">
                        <button onClick={() => setPersonOrGroup("person")} className={"p-1 rounded-md duration-200" + (personOrGroup === "person" ? " bg-emerald-500" : " bg-gray-200")}>Per Person</button>
                        <button onClick={() => setPersonOrGroup("group")} className={"p-1 rounded-md duration-200" + (personOrGroup === "group" ? " bg-emerald-500" : " bg-gray-200")}>Per Group</button>
                    </div>
                    <div className="flex justify-between bg-gray-500 text-gray-50 p-2 rounded-md">
                        <div className="">
                            <p>Quantity:</p>
                            <div className="flex justify-around items-center text-gray-800">
                                <button onClick={() => handleItemCount("minus")} className="bg-gray-300 px-2 rounded-md text-xl">-</button>
                                <button onClick={() => handleItemCount("add")} className="bg-gray-300 px-2 rounded-md text-xl">+</button>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between">
                            <div></div>
                            <p className="text-2xl">x{itemCount}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end gap-2">
                {isAdded ? <p className="bg-emerald-500 p-2 items-center rounded-md duration-200">Item Added</p> : <></>}
                {error !== "" ? <p className="text-gray-100 text-xs bg-red-600 p-2 items-center rounded-md">{error}</p> : <></>}
                <button onClick={() => handleAdd()} className="bg-yellow-400 hover:bg-emerald-400 p-2 rounded-md">Add</button>
            </div>
        </>
    )
}

export default SelectRecGearList