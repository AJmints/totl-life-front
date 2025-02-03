'use client'

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { token } from "@/lib/constants/getToken"
import { useUserContext } from "@/app/context/UserContextProvider"
import EventDetailsForm from "./create-event-details/EventDetailsForm"
import EventGearRec from "./create-event-gear-rec/EventGearRec"
import EventFoodRec from "./create-event-food-rec/EventFoodRec"
import EventReview from "./create-event-review/EventReview"
import {URL} from "@/lib/globalConstants"
import { moList } from "@/lib/data/user-event-form/eventFormMOList"

const NPS: string | undefined = process.env.NEXT_PUBLIC_NPS_API_KEY

const CreateEventForm = () => {

    const [formNav, setFormNav] = useState<number>(1)

    const [filledIn, setFilledIn] = useState({
        eventDetails: false, // empty or full
        missingDetails: "",
        gearRecList: false,
        mealPlan: false
    })
    const [eventDetails, setEventDetails] = useState<any>({
        eventName: "",
        isPrivate: "false",
        startDate: "",
        startTime: "",
        eventStart: undefined,
        endDate: "",
        endTime: "",
        eventEnd: undefined,
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
    const [ mealPlan, setMealPlan ] = useState([])
    const [ friends, setFriends] = useState([]) 
    const [ submit, setSubmit ] = useState<boolean>(false)
    const [ validTime, setValidTime ] = useState<boolean>(false)

    const pathname = usePathname()
    const friendName = pathname?.split("/user/").pop()
    const { userFriendList, setUserFriendList } = useUserContext()

    useEffect(() => {

        const getFriendsLists = async(string: string) => {
            const list = await fetch( URL + "/social/user-friend-list/" + friendName +"/" + string , {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "Bearer " + await token()
                }
            })
            const response = await list.json().catch((err) => {
                console.log(err.message)
            })
            setUserFriendList(response.friendList)
        }
        if (userFriendList.length === 0) {
            getFriendsLists("1")
        }
        canAdvance()
    }, [eventDetails])

    const createEvent = async() => {
        const eventForm = {
            eventDetails,
            gearRecList,
            mealPlan,
            friends
        }
        
        const createPack = await fetch(URL + "/campevent/createEvent", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "auth-token": "Bearer " + await token()
            },
            body: JSON.stringify(eventForm)
        })
        const response = await createPack.json().catch((err) => {
            console.log(err)
        })
        console.log("Submit data, all data and checks look to be good.")
        console.log(response)
    }

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

        if (eventDetails.startDate !== "" && eventDetails.startTime !== "" && eventDetails.endDate !== "" && eventDetails.endTime !== "") {

            let start = new Date(eventDetails.startDate + "T" + eventDetails.startTime)
            let end = new Date(eventDetails.endDate + "T" + eventDetails.endTime)

            if (eventDetails.eventStart === undefined && eventDetails.eventEnd === undefined) {
                setEventDetails((prevDetails: any) => {
                    return {
                        ...prevDetails,
                        eventStart: start,
                        eventEnd: end
                    }
                })
            } else if (start.toString() !== eventDetails.eventStart.toString()) {
                setEventDetails((prevDetails: any) => {
                    return {
                        ...prevDetails,
                        eventStart: start
                    }
                })
            } else if (end.toString() !== eventDetails.eventEnd.toString()) {
                setEventDetails((prevDetails: any) => {
                    return {
                        ...prevDetails,
                        eventEnd: end
                    }
                })
            }
            
            if (end > start) {
                setValidTime(true)
            } else {
                setValidTime(false)
            }
        }

        if (formNav === 1) {
            if (eventDetails.eventName !== "" && eventDetails.startDate !== "" && eventDetails.startTime !== "" && eventDetails.endDate !== "" && eventDetails.endTime !== "" && eventDetails.parkState !== "" && eventDetails.campGround.name !== "" && eventDetails.userDescription !== "" && validTime) {
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
                
            } else {
                setFilledIn(prevTitleBody => {
                    return {
                        ...prevTitleBody,
                        eventDetails: false
                    }
                })
            }
        } else if (formNav === 2) {
            if (eventDetails.gearRecList.length > 1) {
                setFilledIn(prevTitleBody => {
                    return {
                        ...prevTitleBody,
                        gearRecList: true
                    }
                })
            } else if (eventDetails.gearRecList.length === 0) {
                setFilledIn(prevTitleBody => {
                    return {
                        ...prevTitleBody,
                        gearRecList: false
                    }
                })
            }
            
        }
    }

    return (
        <div className="bg-gray-300 flex flex-col gap-2 p-2 rounded-md">
            {/* Change images that use public to use upload thing, if file is larger than 4kbs, don't use public */}

            <div className="p-2 rounded-md flex bg-gray-100">
                <h1 className="font-light text-3xl">Create a new event</h1>
            </div>
            <div className={ !filledIn.eventDetails ? "hidden" : "bg-gray-400 rounded-md p-2 flex justify-around"}>
                {formNav !== 1 && <button onClick={() => setFormNav(prev => prev - 1)} className="border-gray-800 border-2 rounded-md shadow-md py-1 px-2">Back</button>}
                {formNav !== 4 && filledIn.eventDetails && <button onClick={() => setFormNav(prev => prev + 1)} className="border-gray-800 border-2 rounded-md shadow-md py-1 px-2">Next</button>}
            </div>

            { formNav === 1 && <EventDetailsForm eventDetails={eventDetails} setEventDetails={setEventDetails}/>}
            { formNav === 2 && <EventGearRec gearRecList={gearRecList} setGearRecList={setGearRecList}/>}
            { formNav === 3 && <EventFoodRec eventDetails={eventDetails} mealPlan={mealPlan} setMealPlan={setMealPlan}/>}
            { formNav === 4 && <EventReview eventDetails={eventDetails} gearRecList={gearRecList} mealPlan={mealPlan} friends={friends} setFriends={setFriends} submit={submit}/>}

            <div className="bg-gray-400 rounded-md p-2 flex justify-around">
                {formNav !== 1 && <button onClick={() => setFormNav(prev => prev - 1)} className="border-gray-800 border-2 rounded-md shadow-md py-1 px-2">Back</button>}
                {
                formNav === 4 ?  
                    <button onClick={() => createEvent()} className="border-gray-800 border-2 rounded-md shadow-md py-1 px-2">Create Event</button>
                : 
                    filledIn.eventDetails ?
                        <button onClick={() => setFormNav(prev => prev + 1)} className="border-gray-800 border-2 rounded-md shadow-md py-1 px-2">Next</button> 
                    :
                        <div>
                        <div className="group">
                            <button className="border-gray-800 border-2 rounded-md shadow-md py-1 px-2">Next</button>
                            <div className="right-[10%] sm:right-[30%] sm:left-[25%] fixed bottom-[10%] top-[60%] sm:top-[70%] md:right-[40%] md:left-[40%] hidden group-hover:flex flex-col gap-1 bg-gray-300 p-2 max-h-64 rounded-md shadow-md shadow-gray-800/40 overflow-y-scroll scroll-track scroll-w scroll-handle">
                                <p className="bg-red-400 p-1 rounded-md">The following are missing:</p>
                                {eventDetails.eventName.length < 3 && <p>Event Name</p>}
                                {eventDetails.startDate === "" && <p>Start Date</p>}
                                {eventDetails.startTime === "" && <p>Start Time</p>}
                                {eventDetails.endDate === "" && <p>End Date</p>}
                                {eventDetails.endTime === "" && <p>End Time</p>}
                                {!validTime && <p>Valid Start/End Time</p>}
                                {eventDetails.parkState === "" && <p>State</p>}
                                {
                                    eventDetails.campGround.address.manual !== "manual" &&
                                    <>
                                    {eventDetails.campGround.name === "" ? <p>CampGround/Park Name</p> : <></>}
                                    </>
                                }
                                {eventDetails.campGround.addressString === "" && <p>CampGround/Park Address</p>}
                                {eventDetails.userDescription.length < 3 && <p>Event Details</p>}
                            </div>
                        </div>
                </div>
                }
            </div>
        </div>
    )
}

export default CreateEventForm