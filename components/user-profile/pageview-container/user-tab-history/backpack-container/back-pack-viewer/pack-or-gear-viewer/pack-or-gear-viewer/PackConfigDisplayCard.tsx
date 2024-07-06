'use client'

import Image from "next/image"

const PackConfigDisplayCard = (props: any) => {

    const packItem = props.packConfig

    return (
        <div onClick={() => console.log(props)} className="bg-gray-400 rounded-md p-1">

            <div className="text-center">
                <p>Type:</p>
                <p className="text-xl font-medium">{packItem.configType}</p>
                <Image
                src={props.img.src}
                alt=""
                width={100}
                height={100}
                className="h-20 w-auto rounded-md mx-auto my-1" 
                />
            </div>
        
            <div className="text-center">
                <p>Pack Name:</p>
                <p className="text-xl font-medium">{packItem.packName}</p>
                <p className="text-sm">Created:</p>
                <p className="text-md font-medium">{packItem.dateCreated}</p>
                {packItem.packNotes !== "" && <><p>Notes:</p><p className="text-sm font-medium">{packItem.packNotes}</p></>}  
            </div>
        </div>
    )
}

export default PackConfigDisplayCard