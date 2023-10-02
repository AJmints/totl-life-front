'use client'

import Link from "next/link"
import SocialLogin from "./SocialLogin"

export default function LoginForm() {

    const handlSubmit = async(event: any) => {
        event.preventDefault()

        const data = {
            email: String(event.target.userAccount.value),
            password: String(event.target.password.value)
        }
    }

    return (
        <div className=" bg-gray-400 mx-2 p-3 rounded-md shadow-lg shadow-gray-900">
            
            {/* Traditional Login */}
            <div className="flex justify-center font-light text-xl">
            <form onSubmit={handlSubmit}>
                <h1 className="text-3xl font-extralight">Login</h1>
                <div className="font-light mt-3">
                    <h1>Email: </h1>
                    <input className="rounded-md shadow-md" type="email" autoComplete="off" id="userEmail" required minLength={3} maxLength={40} />
                </div>

                <div className="font-light">
                    <h1>Password: </h1>
                    <input className="rounded-md shadow-md" type="text" autoComplete="off" id="password" required minLength={3} maxLength={40} />
                </div>

                <button className="bg-green-700/80 p-2 rounded-md mt-3 shadow-md hover:bg-emerald-500/80 duration-300" type="submit">Submit</button>
            </form>
            </div>

            <div className="flex mt-3 font-light">
            <h2>Are you new here?</h2>
            <Link href="/register" className="text-blue-600 border-b-2 border-blue-600">Create an account!</Link>
            </div>

            {/* Social login Option */}
            <div className="mt-10">
                <SocialLogin />
            </div>
        </div>
    )
}