'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from 'react'
import { useUserContext } from "@/app/context/UserContextProvider"

const URL = process.env.NEXT_PUBLIC_BACKEND_URL

export const setTokenCookie = async(data: any) => {
     const infoCall = await fetch("/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ data })
    })
    const status = await infoCall.json().catch((err) => {
        console.log(err)
    })
}

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

export default function LoginForm(props: any) {

    const [message, setMessage] = useState<boolean>(false)
    const [readMessage, setReadMessage] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const { setUserID, setUserName, setVerified, setUserPFP } = useUserContext()
    const router = useRouter()

    const redirect = async() => {
        const userPresent = await authCheck()
        if (userPresent) {
            router.push("/river")
        }
    }

    useEffect(function () {
        redirect()
    }, [])

    const registerLink = () => {
        props.setLoginToggle((prev:boolean) => !prev)
        router.push("/register")
    }

    const handlSubmit = async(event: any) => {
        event.preventDefault()

        setLoading(true)
        if (message) {
            setMessage(false)
            setReadMessage("")
        }

        const data = {
            userEmail: String(event.target.userEmail.value),
            userPassword: String(event.target.password.value)
        }

        const response = await fetch( URL + "/auth/login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const result = await response.json().catch((err) => {
            console.log(err)
            setLoading(false)
            setReadMessage("Something went wrong, please try again.")
        })
        console.log(result)
        if (data.userEmail === result.userEmail) {
            setLoading(false)
            props.setLoginToggle(false)
            props.setUserLogged(true)
            setTokenCookie(result)

            // TODO: Might need to change the methods above in if statment, below are setting the useContext-UserContext

            setUserID(result.id) 
            setUserName(result.userName)
            setVerified(result.accountVerified)
                if (result.userPfp) {
                    setUserPFP('data:image/jpeg;base64,' + result.userPfp)
                } else {
                    setUserPFP(null)
                }
            // props.setLoadingHeader(true)
            router.refresh()
            router.push("/river")
            return
        }
        if (result.status === "failed") {
            setLoading(false)
            setMessage(true)
            setReadMessage(result.response)
            return
        }
    }

    return (
        <div className="bg-gray-400 mx-2 p-3 block justify-center rounded-md shadow-lg shadow-gray-900">
            
            {/* Traditional Login */}
            <div className="block mx-3 pb-5 justify-center font-light">
            <form className="block" onSubmit={handlSubmit}>
                <div>
                    <h1 className="text-3xl  sm:text-4xl border-b pb-1 border-gray-200 font-extralight mb-4">Login</h1>
                    <div className="font-light mt-3">
                        <h1>Email: </h1>
                        <input className="rounded-md shadow-md" type="email" id="userEmail" required minLength={3} maxLength={40} />
                    </div>
                    <div className="font-light">
                        <h1>Password: </h1>
                        <input className="rounded-md shadow-md" type="password" autoComplete="off" id="password" required minLength={3} maxLength={40} />
                    </div>
                </div>
                {
                loading ? 
                <div className="flex">
                <p className="bg-green-700/80 p-2 rounded-md mt-3 shadow-md hover:bg-emerald-500/80 duration-300">Verifying...</p>
                </div>
                :                    
                <button className="bg-green-700/80 p-2 rounded-md mt-3 shadow-md hover:bg-emerald-500/80 duration-300" type="submit">Submit</button>
                }
            </form>
            </div>

            { message ? <p className="text-red-500">{readMessage}</p> : <></>}

            <div className="block sm:flex mt-3 font-light">
            <h2>Are you new here?</h2>
            <button onClick={() => registerLink()} className="text-blue-600 border-b-2 border-blue-600">Create an account!</button>
            </div>

            {/* Social login Option */}
            {/* <div className="mt-10">
                <SocialLogin />
            </div> */}
        </div>
    )
}