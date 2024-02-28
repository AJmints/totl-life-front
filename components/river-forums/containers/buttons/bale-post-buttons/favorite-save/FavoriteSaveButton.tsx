'use client'

import Image from "next/image"
import fav from "../../../../../../public/icons/Save.png"
const FavoriteSaveButton = () => {

    const saveBale = async() => {
        console.log("share details")
    }

    return (
        <div className="text-center pt-1 pb-2 items-center flex">
            <Image
                src={fav}
                alt=''
                className='cursor-pointer hover:shadow-lg p-2 hover:rounded-md duration-300 hover:bg-red-500/80 hover:shadow-gray-600 w-9'
                onClick={() => saveBale()}
            />
        </div>
    )
}

export default FavoriteSaveButton