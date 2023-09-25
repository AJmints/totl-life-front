import Image from "next/image"
import totlhome from '../../public/logo/totl-home.png'

export default function Header() {

    return (
        <div className="flex bg-gray-700 shadow-lg bg-shadow-900/90">
            <Image
            src={totlhome}
            alt=""
            className="w-auto ml-10 h-16 hover:bg-gray-600 hover:shadow-lg px-1 m-2 rounded-md duration-300"
            />
        </div>
    )
}