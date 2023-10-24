'use client'

import LogLoadOut from "@/components/bales/LogLoadOut";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const authCheck = async() => {
    const infoCall = await fetch("/api/authCheck")
    const status = await infoCall.json().catch((err) => {
        console.log(err)
    })
    if (status.loggedIn) {
        return true
    } else {
        return false
    }
}

export default function BalesPage() {

    const [checkUser, setCheckUser] = useState<boolean>(false)

    const router = useRouter()

    useEffect(() => {
        const userPresent = async() => {
            if (!await authCheck()) {
                setCheckUser(false)
                router.push("/login")
                return
            }
            setCheckUser(true)
        }
        userPresent()
    }, [])

    return (
        <>
        { checkUser ?
        <div className="">
            <LogLoadOut/>
        </div>
        :
        <></>}
        </>
    )
}