'use client'

import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/navigation'

const URL = process.env.NEXT_PUBLIC_BACKEND_URL

type EditOptionsLogicChildren = {
    baleId: number, 
    redirect: boolean,
    isActive: boolean,
    pageRedirect?: string,
    setBaleEditToggle: Dispatch<SetStateAction<boolean>>
}

type EditOptionsLogicProps = {
    optionReact: EditOptionsLogicChildren
    setDisplayOptions: Dispatch<SetStateAction<boolean>>
}

const EditOptionsLogic = (props: EditOptionsLogicProps) => {

    const [ currentUrl, setCurrentUrl ] = useState<string>("")

    const router = useRouter()

    useEffect(() => {
        setCurrentUrl(window.location.href)
    }, [])

    /* NEEDS TO HANDLE BALES AND COMMENTS
    CURRENTLY HANDLES BALES, NEXT COMMENTS */

    const handleEditReroute = (pushOrToggle: boolean) => {

        if (pushOrToggle) {
            router.push(currentUrl + "/" + props.optionReact.pageRedirect + "&1edit=true")
        } else {
            props.optionReact.setBaleEditToggle(true)
        }

    }

    const deleteThisPost = async() => {
        if (confirm("Are you sure you want to delete this bale? All comments and history will be deleted")) {
            if (confirm("Just double checking, this will remove it forever. Are you sure?")){

                const deleteBale = await fetch(URL + "/logs/deleteBale/" + props.optionReact.baleId, {
                    method: "DELETE"
                })
                const response = await deleteBale.json().catch((err) => {
                    console.log(err)
                })
                console.log(response)

            } else {
                return 
            }
        } else {
            return
        }
    }

    return (
        <div className={props.optionReact.isActive ? "absolute p-1 bg-gradient-to-b from-gray-500 to-gray-400 rounded-md -mb-28 -ml-20 sm:ml-0" 
                                                    : "absolute p-1 bg-gradient-to-b from-gray-500 to-gray-400 rounded-md -mb-20 -ml-20 sm:ml-0"}>
            {
                props.optionReact.isActive ? 
                <div className='space-y-2'>
                <div className="p-2 bg-gray-300 rounded-md cursor-pointer hover:bg-emerald-500 duration-200" onClick={() => handleEditReroute(props.optionReact.redirect)}>
                    <p>Edit (If user)</p>
                </div>
                
                <div className="p-2 bg-gray-300 rounded-md cursor-pointer hover:bg-emerald-500 duration-200" onClick={() => deleteThisPost()}>
                    <p>Delete (If user)</p>
                </div>
                </div>
                :
                <div className=''>
                <div className="p-2 bg-gray-300 rounded-md cursor-pointer hover:bg-emerald-500 duration-200" onClick={() => console.log("Set up reporting form")}>
                <p>Report (If viewer)</p>
                </div>
                </div>
            }
            
        </div>
    )
}

export default EditOptionsLogic