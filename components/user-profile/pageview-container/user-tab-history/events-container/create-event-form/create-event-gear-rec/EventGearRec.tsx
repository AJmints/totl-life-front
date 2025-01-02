'use client'

import gearRecSelect from '@/lib/data/gear-pack-images/gearPackImageData'
import SelectRecGearList from './select-rec-gear/SelectRecGearList'
import { useState } from 'react'
import Image from 'next/image'

const EventGearRec = (props: any) => {

    const [ absoulteView, setAbsoluteView ] = useState<boolean>(false)

    const gearSelect = gearRecSelect.map(item => {
        return (
            <div key={item.id} className='flex flex-col gap-2 bg-gray-400 p-2 rounded-md'>
                <SelectRecGearList 
                    item={item}
                    setGearRecList={props.setGearRecList}
                    gearRecList={props.gearRecList}
                />
            </div>
        )
    })

    const remove = (item: any) => {
        // props.setGearRecList((prevState: any) => [...prevState, ""])
        props.setGearRecList(props.gearRecList.filter((removeTarget : any) => {
            return removeTarget !== item
        }))
    }

    const viewGear = props.gearRecList.map((item:any) => {
        return (
            <div key={item.id} className='bg-gray-400 rounded-md p-1 flex sm:flex-row flex-col justify-around gap-1 items-center'>
                <div className=''>
                    <Image
                    src={item.img}
                    alt={""}
                    width={100}
                    height={100}
                    className='rounded-md h-12 sm:h-auto w-auto'
                    />
                </div>
                <div className='flex flex-col gap-2 text-sm'>
                    <div className='bg-gray-300 p-2 rounded-md'>
                        <p>Category: {item.category}</p>
                        <p>Type: {item.gearType}</p>
                        <p>{item.count} per {item.groupType}</p>
                    </div>
                    <div className='flex justify-end'>
                        <button onClick={() => remove(item)} className='bg-yellow-500/90 px-2 rounded-md'>Remove</button>
                    </div>
                </div>
                
            </div>
        )
    })

    const handleClearList = (action: string) => {

        if (action === "close") {
            setAbsoluteView(false)
        } else if (action === "clear") {
            props.setGearRecList([])
        }
    }

    return (
        <div className="bg-gray-400 p-2 rounded-md flex flex-col gap-2">
            <div className='bg-gray-300 p-2 rounded-md'>
                <h1 className='text-2xl'>Create Gear Recommendation List</h1>
                <h1 className='text-sm'>Select all Items and quantity needed per person</h1>
            </div>

            {
                absoulteView ? 
                <div className='fixed h-full w-screen bg-gray-800/60 right-0 top-0'>
                    <div className='p-2 bg-gray-400 rounded-md fixed top-[7%] bottom-[7%] left-[7%] right-[7%] sm:top-[20%] sm:bottom-[20%] sm:left-[20%] sm:right-[20%]'>
                        <div className='p-2 bg-gray-200 rounded-md absolute top-2 bottom-2 left-2 right-2'>
                            <div className='flex flex-col gap-2 h-[100%]'>
                                <div className='bg-gray-500 items-center flex justify-center text-gray-50 p-2 rounded-md h-[15%]'>
                                    <h1 className='text-xl sm:text-3xl'>Items in your Recommendation List</h1>
                                </div>
                                <div className='h-[10%] flex bg-gray-400 justify-around p-1 rounded-md'>
                                    <button onClick={() => handleClearList("clear")} className='bg-gray-300 px-2 py-1 rounded-md'>Clear List</button>
                                    <button onClick={() => handleClearList("close")} className='bg-gray-300 px-2 py-1 rounded-md'>Close</button>
                                </div>
                                <div className='p-2 h-[75%] bg-gray-500 rounded-md  overflow-y-scroll scroll-track scroll-w scroll-handle'>
                                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
                                        {viewGear}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className='fixed right-2 top-32'>
                    <button onClick={() => setAbsoluteView(prev => !prev)} className='bg-yellow-500/70 p-2 text-xs rounded-md w-24 animate-bounce'>View Added Items</button>
                </div>
            }

            <div className='bg-gray-200 p-2 rounded-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 '>
                {gearSelect}
            </div>

            <div className='bg-gray-300 p-2 rounded-md flex flex-col gap-2'>
                <div className='flex gap-2 items-center'>
                    <button onClick={() => setAbsoluteView(prev => !prev)} className='bg-gray-400 hover:bg-yellow-400 shadow-md duration-200 p-2 mx-auto rounded-md'>View Added Items</button>
                </div>
            </div>
        </div>
    )
}

export default EventGearRec