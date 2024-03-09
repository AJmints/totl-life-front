'use client'

import Image from "next/image"
import fav from "../../../../../../public/icons/Save.png"
import { useState } from "react"
import ButtonNotificationContainer from "../../ButtonNotificationContainer"
const FavoriteSaveButton = () => {

    const [ displayOptions, setDisplayOptions ] = useState<boolean>(false)

    return (
        <div className="text-center sm:mr-2 items-center flex" onMouseLeave={() => setDisplayOptions(false)}>
            { displayOptions ?
            <ButtonNotificationContainer 
            buttonType={"Favorite"}
            />
            :
            <></>
            }
            <Image
                src={fav}
                alt=''
                className='cursor-pointer hover:shadow-lg p-2 hover:rounded-md duration-300 hover:bg-red-500/80 hover:shadow-gray-600 w-9'
                onClick={() => setDisplayOptions(prev => !prev)}
            />
        </div>
    )
}

export default FavoriteSaveButton