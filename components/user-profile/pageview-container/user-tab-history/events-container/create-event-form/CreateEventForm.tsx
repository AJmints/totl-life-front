'use client'

import { useEffect, useState } from "react"
import EventDetailsForm from "./create-event-details/EventDetailsForm"
import EventGearRec from "./create-event-gear-rec/EventGearRec"
import EventFoodRec from "./create-event-food-rec/EventFoodRec"

const NPS: string | undefined = process.env.NEXT_PUBLIC_NPS_API_KEY

const CreateEventForm = () => {

    const [formNav, setFormNav] = useState<number>(1)

    const [filledIn, setFilledIn] = useState({
        eventDetails: false, // empty or full
        missingDetails: ""
    })
    const [eventDetails, setEventDetails] = useState<any>({
        eventName: "",
        isPrivate: "false",
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        parkState: "",
        campGround: {
            address: {},
            addressString: "",
            amenities: [],
            id: "",
            latitude: "",
            longitude: "",
            name: "",
            url: ""
        }, // API only work s with NPS, looking for state park campground API
        userDescription: ""
    })
    const [ gearRecList, setGearRecList ] = useState([]) /** <--  Set up in Data some premade list for quick creation **/

    useEffect(() => {

        canAdvance()
        
    }, [eventDetails])

    /* Change images that use public to use upload thing, if file is larger than 4kbs, don't use public */
    /* Change images that use public to use upload thing, if file is larger than 4kbs, don't use public */
    /* Change images that use public to use upload thing, if file is larger than 4kbs, don't use public */

    /** <--  Set up in Data some premade list for quick creation **/
    /** <--  Set up in Data some premade list for quick creation **/
    /** <--  Set up in Data some premade list for quick creation **/

    /* In user profile, Make river tab a feed relevant to the user. Then when someone clicks on a bale post, it sends user to URL and to River route */
    /* In user profile, Make river tab a feed relevant to the user. Then when someone clicks on a bale post, it sends user to URL and to River route */
    /* In user profile, Make river tab a feed relevant to the user. Then when someone clicks on a bale post, it sends user to URL and to River route */

    const canAdvance = () => {
        if (formNav === 1) {
            if (eventDetails.eventName !== "" && eventDetails.startDate !== "" && eventDetails.startTime !== "" && eventDetails.endDate !== "" && eventDetails.endTime !== "" && eventDetails.parkState !== "" && eventDetails.campGround.name !== "" && eventDetails.userDescription !== "") {
                if (eventDetails.campGround.address.manual === "manual" && eventDetails.campGround.address.name === "" && eventDetails.campGround.address.addressString === "") {
                    setFilledIn(prevTitleBody => {
                        return {
                            ...prevTitleBody,
                            eventDetails: false
                        }
                    })
                } else {
                    setFilledIn(prevTitleBody => {
                        return {
                            ...prevTitleBody,
                            eventDetails: true
                        }
                    })
                }
                
            }
        }
    }

    return (
        <div className="bg-gray-300 flex flex-col gap-2 p-2 rounded-md">
            {/* Change images that use public to use upload thing, if file is larger than 4kbs, don't use public */}
            <p>Create a context and remember to declare it in layout.tsx</p>

            <div className="p-2 rounded-md flex bg-gray-200">
                <h1 onClick={() => console.log(eventDetails)} className="font-light text-3xl">Create a new event</h1>
            </div>
            <div className={ !filledIn.eventDetails ? "hidden" : "bg-gray-400 rounded-md p-2 flex justify-around"}>
                {formNav !== 1 && <button onClick={() => setFormNav(prev => prev - 1)} className="border-gray-800 border-2 rounded-md shadow-md py-1 px-2">Back</button>}
                {formNav !== 5 && filledIn.eventDetails && <button onClick={() => setFormNav(prev => prev + 1)} className="border-gray-800 border-2 rounded-md shadow-md py-1 px-2">Next</button>}
            </div>

            { formNav === 1 && <EventDetailsForm eventDetails={eventDetails} setEventDetails={setEventDetails}/>}
            { formNav === 2 && <EventGearRec gearRecList={gearRecList} setGearRecList={setGearRecList}/>}
            { formNav === 3 && <EventFoodRec />}

            <div className="bg-gray-400 rounded-md p-2 flex justify-around">
                {formNav !== 1 && <button onClick={() => setFormNav(prev => prev - 1)} className="border-gray-800 border-2 rounded-md shadow-md py-1 px-2">Back</button>}
                {formNav !== 5 && filledIn.eventDetails ? 
                <button onClick={() => setFormNav(prev => prev + 1)} className="border-gray-800 border-2 rounded-md shadow-md py-1 px-2">Next</button> 
                : // && filledIn.eventDetails
                <div className="group">
                    <button className="border-gray-800 border-2 rounded-md shadow-md py-1 px-2">Next</button>
                    <div className="right-[10%] sm:right-[30%] sm:left-[25%] fixed bottom-[10%] top-[60%] sm:top-[40%] md:right-[40%] md:left-[40%] hidden group-hover:flex flex-col gap-1 bg-gray-300 p-2 max-h-64 rounded-md shadow-md shadow-gray-800/40  overflow-y-scroll scroll-track scroll-w scroll-handle">
                        <p className="bg-red-400 p-1 rounded-md">The following are missing:</p>
                        {eventDetails.eventName.length < 3 && <p>Event Name</p>}
                        {eventDetails.startDate === "" && <p>Start Date</p>}
                        {eventDetails.startTime === "" && <p>Start Time</p>}
                        {eventDetails.endDate === "" && <p>End Date</p>}
                        {eventDetails.endTime === "" && <p>End Time</p>}
                        {eventDetails.parkState === "" && <p>State</p>}
                        {
                            eventDetails.campGround.name === "manual" ?
                            <>
                            {eventDetails.manualParkName === "" ? <p>CampGround/Park Name</p> : <></>}
                            </>
                            :
                            <>
                            {eventDetails.campGround.name === "" ? <p>CampGround/Park Name</p> : <></>}
                            </>
                        }
                        {eventDetails.campGround.addressString === "" && <p>CampGround/Park Address</p>}
                        {eventDetails.userDescription.length < 3 && <p>Event Details</p>}
                    </div>
                </div>
                }
            </div>

            <p>Recommended Meals?</p>
            <br/><br/><br/>
            <p>Friends List</p>
        </div>
    )
}

export default CreateEventForm