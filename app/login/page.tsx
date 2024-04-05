'use client'

import LoginForm from "@/components/login/LoginForm";
import { useState, useEffect } from 'react'
import { useUserContext } from "../context/UserContextProvider";
import { useRouter } from "next/navigation";

export default function LoginPage() {

    const [userLogged, setUserLogged] = useState<boolean>(false)
    const [loginToggle, setLoginToggle] = useState(false)

    const router = useRouter()
    const { userName } = useUserContext()

    // useEffect(() => {
    //     router.push("/river")
    // }, [userName.length > 0])

    return (
        <div className="h-screen">
            <div className="mt-10 mx-5">
                <div className="flex justify-center mb-10">
                    <div className="bg-gray-700/80 max-w-lg text-xl font-light rounded-md p-5 text-gray-200">
                        <p>To join the forums, you must be logged in. If you do not have an account yet, come join Totl.Life!</p>
                    </div>
                </div>
                <div className="flex justify-center"> 
                    <div className="p-10 rounded-md bg-gray-400 text-2xl font-extralight">
                        <p>Click the Login Button on the top right of your screen to Login</p>
                    </div>
                </div>
            </div>
        </div>
    )
}