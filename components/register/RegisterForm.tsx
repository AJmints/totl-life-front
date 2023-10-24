'use client'

import Link from "next/link"
import { useState } from "react"

const URL = process.env.NEXT_PUBLIC_BACKEND_URL

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

export default function LoginForm() {

    const [pass, setPass] = useState({
        password: "",
        verifyPassword: "",
    })
    const [formError, setFormError] = useState(false)
    const [message, setMessage] = useState("")
    const [hideSubmit, setHideSubmit] = useState(false)

    const handleVerify = (event: any) => {    
        const {name, value} = event.target
        setPass(prevIn => ({
            ...prevIn,
            [name]: value
        }))
    }


    const handlSubmit = async(event: any) => {
        event.preventDefault()
        setHideSubmit(true)

        setMessage("")
        if (!await authCheck()) {
            setMessage("Register is currently disabled before launch... Please wait...")
            return
        }


        if (pass.password !== pass.verifyPassword) {
            setFormError(true)
            setHideSubmit(false)
            return
        }

        const data = {
            userName: String(event.target.userName.value),
            userEmail: String(event.target.userEmail.value),
            password: String(event.target.password.value),
        }

        const response = await fetch( URL + "/auth/register", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        })
        const result = await response.json().catch((err) => {
            setHideSubmit(false)
            setMessage(err.error)
            return
        })
        if (result.response) {
            setHideSubmit(false)
            setMessage(result.response)
            return
        }
        return setHideSubmit(false)
    }

    return (
        <div className="sm:h-screen">
        <div className="min-w-min sm:min-w-full justify-center flex bg-gray-400 p-3 mx-4  rounded-md shadow-lg shadow-gray-900">
            
            {/* Traditional Login */}
            <div className="block mx-3 justify-center font-light">
            <form className="block" onSubmit={handlSubmit}>
                <div className="space-y-2">
                <h1 className="text-3xl  sm:text-4xl border-b pb-1 border-gray-200 font-extralight mb-4">Register</h1>
                <div className="font-light ">
                    <h1 className="text-lg font-light">Username: </h1>
                    <input className="rounded-md shadow-md" placeholder="Username" type="text" autoComplete="on" id="userName" required minLength={3} maxLength={40} />
                </div>
                <div className="font-light">
                    <h1 className="text-lg font-light">Email: </h1>
                    <input className="rounded-md shadow-md" placeholder="Email" type="email" autoComplete="on" id="userEmail" required minLength={3} maxLength={40} />
                </div>

                <div className="font-light">
                    <h1 className="text-lg font-light">Password: </h1>
                    <input className="rounded-md shadow-md" value={pass.password} onChange={handleVerify} placeholder="Password"  type="password" autoComplete="off" name="password" id="password" required minLength={6} maxLength={40} />
                </div>

                <div className="font-light">
                    <h1 className="text-lg font-light">ReEnter Password: </h1>
                    <input className="rounded-md shadow-md" onChange={handleVerify} placeholder="Verify Pass" type="password" autoComplete="off" name="verifyPassword" id="verifyPassword" required minLength={6} maxLength={40} />
                </div>
                {/* If the verify password does not match the previous password, show alert */}
                {pass.password !== pass.verifyPassword && pass.verifyPassword.length > 6 && <p className="text-red-700 text-lg">Passwords don&#39;t match</p>}

                </div>

                {/* Remove this and uncomment lines below when ready for launch */}
                {message && <p className=" test-sm sm:text-lg">{message}</p>}
                
                
                <div>
                {/* Freeze button while waiting for response */}
                {hideSubmit ? <p className="bg-green-700/80 p-2 rounded-md mt-8 shadow-md hover:bg-emerald-500/80 duration-300">Sending...</p> : <button className="bg-green-700/80 p-2 rounded-md mt-8 shadow-md hover:bg-emerald-500/80 duration-300" type="submit">Submit</button>}
                </div>
                {/* If you try to enter form with invalid information, this alert will trigger */}
                {formError && 
                <div className="absolute bg-gray-200 w-44 mt-3 p-3 rounded-md">
                    <p className="text-red-500 test-sm sm:text-lg">Please correct errors on your form to continue</p>
                    <div className="flex justify-center mt-2">
                    <button className=" bg-gray-400 p-1 rounded-md" onClick={() => setFormError(prev => !prev)}>close</button>
                    </div>
                </div>
                }
                {/* Response from register api is posted */}
                {
            //     message && 
            //     <div className="absolute bg-gray-200 w-44 shadow-lg shadow-gray-800 mt-3 p-3 rounded-md">
            //         <p className=" test-sm sm:text-lg">{message}</p>
            //         <div className="flex justify-center mt-2">
            //         <button className=" bg-gray-400 p-1 rounded-md" onClick={() => setMessage("")}>close</button>
            //     </div>
            // </div>
            }
            </form>

            <div className="flex mt-3">
                <p>Already have an account?</p>
                <Link className="text-blue-600 border-b-2 border-blue-600 ml-1" href="/login">Login here!</Link>
            </div>
            </div>

        </div>
        </div>
    )
}