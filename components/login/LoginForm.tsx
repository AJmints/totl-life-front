'use client'

export default function LoginForm() {

    const handlSubmit = () => {

    }

    return (
        <div className=" bg-gray-400 mx-2 p-3 rounded-md shadow-lg shadow-gray-900">
            
            {/* Traditional Login */}
            <form onSubmit={handlSubmit}>
                <h1>Login</h1>
                <div className="mt-3">
                    <h1>UserAccount: </h1>
                    <input className="rounded-md" type="text" autoComplete="off" id="userAccount" required minLength={3} maxLength={40} />
                </div>

                <div>
                    <h1>Password: </h1>
                    <input className="rounded-md" type="text" autoComplete="off" id="password" required minLength={3} maxLength={40} />
                </div>

                <button className="bg-green-500/80 p-2 rounded-md mt-3" type="submit">Submit</button>
            </form>

            {/* Social login Option */}
            <div className="mt-5">
                <p>Find how to set up social login</p>
            </div>
        </div>
    )
}