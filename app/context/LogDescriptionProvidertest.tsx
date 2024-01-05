'use client'

import { createContext, useContext, useState } from 'react'

const LogDescription = createContext({})

export const LogDescriptionProvider = ({ logDesc }: any) => {
    const [ desc, setDesc ] = useState<string>("Provider")

    return (
        <LogDescription.Provider value={{ desc, setDesc }}>
            {logDesc}
        </LogDescription.Provider>
    )
}

export const useLogDescription = () => useContext(LogDescription)