'use client'

import { useState } from "react"
import { useUserContext } from "@/app/context/UserContextProvider"
import Image from "next/image"
import GearItemCard from "../../../back-pack-viewer/gear-item-card/GearItemCard"

const URL = process.env.NEXT_PUBLIC_BACKEND_URL

export const authCheck = async() => {
    const infoCall: Response = await fetch("/api/authCheck")
    const status = await infoCall.json().catch((err) => {
        console.log(err)
    })
    if (status.loggedIn) {
        return status.loggedIn
    }
}
export const token = async() => {
    const getToken: Response = await fetch("/api/headers")
    const status = await getToken.json().catch((err) => {
        console.log(err)
    })
    return status
}

const ModifyGearItem = (props : any) => {

    const [ update, setUpdate ] = useState(false)
    const { userGearList } = useUserContext()

    const deleteThisPost = async() => {
        if (confirm("Once deleted, you will not be able to recover this item. Is that okay?")) {

                if (!await authCheck()) {
                    console.log("issue")
                    // setSubmitting(false)
                    return
                }

                const deleteBale = await fetch(URL + "/gear/deleteItemFromMainPack/" + props.gearDetails.id, {
                    method: "DELETE",
                    headers: {
                        "auth-token": "Bearer " + await token(),
                    }
                })
                const response = await deleteBale.json().catch((err) => {
                    console.log(err)
                })
                // console.log(response)
                if (response.status === "success") {
                    const removeItem = userGearList.filter(userGearItem => userGearItem.id !== props.gearDetails.id)
                    props.setUserGearList(removeItem)
                    // location.reload() /* Temp solution, need to remove item from state, not reload */
                    return
                } else if (response.status === "failed") {
                    return
                }
                

            } else {
                return 
            }
    }


    return (
        <div className="rounded-md p-2">
            
            <div>
                <div className="flex justify-center mb-0.5">
                    <GearItemCard
                    gearDetails={props.gearDetails}
                    image={props.image}
                    />
                </div>

                <div className="flex justify-around">
                    {/* <div>
                        <button onClick={() => setUpdate(prev => !prev)} className="bg-emerald-500 p-2 rounded-md hover:bg-emerald-700 duration-300">Update</button>
                    </div> */}
                    <div>
                        <button onClick={() => deleteThisPost()} className=" bg-emerald-500 p-2 rounded-md hover:bg-emerald-700 duration-300">Delete</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ModifyGearItem