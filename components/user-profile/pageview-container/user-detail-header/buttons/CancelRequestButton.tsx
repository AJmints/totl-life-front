
import { usePathname } from "next/navigation"
import { useUserContext } from "@/app/context/UserContextProvider"

const CancelRequestButton = () => {

    const pathname = usePathname()

    const { userName } = useUserContext()

    const friendName = pathname?.split("/user/").pop()

    return (
        <>
        {userName !== friendName && <button onClick={() => console.log("Cancel")} className="bg-gray-600 p-2 rounded-md shadow-md shadow-gray-800/40">Cancel Request</button>}
        </>
    )
}

export default CancelRequestButton