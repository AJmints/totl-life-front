'use client'

import { createContext, useContext, Dispatch, SetStateAction, useState } from 'react'

interface ContextProps {
    desc: string,
    setDesc: Dispatch<SetStateAction<string>>, 
    logList: string[],
    setLogList: Dispatch<SetStateAction<any>>,
    activeLog: string,
    setActiveLog: Dispatch<SetStateAction<string>>,
    followingList: string[],
    setFollowingList: Dispatch<SetStateAction<any>>,
}

const RiverContext = createContext<ContextProps>({
    desc: "",
    setDesc: () => "",
    logList: [],
    setLogList: () => [],
    activeLog: "",
    setActiveLog: () => "",
    followingList: [], 
    setFollowingList: () => [],
})

export const RiverContextProvider = ({ children }: any) => {
    const [ desc, setDesc ] = useState("")
    const [ logList, setLogList ] = useState([])
    const [ activeLog, setActiveLog ] = useState("")
    const [ followingList, setFollowingList ] = useState([])

    return (
        <RiverContext.Provider value={{ desc, setDesc, logList, setLogList, activeLog, setActiveLog, followingList, setFollowingList }}>
            {children}
        </RiverContext.Provider>
    )
}

export const useRiverContext = () => useContext(RiverContext)