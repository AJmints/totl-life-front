'use client'

import { useState } from "react"

const URL: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL

const HammockForm = () => {

    const [ userId, setUserId ] = useState()

    const createPack = async(e: any) => {
        e.preventDefault()

        console.log(e.target.model.value)
        setUserId(e.target.model.value)
    
        //Temp
        const createUsersPacks = await fetch( URL + "/backpack/get-users-gear-list/" + userId)
        const createPack = await createUsersPacks.json().catch((err) => {
            console.log(err)
        })
        console.log(createPack)
        //Temp

    }

    return (
        <form onSubmit={createPack}>
            
            <div className=' p-2 hover:bg-gray-600 duration-200 rounded-md'>
                <label className="text-gray-200 font-light mr-2" htmlFor='model'>Model:</label>
                <input 
                    className="rounded-md font-normal pl-2 w-36" 
                    type='text' 
                    autoComplete='off' 
                    placeholder="Tent Model"
                    name='model' 
                />
            </div>

            <button>submit</button>

        </form>
    )
}

export default HammockForm