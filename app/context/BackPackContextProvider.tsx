'use client'

import { createContext, useContext, Dispatch, SetStateAction, useState } from 'react'

interface ContextProps {
    userGearList: any[],
    setUserGearList: Dispatch<SetStateAction<any[]>>
}

const BackPackContext = createContext<ContextProps>({
    userGearList: [], 
    setUserGearList: () => []
})

export const BackPackContextProvider = ({ children }: any) => {
    const [ userGearList, setUserGearList ] = useState<any[]>([])

    return (
        <BackPackContext.Provider value={{ userGearList, setUserGearList }}>
            {children}
        </BackPackContext.Provider>
    )
}

export const useBackPackContext = () => useContext(BackPackContext)