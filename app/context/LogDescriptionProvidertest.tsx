'use client'

import { createContext, useContext, Dispatch, SetStateAction, useState } from 'react'

interface ContextProps {
    desc: string,
    setDesc: Dispatch<SetStateAction<string>>,
    onLog: string,
    setOnLog: Dispatch<SetStateAction<string>>,
}

const LogDescription = createContext<ContextProps>({
    desc: "",
    setDesc: () => "",
    onLog: "",
    setOnLog: () => ""
})

export const LogDescriptionProvider = ({ children }: any) => {
    const [ desc, setDesc ] = useState("")
    const [onLog, setOnLog] = useState("")

    return (
        <LogDescription.Provider value={{ desc, setDesc, onLog, setOnLog }}>
            {children}
        </LogDescription.Provider>
    )
}

export const useLogDescription = () => useContext(LogDescription)