import Image from "next/image"
import picDefault from "../../public/icons/profile-pic.png"

export default function UserDetails() {

    return (
        <div className="flex">
            <div className="block">
            <Image
                src={picDefault}
                alt=""
                className="w-32 h-auto mx-auto rounded-full shadow-lg shadow-gray-800"
            />
            <div className="bg-gray-600 mt-3 p-2 rounded-md">
                <p className="text-3xl border-b-2 border-gray-400">User Information</p>
                <h1>UserName: </h1>
                <h2>Contact: </h2>
                <h3>Information: </h3>
            </div>
            </div>
        </div>
    )
}