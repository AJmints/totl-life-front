'use client'

import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import ReportButton from '@/components/support/MakeReport/ReportButton'

const URL = process.env.NEXT_PUBLIC_BACKEND_URL

export const authCheck = async() => {
    const infoCall: Response = await fetch("/api/authCheck")
    const status = await infoCall.json().catch((err) => {
        console.log(err)
    })
    if (status.loggedIn) {
        return status.loggedIn
    }
}
export const token = async() => {
    const getToken: Response = await fetch("/api/headers")
    const status = await getToken.json().catch((err) => {
        console.log(err)
    })
    return status
}

type EditOptionsLogicChildren = {
    baleId: number | null,
    commentId?: number | null, 
    redirect: boolean,
    isActive: boolean,
    postDetails?: {
        userName: string,
        baleTitle: string,
        baleBody: string,
    }
    type: "bale" | "comment",
    log: string,
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
    const pathname: string | null = usePathname()

    useEffect(() => {
        setCurrentUrl(window.location.href)
    }, [])
    
    const test = () => {
        console.log(String(props.optionReact.pageRedirect).split("/").pop())
    }

    const handleEditReroute = (pushOrToggle: boolean) => {

        if (pushOrToggle) {
            // In case of duplicate log name in URL, adjust URL to be routed to correct page.
            if (currentUrl.split("/").includes(String(props.optionReact.pageRedirect).split("/")[0])) {
                router.push(currentUrl + "/" + String(props.optionReact.pageRedirect).split("/").pop() + "&1edit=true")
                return
            }
            router.push(currentUrl + "/" + props.optionReact.pageRedirect + "&1edit=true")
        } else {
            props.optionReact.setBaleEditToggle(prev => !prev)
        }

    }

    const deleteThisPost = async() => {
        if (confirm("Are you sure you want to delete this bale? All comments and history will be deleted")) {
            if (confirm("Just double checking, this will remove it forever. Are you sure?")){

                if (!await authCheck()) {
                    console.log("issue")
                    // setSubmitting(false)
                    return
                }

                const deleteBale = await fetch(URL + "/logs/deleteBale/" + props.optionReact.baleId, {
                    method: "DELETE",
                    headers: {
                        "auth-token": "Bearer " + await token(),
                    }
                })
                const response = await deleteBale.json().catch((err) => {
                    console.log(err)
                })
                if (response.status === "success") {
                    if (pathname === "/river") {
                        location.reload()
                    } else {
                        router.push("/river")
                    }
                }
                

            } else {
                return 
            }
        } else {
            return
        }
    }

    return (
        <div className={props.optionReact.isActive ? "absolute p-1 bg-gradient-to-b from-gray-500 to-gray-400 rounded-md -mb-28 -ml-5 sm:ml-0" 
                                                    : "absolute p-1 bg-gradient-to-b from-gray-500 to-gray-400 rounded-md -mb-20 -ml-5 sm:ml-0"}>
            {
                props.optionReact.isActive ? 
                <div className='space-y-2' onClick={() => test()}>
                <div className="p-2 bg-gray-300 rounded-md cursor-pointer hover:bg-emerald-500 duration-200" onClick={() => handleEditReroute(props.optionReact.redirect)}>
                    <p>Edit</p>
                </div>
                
                <div className="p-2 bg-gray-300 rounded-md cursor-pointer hover:bg-emerald-500 duration-200" onClick={() => deleteThisPost()}>
                    <p>Delete</p>
                </div>
                </div>
                :
                <div className=''>
                <ReportButton 
                postDetails={{
                        id: props.optionReact.baleId,
                        type: props.optionReact.type,
                        log: props.optionReact.log
                }}/>
                </div>
                
            }
            
        </div>
    )
}

export default EditOptionsLogic