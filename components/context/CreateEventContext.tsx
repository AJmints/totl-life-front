'use client'

import { createContext, useContext, Dispatch, SetStateAction, useState } from 'react'

type ContextProps = {
    relatedEvents: any,
    setRelatedEvents: Dispatch<SetStateAction<any>>,
}

const CreateEventContext = createContext<ContextProps>({
    relatedEvents: [],
    setRelatedEvents: () => []
})

/* Declare in Layout */

export const CreateEventContextProvider = ({ children }: any) => {
    const [ relatedEvents, setRelatedEvents ] = useState<any[]>([])

    return (
        <CreateEventContext.Provider value={{ relatedEvents:relatedEvents, setRelatedEvents:setRelatedEvents}}>
        {children}
        </CreateEventContext.Provider>
    )
}

export const useCreateEventContext = () => useContext(CreateEventContext)