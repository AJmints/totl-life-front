'use client'

import Image from "next/image"
import share from "../../../../../../public/icons/share.png"
const ShareLinkButton = () => {

    const shareBale = async() => {
        console.log("share details")
    }

    return (
        <div className="items-center flex">
            <Image
                src={share}
                alt=''
                className='cursor-pointer hover:shadow-lg p-2 hover:shadow-gray-600 hover:bg-red-500/80 w-10 h-auto duration-300 rounded-md'
                onClick={() => shareBale()}
            />
        </div>
    )
}

export default ShareLinkButton