'use client'

import SocialLogin from "../login/SocialLogin"
const URL = process.env.NEXT_PUBLIC_BACKEND_URL

export default function LoginForm() {


    const handlSubmit = async(event: any) => {
        event.preventDefault()

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
        const result = await response.json()
        console.log(result)

    }

    return (
        <div className=" bg-gray-400 mx-2 p-3 rounded-md shadow-lg shadow-gray-900">
            
            {/* Traditional Login */}
            <div className="flex justify-center font-light text-xl">
            <form onSubmit={handlSubmit}>
                <h1 className="text-3xl font-extralight mb-4">Register</h1>
                <div>
                    <h1>UserName: </h1>
                    <input className="rounded-md shadow-md" type="text" autoComplete="on" id="userName" required minLength={3} maxLength={40} />
                </div>
                <div className="font-light mt-3">
                    <h1>Email: </h1>
                    <input className="rounded-md shadow-md" type="email" autoComplete="on" id="userEmail" required minLength={3} maxLength={40} />
                </div>

                <div className="font-light">
                    <h1>Password: </h1>
                    <input className="rounded-md shadow-md" type="password" autoComplete="off" id="password" required minLength={3} maxLength={40} />
                </div>

                <button className="bg-green-700/80 p-2 rounded-md mt-3 shadow-md hover:bg-emerald-500/80 duration-300" type="submit">Submit</button>
            </form>
            </div>

            {/* Social login Option */}
            <div className="mt-10">
                <SocialLogin />
            </div>
        </div>
    )
}