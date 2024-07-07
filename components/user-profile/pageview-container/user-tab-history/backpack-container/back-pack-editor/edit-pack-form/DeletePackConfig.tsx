import { useUserContext } from "@/app/context/UserContextProvider"

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

    let submitToggle: boolean = false

    const deletePackConfig = async() => {
        if (confirm("Once deleted, you will not be able to recover this item. Is that okay?")) {

                submitToggle = true
                if (!await authCheck()) {
                    console.log("issue")
                    submitToggle = false
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
                    submitToggle = false
                    return
                } else if (response.status === "failed") {
                    submitToggle = false
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