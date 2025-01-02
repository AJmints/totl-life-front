'use client'

import { createContext, useContext, Dispatch, SetStateAction, useState } from 'react'

type ContextProps = {
    eventFormDetails: any,
    setEventFormDetails: Dispatch<SetStateAction<any>>,
}

const CreateEventContext = createContext<ContextProps>({
    eventFormDetails: {},
    setEventFormDetails: () => {}
})

/* Declare in Layout */

export const CreateEventContextProvider = ({ children }: any) => {
    const [ eventFormDetails, setEventFormDetails ] = useState<any>()

    return (
        <CreateEventContext.Provider value={{ eventFormDetails:eventFormDetails, setEventFormDetails:setEventFormDetails}}>
        {children}
        </CreateEventContext.Provider>
    )
}