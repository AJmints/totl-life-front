'use client'

import { useEffect, useState } from "react"
import EventDetailsForm from "./create-event-details/EventDetailsForm"
import EventGearRec from "./create-event-gear-rec/EventGearRec"

const NPS: string | undefined = process.env.NEXT_PUBLIC_NPS_API_KEY

const CreateEventForm = () => {

    const [formNav, setFormNav] = useState<number>(1)

    const [eventDetails, setEventDetails] = useState({
        eventName: "",
        privateEvent: false,
        parkName: "", // User input
        campGround: "", // API only work s with NPS, looking for state park campground API
        quickNotes: "",
        userDescritpion: ""
    })
    const [ gearRecList, setGearRecList ] = useState([])

    useEffect(() => {
        const listCheck = async() => {
            const getOtherUserDetails = await fetch("https://developer.nps.gov/api/v1/campgrounds?stateCode=MO", { // https://www.nps.gov/subjects/developer/api-documentation.htm#/ 
                // 
                method: 'GET',
                headers: {
                    "X-Api-Key": NPS!
                }
            })
            const response = await getOtherUserDetails.json().catch((err) => {
                console.log(err)
            })
            console.log(response)
        }
        // listCheck()
        
    }, [])

    return (
        <div className="bg-gray-300 flex flex-col gap-2 p-2 rounded-md">
            {/* Change images that use public to use upload thing, if file is larger than 4kbs, don't use public */}
            <p>Create a context and remember to declare it in layout.tsx</p>

            <div className="p-2 rounded-md flex bg-gray-200">
                <h1 className="font-light text-3xl">Create a new event</h1>
            </div>
            <div className="bg-gray-400 rounded-md p-2 flex justify-around">
                {formNav !== 1 && <button onClick={() => setFormNav(prev => prev - 1)} className="border-gray-800 border-2 rounded-md shadow-md py-1 px-2">Back</button>}
                {formNav !== 4 && <button onClick={() => setFormNav(prev => prev + 1)} className="border-gray-800 border-2 rounded-md shadow-md py-1 px-2">Next</button>}
            </div>

            { formNav === 1 && <EventDetailsForm setEventDetails={setEventDetails}/>}
            { formNav === 2 && <EventGearRec gearRecList={gearRecList} setGearRecList={setGearRecList}/>}

            <div className="bg-gray-400 rounded-md p-2 flex justify-around">
                {formNav !== 1 && <button onClick={() => setFormNav(prev => prev - 1)} className="border-gray-800 border-2 rounded-md shadow-md py-1 px-2">Back</button>}
                {formNav !== 4 && <button onClick={() => setFormNav(prev => prev + 1)} className="border-gray-800 border-2 rounded-md shadow-md py-1 px-2">Next</button>}
            </div>

            <p>Recommended Meals?</p>
            <br/><br/><br/>
            <p>Friends List</p>
        </div>
    )
}

export default CreateEventForm