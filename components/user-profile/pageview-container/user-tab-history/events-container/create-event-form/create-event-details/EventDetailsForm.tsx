import { useState } from "react"

const EventDetailsForm = (props: any) => {

    const [noteCount, setNoteCount] = useState({
        eventName: "",
        details: ""
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
        <>
        <div className="p-1 w-full rounded-md flex flex-col gap-2 bg-gray-400">

            <div className=' p-2 hover:bg-gray-600 duration-200 rounded-md flex flex-col gap-4'>
                <label className="text-gray-100 font-light text-xl" htmlFor='eventName'>Event Name:</label>
                <div className="flex gap-4">
                    <input 
                        className="rounded-md font-normal pl-2 w-80" 
                        type='text' 
                        autoComplete='off' 
                        placeholder="Name your event"
                        name='eventName' 
                        onChange={handleCount}
                        minLength={3} maxLength={35} 
                    />
                    <p className="text-gray-200">{noteCount.eventName.length}/35</p>
                </div>
            </div>

            <div className="sm:flex sm:space-x-2 items-center p-2 hover:bg-gray-600 duration-200 rounded-md">
                <h1 className="text-gray-100 font-light">Public or Private Event:</h1>
                <div className='text-gray-800 '>
                    <select className='rounded-md mx-auto shadow-md p-1 bg-gray-200' defaultValue={"isPrivate"} id="isPrivate">
                        <option value="ture">Private</option>
                        <option value="false">Public</option>
                    </select>
                </div>
            </div>

            <div className=' p-2 hover:bg-gray-600 duration-200 rounded-md flex flex-col gap-4'>
                <label className="text-gray-100 font-light text-xl" htmlFor='eventName'>Date Range:</label>
                <div className="flex gap-4">
                    <input 
                        className="rounded-md font-normal pl-2 w-40" 
                        type='text' 
                        autoComplete='off' 
                        placeholder="mm/dd/yyyy"
                        name='eventName' 
                        onChange={handleCount}
                        minLength={3} maxLength={35} 
                    />
                    <input 
                        className="rounded-md font-normal pl-2 w-40" 
                        type='text' 
                        autoComplete='off' 
                        placeholder="End"
                        name='eventName' 
                        onChange={handleCount}
                        minLength={3} maxLength={35} 
                    />
                </div>
            </div>

            <div className=' p-2 hover:bg-gray-600 duration-200 rounded-md flex flex-col gap-4'>
                <label className="text-gray-100 font-light text-xl" htmlFor='eventName'>CampGround/Park Name:</label>
                <div className="flex gap-4">
                    <input 
                        className="rounded-md font-normal pl-2 w-80" 
                        type='text' 
                        autoComplete='off' 
                        placeholder="Name your event"
                        name='eventName' 
                        onChange={handleCount}
                        minLength={3} maxLength={35} 
                    />
                    <p className="text-gray-200">{noteCount.eventName.length}/35</p>
                </div>
            </div>

            <div className='flex flex-col p-2 hover:bg-gray-600 duration-200 rounded-md'>
                <label className="text-gray-100 text-xl font-light" htmlFor='details'>Event Details:</label>
                <div className="flex gap-4">
                <textarea 
                    className="rounded-md font-normal w-[40rem] p-1 px-2"
                    rows={3} 
                    placeholder="Anything about this item you wish to note?"
                    name='details'
                    minLength={3} maxLength={1000}
                    onChange={handleCount}
                />
                <p className="text-gray-200">{noteCount.details.length}/1000</p>
                </div>
            </div>

        </div>
        </>
    )
}

export default EventDetailsForm