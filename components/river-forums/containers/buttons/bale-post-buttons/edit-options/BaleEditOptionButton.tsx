import Image from "next/image"
import options from '../../../../../../public/icons/options.png'
import { useState, useEffect } from "react"
import EditOptionsLogic from "./EditOptionsLogic"


const BaleEditOptionButton = (props: any) => {

    const [ displayOptions, setDisplayOptions ] = useState<boolean>(false)

    return (
        <div className="flex items-center" onMouseLeave={() => setDisplayOptions(false)}>
            { displayOptions ?
            <EditOptionsLogic
            optionReact={props}
            />
            :
            <></>
            }
            <Image
                src={options}
                alt=''
                className='cursor-pointer hover:shadow-lg hover:shadow-gray-600 h-10 hover:bg-red-500/80 w-auto rounded-md duration-300 mr-1 px-3 py-2 '
                onClick={() => setDisplayOptions(prev => !prev)}
            />
        </div>
    )
}

export default BaleEditOptionButton