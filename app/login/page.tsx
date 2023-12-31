'use client'

import LoginForm from "@/components/login/LoginForm";
import { useState } from 'react'

export default function LoginPage() {

    const [userLogged, setUserLogged] = useState<boolean>(false)
    const [loginToggle, setLoginToggle] = useState(false)

    return (
        <div className="h-screen">
            <div className="mt-10 mx-5">
                <div className="flex justify-center mb-10">
                    <div className="bg-gray-700/80 max-w-lg text-xl font-light rounded-md p-5 text-gray-200">
                        <p>To join the forums, you must be logged in. If you do not have an account yet, come join Totl.Life!</p>
                    </div>
                </div>
                <div className="flex justify-center"> 
                    <LoginForm
                    setLoginToggle={setLoginToggle}
                    setUserLogged={setUserLogged}
                    userLogged={userLogged}
                    />
                </div>
            </div>
        </div>
    )
}