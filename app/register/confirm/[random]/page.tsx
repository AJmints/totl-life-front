'use client'
import Link from "next/link"
import { useEffect, useState } from "react"

const URL = process.env.NEXT_PUBLIC_BACKEND_URL

export default function ConfirmEmail({params}: {
    params: {random: string}
}) {

    const [response, setResponse] = useState("")
    const [verifying, setVerifying] = useState(true)
    const [showLink, setShowLink] = useState(false)
    const [resend, setResend] = useState(false)

    const checkConfirmationToken = async() => {
        const tokenId: string = params.random
        let route: string = "/auth/confirm"

        if (resend) {
            route = "/auth/new-link"
        }

        const response = await fetch( URL + route, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ tokenId }),
        })

        const data = await response.json().catch((e: any) => {
            console.log(e)
        })
        if (data.error) {
            setResponse("Ooops, something went wrong! Please follow the link so our team can try to fix this.")
            setVerifying(false)
            // Set up a link/POST to send information back about an error that happened to try and fix it.
            return;
        }
        
        setResponse(data.response)
        setVerifying(false)
        if (data.response === "You're account is already verified" || data.response === "Email verified successfully!" || data.response === "Email sent successfully! Please check your email and follow the link to verify your account.") {
            return
        } else {
            setShowLink(true)
            setResend(true)
        }
    }

    const showLinkHandler = () => {
        setShowLink(false)
        setResponse("Sending...")
        checkConfirmationToken()
    }

    useEffect(function() {
        checkConfirmationToken()
    }, [])

    return (
        <div className="mx-5 h-screen">
            <div className="mt-44">
                <div className="flex justify-center">
                    <div className="bg-gray-300 py-4 px-8 rounded-md">
                        <h1>{verifying ? "Verifying, one moment..." : response}</h1>
                        <div className="mt-5 flex justify-center">
                            {showLink ? <button className="px-8 rounded-lg py-2 bg-gray-400 hover:bg-yellow-500 shadow-lg duration-300" onClick={() => showLinkHandler()}>Generate New Link</button> : <></>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}