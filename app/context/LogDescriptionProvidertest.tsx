'use client'

import { createContext, useContext, Dispatch, SetStateAction, useState } from 'react'

interface ContextProps {
    desc: string,
    setDesc: Dispatch<SetStateAction<string>>, 
    logList: string[],
    setLogList: Dispatch<SetStateAction<any>>,
}

const LogDescription = createContext<ContextProps>({
    desc: "",
    setDesc: () => "",
    logList: [],
    setLogList: () => []
})

export const LogDescriptionProvider = ({ children }: any) => {
    const [ desc, setDesc ] = useState("")
    const [ logList, setLogList ] = useState([])

    return (
        <LogDescription.Provider value={{ desc, setDesc, logList, setLogList }}>
            {children}
        </LogDescription.Provider>
    )
}

export const useLogDescription = () => useContext(LogDescription)