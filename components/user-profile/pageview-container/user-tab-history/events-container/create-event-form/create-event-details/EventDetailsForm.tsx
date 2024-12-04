import { useState, useEffect } from "react"
import { stateCodeList } from "@/lib/helpers/form-helpers/formFunctionHelpers"

const NPS: string | undefined = process.env.NEXT_PUBLIC_NPS_API_KEY

const EventDetailsForm = (props: any) => {

    const currentDate = new Date()
    const currentDateStr = currentDate.getFullYear() + "-" + currentDate.getMonth() + "-" + currentDate.getDate()
    const stateList = stateCodeList()

    const [noteCount, setNoteCount] = useState({
        eventName: "",
        userDescription: "",
        addressNotFound: "", 
        manualAddress: "",
        manualParkName: ""
    })
    const [ parkList, setParkList] = useState<any>([])
    const [ manualAddress, setManualAddress] = useState<boolean>(false)
    const [campGroundValue, setCampGroundValue] = useState<any>({
        address: {},
        addressString: "",
        amenities: [],
        id: "",
        latitude: "",
        longitude: "",
        name: "",
        url: ""
    })

    useEffect(() => {
        if (props.eventDetails.campGround.address.manual === "manual" && props.eventDetails.campGround.addressString !== "Park Address") {
            setManualAddress(true)
        } else {
            setManualAddress(false)
        }
    }, [])

    const listCheck = async(state: string) => {
        const getOtherUserDetails = await fetch("https://developer.nps.gov/api/v1/campgrounds?stateCode=" + state, { // https://www.nps.gov/subjects/developer/api-documentation.htm#/ 
            // 
            method: 'GET',
            headers: {
                "X-Api-Key": NPS!
            }
        })
        const response = await getOtherUserDetails.json().catch((err) => {
            console.log(err)
        })
        if (response.data.length > 0) {
            setParkList(response.data)
        }
    }

    const parkListOptions = parkList.map((option:any) => {
        return (
            <option key={option.id} value={option.id}>{option.name}</option>
        )
    })

    const handleEventDetails = (event: any) => {
        const {name, value} = event.target

        if (name === "parkState") {
            listCheck(value)
        } else if (name === "eventName" || name === "userDescription" || name === "manualAddress" || name === "manualParkName" || name === 'addressNotFound') {
            setNoteCount(prevTitleBody => {
                return {
                    ...prevTitleBody,
                    [name]: value
                }
            })
        }
        
        if (name === "campGround") {

            if (value === "manual") {
                props.setEventDetails((prevDetails: any) => {
                    return {
                        ...prevDetails,
                        campGround: {
                        address: {manual: "manual"},
                        addressString: "",
                        amenities: [],
                        id: "",
                        latitude: "",
                        longitude: "",
                        name: "",
                        url: ""
                    }
                    }
                })
                setCampGroundValue({
                    address: {manual: "manual"},
                    addressString: "",
                    amenities: [],
                    id: "",
                    latitude: "",
                    longitude: "",
                    name: "",
                    url: ""
                })        
                setManualAddress(true)
                return
            } else {
                setManualAddress(false)
            }

            const select = parkList.filter((park:any) => park.id === value).pop()
            let address = select.addresses.filter((address: any) => "Physical" === address.type).pop()
            let addressString = ""
            try {
                addressString = address.line1 + ", " + address.city + ", " + address.stateCode + ", " + address.postalCode 
            } catch (e: any) {
                addressString = "Error: Please use Manual Entry"
                address = {manual:"manualEntry"}
            }

            let campGroundDetails = {
                address: address,
                addressString: addressString,
                amenities: select.amenities,
                id: select.id,
                latitude: select.latitude,
                longitude: select.longitude,
                name: select.name,
                url: select.url
            }

            if (address.manual === "manualEntry") { // Clear address string = "" ; Empty for user input
                campGroundDetails.addressString = ""
                setCampGroundValue(campGroundDetails)
            }

            props.setEventDetails((prevDetails: any) => {
                return {
                    ...prevDetails,
                    [name]: campGroundDetails
                }
            })
            return
        } 

        if (name === "manualAddress") {
            setCampGroundValue((prevDetails: any) => {
                return {
                    ...prevDetails,
                    "addressString": value
                }
            })
            return
        } else if (name === 'manualParkName') {
            setCampGroundValue((prevDetails: any) => {
                return {
                    ...prevDetails,
                    "name": value
                }
            })
            return
        } else if (name === 'addressNotFound') {
            setCampGroundValue((prevDetails: any) => {
                return {
                    ...prevDetails,
                    "addressString": value
                }
            })
            return
        }

        props.setEventDetails((prevDetails: any) => {
            return {
                ...prevDetails,
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
                        defaultValue={props.eventDetails.eventName !== "" ? props.eventDetails.eventName : ""}
                        onChange={handleEventDetails}
                        minLength={3} maxLength={35} 
                    />
                    <p className="text-gray-200">{noteCount.eventName.length}/35</p>
                </div>
            </div>

            <div className="sm:flex sm:space-x-2 items-center p-2 hover:bg-gray-600 duration-200 rounded-md">
                <h1 className="text-gray-100 font-light">Public or Private Event:</h1>
                <div className='text-gray-800 '>
                    <select className='rounded-md mx-auto shadow-md p-1 bg-gray-200' onChange={handleEventDetails} defaultValue={"true"} name="isPrivate">
                        <option value="true">Private</option>
                        <option value="false">Public</option>
                    </select>
                </div>
            </div>

            <div className=' p-2 hover:bg-gray-600 duration-200 rounded-md flex flex-col gap-4'>
                <label className="text-gray-100 font-light text-xl" htmlFor='eventName'>Date Range:</label>
                <div className="flex flex-col gap-2">
                    <div className="flex gap-4 sm:items-center flex-col sm:flex-row bg-gray-500 p-1 rounded-md">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-gray-100 font-light">Start Date:</h1>
                            <input 
                                className="rounded-md font-normal pl-2 w-40" 
                                type='date' 
                                min={currentDateStr}
                                max={"2030-01-01"}
                                defaultValue={props.eventDetails.startDate !== "" ? props.eventDetails.startDate : ""}
                                autoComplete='off' 
                                name='startDate' 
                                onChange={handleEventDetails}
                            />
                        </div>
                        <div className="sm:flex flex-col sm:space-x-2 items-center p-2 hover:bg-gray-600 duration-200 rounded-md">
                            <h1 className="text-gray-100 font-light">Start Time:</h1>
                            <div className='text-gray-800 flex gap-2'>
                                <input 
                                    className="rounded-md font-normal pl-2 w-40" 
                                    type='time'
                                    autoComplete='off'
                                    defaultValue={props.eventDetails.startTime !== "" ? props.eventDetails.startTime : ""}
                                    name='startTime' 
                                    onChange={handleEventDetails}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4 sm:items-center flex-col sm:flex-row bg-gray-500 p-1 rounded-md">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-gray-100 font-light">End Date:</h1>
                            <input 
                                className="rounded-md font-normal pl-2 w-40" 
                                type='date' 
                                min={currentDateStr}
                                max={"2030-01-01"}
                                defaultValue={props.eventDetails.endDate !== "" ? props.eventDetails.endDate : ""}
                                autoComplete='off' 
                                placeholder="mm/dd/yyyy"
                                name='endDate' 
                                onChange={handleEventDetails}
                                minLength={3} maxLength={35} 
                            />
                        </div>
                        <div className="sm:flex flex-col sm:space-x-2 items-center p-2 hover:bg-gray-600 duration-200 rounded-md">
                            <h1 className="text-gray-100 font-light">End Time:</h1>
                            <div className='text-gray-800 flex gap-2'>
                                <input 
                                    className="rounded-md font-normal pl-2 w-40" 
                                    type='time'
                                    autoComplete='off' 
                                    defaultValue={props.eventDetails.endTime !== "" ? props.eventDetails.endTime : ""}
                                    name='endTime' 
                                    onChange={handleEventDetails}
                                    minLength={3} maxLength={35} 
                                />
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>

            <div className="sm:flex flex-col gap-2 p-2 hover:bg-gray-600 duration-200 rounded-md">
                <h1 className="text-gray-100 font-light">Camp or Park Location:</h1>
                <div className='text-gray-800 flex gap-2 items-center'>
                    <h1 className="text-gray-100">State:</h1>
                    <select className='rounded-md shadow-md p-1 bg-gray-200' required onChange={handleEventDetails} defaultValue={props.eventDetails.parkState === "" ? "null" : props.eventDetails.parkState} name="parkState">
                        <option disabled value={"null"}>State</option>
                        {stateList}
                    </select>
                </div>
                {props.eventDetails.parkState !== "" && 
                <div className='text-gray-800 '>
                    <h1 className="text-gray-100">Camp Ground / Park:</h1>
                    <select className='rounded-md shadow-md p-1 bg-gray-200' onChange={handleEventDetails} defaultValue={"null"} name="campGround">
                        <option disabled value={"null"}>{props.eventDetails.campGround.name !== "" ? props.eventDetails.campGround.name : "Park Name"}</option>
                        <option value={"manual"}>Manual Entry</option>
                        {parkListOptions}
                    </select>
                </div>}
                {
                    manualAddress ? 
                    <div>
                        <div className=' hover:bg-gray-600 duration-200 rounded-md flex flex-col gap-2'>
                            <div>
                                <label className="text-gray-100" htmlFor='manualParkName'>Camp Ground / Park Name:</label>
                                <div className="flex gap-4">
                                    <input 
                                        className="rounded-md font-normal pl-2 w-[22rem]" 
                                        type='text' 
                                        autoComplete='off' 
                                        placeholder="Camp Ground or Park Name"
                                        name='manualParkName' 
                                        defaultValue={props.eventDetails.manualParkName !== "" ? props.eventDetails.manualParkName : ""}
                                        onChange={handleEventDetails}
                                        minLength={10} maxLength={100} 
                                    />
                                    <p className="text-gray-200">{noteCount.manualParkName.length}/100</p>
                                </div>
                            </div>
                            <div>
                                <label className="text-gray-100" htmlFor='manualAddress'>Address:</label>
                                <div className="flex gap-4">
                                    <input 
                                        className="rounded-md font-normal pl-2 w-[22rem]" 
                                        type='text' 
                                        autoComplete='off' 
                                        placeholder="Enter the Address"
                                        name='manualAddress' 
                                        defaultValue={props.eventDetails.campGround.addressString !== "" ? props.eventDetails.campGround.addressString : ""}
                                        onChange={handleEventDetails}
                                        minLength={10} maxLength={100} 
                                    />
                                    <p className="text-gray-200">{noteCount.manualAddress.length}/100</p>
                                </div>
                            </div>
                            <div className="mt-1 flex gap-2">
                                <button className="bg-emerald-400 p-1 rounded-md" onClick={() => props.setEventDetails((prevDetails: any) => {   
                                    return {
                                        ...prevDetails,
                                        "campGround": campGroundValue
                                    }
                                })}>Apply Details</button>
                                <p className={props.eventDetails.campGround.name.length > 4 && props.eventDetails.campGround.addressString.length > 10 ? "bg-emerald-400 p-1 rounded-md" : "hidden"}>Applied!</p> 
                            </div>
                        </div>
                    </div>
                    :    
                    <div>
                        {props.eventDetails.campGround.addressString !== "" && props.eventDetails.campGround.address.manual !== "manualEntry" ?
                        <div className=' hover:bg-gray-600 duration-200 rounded-md flex flex-col'>
                            <label className="text-gray-100">Address:</label>
                            <div className="flex gap-4">
                                <input 
                                    className="rounded-md font-normal pl-2 w-[22rem]" 
                                    type='text' 
                                    autoComplete='off' 
                                    placeholder="Name your event"
                                    value={props.eventDetails.campGround.addressString !== "" ? props.eventDetails.campGround.addressString : ""}
                                    onChange={handleEventDetails}
                                    minLength={10} maxLength={100} 
                                />
                            </div>
                        </div>
                        :
                        <>
                        {props.eventDetails.campGround.address.manual === "manualEntry" &&
                            <div className=' hover:bg-gray-600 duration-200 rounded-md flex flex-col'>
                                <label className="text-gray-100">Manual Address:</label>
                                <div className="flex gap-4">
                                    <input 
                                        className="rounded-md font-normal pl-2 w-[22rem]" 
                                        type='text' 
                                        autoComplete='off' 
                                        name='addressNotFound'
                                        placeholder={props.eventDetails.campGround.addressString !== "" ? props.eventDetails.campGround.addressString : "Address Not Found : Please Enter Address"}
                                        onChange={handleEventDetails}
                                        minLength={10} maxLength={100} 
                                    />
                                    <p className="text-gray-200">{noteCount.addressNotFound.length}/100</p>
                                </div>
                                <div className="mt-1 flex gap-2">
                                    <button className="bg-emerald-400 p-1 rounded-md" onClick={() => props.setEventDetails((prevDetails: any) => {   
                                        return {
                                            ...prevDetails,
                                            "campGround": campGroundValue
                                        }
                                    })}>Apply Address</button>    
                                    <p className={props.eventDetails.campGround.name.length > 4 && props.eventDetails.campGround.addressString.length > 10 ? "bg-emerald-400 p-1 rounded-md" : "hidden"}>Applied!</p>  
                                </div>
                                <div className="flex">
                                    <div className="bg-gray-500 mt-1 rounded-md py-1 px-2  text-gray-50">
                                        <p className="">Current Details:</p>
                                        <p>Park Name: {props.eventDetails.campGround.name}</p>
                                        <p>Address: {props.eventDetails.campGround.addressString === "" ? "Please Enter Address" : props.eventDetails.campGround.addressString}</p>
                                    </div>
                                </div>
                            </div>
                        }
                        </>
                        
                        }
                    </div>
                }
            </div>

            <div className='flex flex-col p-2 hover:bg-gray-600 duration-200 rounded-md'>
                <label className="text-gray-100 text-xl font-light">Event Details:</label>
                <div className="flex gap-4">
                <textarea 
                    className="rounded-md font-normal w-[40rem] p-1 px-2"
                    rows={3} 
                    placeholder="What do you want everyone to know about this event?"
                    name='userDescription'
                    defaultValue={props.eventDetails.userDescription !== "" ? props.eventDetails.userDescription : ""}
                    minLength={3} maxLength={1000}
                    onChange={handleEventDetails}
                />
                <p className="text-gray-200">{noteCount.userDescription.length}/1000</p>
                </div>
            </div>

        </div>
        </>
    )
}

export default EventDetailsForm