import { useUserContext } from "@/app/context/UserContextProvider"

const URL: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL

export const token = async() => {
    const getToken: Response = await fetch("/api/headers")
    const status = await getToken.json().catch((err) => {
        console.log(err)
    })
    return status
}

const CreatePackForm = () => {

    const {userID} = useUserContext()

    const handleSubmit = async() => {

        const data = {
            userID: userID,
            specificGearItems: [1,2],
            configType: "Test Pack",
            packName: "Pack setup",
            hiddenPack: false
        }

        console.log(data)

        const createPack = await fetch(URL + "/backpack/create-pack-config", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "auth-token": "Bearer " + await token()
            },
            body: JSON.stringify(data)
        })
        const response = await createPack.json().catch((err) => {
            console.log(err)
        })
        console.log(response)
    }

    const getPackConfigData = async() => {
        const createPack = await fetch(URL + "/backpack/get-user-pack-configs/" + userID)
        const response = await createPack.json().catch((err) => {
            console.log(err)
        })
        console.log(response)

    }

    return (
        <div className='bg-gray-600/90 p-2 rounded-md mt-2'>

            <div className="">
                <h1 className="text-gray-200 text-2xl mb-2 border-b-[1px]">Create a New Pack Configuration:</h1>
            </div>

            <div>
                <p className="text-gray-200">Pack Configuration under construction</p>
                {/* <button onClick={() => handleSubmit()}>Testing</button> */}
                <button onClick={() => getPackConfigData()}>GetDetails</button>
            </div>



        </div>
    )
}

export default CreatePackForm