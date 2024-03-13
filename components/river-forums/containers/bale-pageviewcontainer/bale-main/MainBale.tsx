'use client'

import Image from "next/image"
import pfpDefault from '../../../../../public/icons/profile-pic.png'
import { useState, useEffect } from 'react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import LoadingMainBale from "./LoadingMainBale"

const URL: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL

const MainBale = (props: any) => {

    const [ baleDetails, setBaleDetails ] = useState<any|null>(null)

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        const getBale = async() => {

            const id: string | null | undefined = searchParams?.get('baleid')
            const editLog: string | null | undefined = searchParams?.get('1edit')
            const log: string | undefined = pathname?.split("/river/").pop()?.split("/").shift()

            //TODO: Create Form to edit post title or body in new component and use it in this component.

            if (id === null || id === undefined || id === "") {
                console.log("create error message if url has been tampered with")
                return
            }

            const makeLogRequest = await fetch( URL + "/logs/get-specific-bale/" + log + "/" + id)
            const response = await makeLogRequest.json().catch((err) => {
                console.log(err)
            })

            if (await response) {
                props.setSocialInfo({id: response.id, upVote: response.upVoteIds, downVote: response.downVoteIds, tName: response.userName})
                setBaleDetails(response)
                props.setCommentLoader(true)
            } else if (await response.status === "failed") {
                console.log("Post failed due to invalid url param")
            } else {
                console.log("Error, please try again later.")
            }

            if (editLog === "true") {
                props.setBaleEditToggle(true)
            }

        }
        getBale()

    }, [])

    return (
        <>
            { baleDetails === null ? 
            <LoadingMainBale />
            :
            <>
            <div className='flex left-0'>
                <button className='bg-gray-400 p-3 rounded-md hover:bg-emerald-500 duration-300' onClick={() => router.back()}>Back</button>
            </div>

            <div className="flex mb-2 justify-between items-center">
            <p className='text-left font-normal text-sm cursor-pointer my-2 bg-gray-400 p-2 rounded-md hover:bg-emerald-500 duration-200' onClick={() => router.push("/river/" + baleDetails?.parentLog)}>log/{baleDetails?.parentLog}</p>
            <div className="flex justify-center items-center">
                <Image
                    src={baleDetails?.userPFP === null ? pfpDefault : 'data:image/jpeg;base64,' + baleDetails?.userPFP}
                    alt=""
                    width={30}
                    height={30}
                    className="mr-2 w-10 h-10 rounded-full cursor-pointer"
                    onClick={() => router.push("/user/" + baleDetails?.userName)}
                />
            <div className="flex justify-center items-center text-sm font-light text-gray-300">
                <p>t/</p>
                <p className="cursor-pointer" onClick={() => router.push("/user/" + baleDetails?.userName)}>{baleDetails?.userName}</p>
            </div>
            </div>
            </div>

            <div className="bg-gray-300 rounded-t-md flex p-3">
                <h1 className="text-lg sm:text-2xl font-light">{baleDetails?.title}</h1>
            </div>
            
            <div className="bg-gray-400 rounded-b-md flex p-3">
                <h1 className="text-sm sm:text-lg font-light">{baleDetails?.body}</h1>
            </div>
            </>
            }

        </>
    )
}

export default MainBale