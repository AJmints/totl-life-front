import { useUserContext } from "@/app/context/UserContextProvider"
import { useState } from "react"

const URL: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL

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

const DeletePackConfig = (props: any) => {

    const { userPackConfigs, setUserPackConfigs } = useUserContext()

    const [ submitToggle, setSubmitToggle ] = useState(false)

    const deletePackConfig = async() => {
        if (confirm("Once deleted, you will not be able to recover this item. Is that okay?")) {

                setSubmitToggle(true)
                if (!await authCheck()) {
                    console.log("issue")
                    setSubmitToggle(false)
                    return
                }

                const deletePackConfig = await fetch(URL + "/backpack/delete-pack-config/" + props.packConfig, {
                    method: "DELETE",
                    headers: {
                        "auth-token": "Bearer " + await token(),
                    }
                })
                const response = await deletePackConfig.json().catch((err) => {
                    console.log(err)
                })
                // console.log(response)
                if (response.status === "success") {
                    const removeItem = userPackConfigs.filter(packConfig => packConfig.id !== props.packConfig)
                    setUserPackConfigs(removeItem)
                    setSubmitToggle(false)
                    return
                } else if (response.status === "failed") {
                    setSubmitToggle(false)
                    return
                }
                

            } else {
                return 
            }
    }

    return (
        <>
            { submitToggle ? <button className="bg-red-600 p-2 rounded-md" >Deleting...</button> : <button className="bg-red-400 p-2 rounded-md" onClick={() => deletePackConfig()}>Delete</button>}
            
        </>
    )
}

export default DeletePackConfig