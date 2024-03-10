'use client'

import Image from "next/image"
import share from "../../../../../../public/icons/share.png"
import { useState } from "react"
import ButtonNotificationContainer from "../../ButtonNotificationContainer"
import ShareButtonLogic from "./ShareButtonLogic"


const ShareLinkButton = (props: any) => {

    const [ displayOptions, setDisplayOptions ] = useState<boolean>(false)
    
    return (
        <div className="items-center flex" onMouseLeave={() => setDisplayOptions(false)}>
            { displayOptions ?
            <ShareButtonLogic
            shareFromPreview={props.shareFromPreview}
            />
            :
            <></>
            }
            <Image
                src={share}
                alt=''
                className='cursor-pointer hover:shadow-lg p-2 hover:shadow-gray-600 hover:bg-red-500/80 w-10 h-auto duration-300 rounded-md'
                onClick={() => setDisplayOptions(prev => !prev)}
            />
        </div>
    )
}

export default ShareLinkButton