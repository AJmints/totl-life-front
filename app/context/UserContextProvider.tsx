'use client'

import { createContext, useContext, Dispatch, SetStateAction, useState } from 'react'

type ContextProps = {
    userName: string,
    setUserName: Dispatch<SetStateAction<string>>, 
    userID: string,
    setUserID: Dispatch<SetStateAction<string>>,
    verified: boolean,
    setVerified: Dispatch<SetStateAction<boolean>>,
    userPFP: any,
    setUserPFP: Dispatch<SetStateAction<any>>,
    logFollowList: string[],
    setLogFollowList: any,
    createdLogs: string[],
    setCreatedLogs: any
}

const UserContext = createContext<ContextProps>({
    userName: "",
    setUserName: () => "",
    userID: "",
    setUserID: () => "",
    verified: false,
    setVerified: () => null,
    userPFP: "", 
    setUserPFP: () => null,
    logFollowList: [],
    setLogFollowList: () => [],
    createdLogs: [], 
    setCreatedLogs: () => [],
})

export const UserContextProvider = ({ children }: any) => {
    const [ userName, setUserName ] = useState("")
    const [ userID, setUserID ] = useState("")
    const [ verified, setVerified ] = useState(false)
    const [ userPFP, setUserPFP ] = useState<any>(null)
    const [ logFollowList, setLogFollowList ] = useState([])
    const [ createdLogs, setCreatedLogs ] = useState([])

    return (
        <UserContext.Provider value={{ userName: userName, setUserName: setUserName, userID: userID, setUserID: setUserID, verified: verified, setVerified: setVerified, userPFP: userPFP, setUserPFP: setUserPFP, logFollowList: logFollowList, setLogFollowList: setLogFollowList, createdLogs: createdLogs, setCreatedLogs: setCreatedLogs }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext)