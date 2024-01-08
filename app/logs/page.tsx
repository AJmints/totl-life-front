'use client'

import LogLoadOut from "@/components/bales-depreciated/LogLoadOut";
import LoadingPage from "@/components/loading/Loading";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

    const authCheck = async() => {
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

    return (
        <>
            { checkUser ?
                <>
                    <LogLoadOut/>
                </>
                :
                <>
                    <LoadingPage/>
                </>
            }
        </>
    )
}