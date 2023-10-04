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
        <div className=" bg-gray-400 p-3 mx-4 min-w-min rounded-md shadow-lg block shadow-gray-900">
            
            {/* Traditional Login */}
            <div className="block mx-3 justify-center font-light">
            <form className="block" onSubmit={handlSubmit}>
                <div>
                <h1 className="text-3xl  sm:text-4xl border-b pb-1 border-gray-200 font-extralight mb-4">Register</h1>
                <div className="font-light ">
                    <h1 className="text-lg font-extralight sm:text-3xl">UserName: </h1>
                    <input className="rounded-md shadow-md sm:text-2xl" type="text" autoComplete="on" id="userName" required minLength={3} maxLength={40} />
                </div>
                <div className="font-light mt-3">
                    <h1 className="text-lg font-extralight sm:text-3xl">Email: </h1>
                    <input className="rounded-md shadow-md sm:text-2xl" type="email" autoComplete="on" id="userEmail" required minLength={3} maxLength={40} />
                </div>

                <div className="font-light">
                    <h1 className="text-lg font-extralight sm:text-3xl">Password: </h1>
                    <input className="rounded-md shadow-md sm:text-2xl" type="password" autoComplete="off" id="password" required minLength={3} maxLength={40} />
                </div>
                </div>

                <div>
                <button className="bg-green-700/80 p-2 rounded-md mt-8 shadow-md sm:text-2xl hover:bg-emerald-500/80 duration-300" type="submit">Submit</button>
                </div>
            </form>
            </div>

            {/* Social login Option */}
            <div className="mt-10">
                <SocialLogin />
            </div>
        </div>
    )
}