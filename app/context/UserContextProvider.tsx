'use client'

import { createContext, useContext, Dispatch, SetStateAction, useState } from 'react'

interface ContextProps {
    userName: string,
    setUserName: Dispatch<SetStateAction<string>>, 
    userID: string,
    setUserID: Dispatch<SetStateAction<string>>,
    verified: boolean,
    setVerified: Dispatch<SetStateAction<boolean>>,
    userPFP: string,
    setUserPFP: Dispatch<SetStateAction<string>>,
}

const UserContext = createContext<ContextProps>({
    userName: "",
    setUserName: () => "",
    userID: "",
    setUserID: () => "",
    verified: false,
    setVerified: () => false,
    userPFP: "", 
    setUserPFP: () => "",
})


// TODO: Set up user usecontext

export const UserContextProvider = ({ children }: any) => {
    const [ userName, setUserName ] = useState("")
    const [ userID, setUserID ] = useState("")
    const [ verified, setVerified ] = useState(false)
    const [ userPFP, setUserPFP ] = useState("")

    return (
        <UserContext.Provider value={{ userName: userName, setUserName: setUserName, userID: userID, setUserID: setUserID, verified: verified, setVerified: setVerified, userPFP: userPFP, setUserPFP: setUserPFP }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext)