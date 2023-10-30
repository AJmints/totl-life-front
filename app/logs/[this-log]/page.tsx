'use client'

import LogLoadOut from "@/components/bales/LogLoadOut"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import LoadingPage from "@/components/loading/Loading"

export default function SpecificLogPage() {

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
        <div>
            { checkUser ?
                <>
                    <LogLoadOut/>
                </>
                :
                <>
                    <LoadingPage/>
                </>
            }
        </div>
    )
}