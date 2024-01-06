'use client'

import { createContext, useContext, Dispatch, SetStateAction, useState } from 'react'

interface ContextProps {
    desc: string,
    setDesc: Dispatch<SetStateAction<string>>
}

const LogDescription = createContext<ContextProps>({
    desc: "",
    setDesc: () => "",
})

export const LogDescriptionProvider = ({ children }: any) => {
    const [ desc, setDesc ] = useState("")

    return (
        <LogDescription.Provider value={{ desc, setDesc }}>
            {children}
        </LogDescription.Provider>
    )
}

export const useLogDescription = () => useContext(LogDescription)