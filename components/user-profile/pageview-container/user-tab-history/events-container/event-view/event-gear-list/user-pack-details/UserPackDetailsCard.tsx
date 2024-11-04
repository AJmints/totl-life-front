'use client'

import { useState } from "react"

const UserPackDetailsCard = () => {

    const [toggle, setToggle] = useState(false)

    return (
        <div className="bg-gray-400 p-1 rounded-md flex flex-col gap-2">
            <div className="bg-gray-300 p-1 rounded-md flex justify-between">
                <div className="bg-gray-200 p-1 rounded-md w-[50%]">
                    <p>User: Name</p>
                    <p>Pack: Name</p>
                </div>
                <div className="bg-gray-200 p-1 h-28 rounded-md">
                    <p>Pack Image</p>
                </div>
            </div>

            <div className="bg-gray-300 p-1 rounded-md flex justify-between">
                <p>Missing : 3 from rec list</p>
                <div>
                    <button onClick={() => setToggle((prev: any) => !prev)} className="px-2 py-1 bg-gray-400 rounded-md">{!toggle ? "view" : "hide"}</button>
                </div>
            </div>
            <div className={"bg-gray-300 p1 rounded-md flex flex-col" + (!toggle ? " hidden" : " ")}>
                <p>List</p>
            </div>
        </div>
    )
}

export default UserPackDetailsCard