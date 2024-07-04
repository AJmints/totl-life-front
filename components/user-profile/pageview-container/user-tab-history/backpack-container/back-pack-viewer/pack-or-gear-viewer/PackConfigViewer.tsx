'use client'

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

const URL: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL

const PackConfigViewer = (props: any) => {

    const [ userPacks, setUserPacks ] = useState<any[]>([])

    const pathname = usePathname()

    useEffect(() => {
        const getUserPacks = async() => {
            const userName = pathname?.split("/user/").pop()

            const createPack = await fetch(URL + "/backpack/get-user-pack-configs/" + userName)
            const response = await createPack.json().catch((err) => {
                console.log(err)
            })
            props.setUserPacks(response)
        } 
        
        if (props.userPacks.length <= 0) {
            getUserPacks()
        }
        
    }, [])

    const allConfigs = props.userPacks.map((option:any) => {
        return (
            <div key={option.id} className="bg-gray-500 text-gray-100 p-2 rounded-md">
                <p>{option.packName}</p>
                <p>{option.configType}</p>
            </div>
            
        )
    })

    return (
        <>
            <div className="my-2">
                <p>Setting up pack config display</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1 sm:gap-2 my-2">
            {allConfigs}
            </div>
        </>
        
    )
}

export default PackConfigViewer