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
    setLogFollowList: Dispatch<SetStateAction<any>>,
    createdLogs: string[],
    setCreatedLogs: Dispatch<SetStateAction<any>>,
    userGearList: any[],
    setUserGearList: Dispatch<SetStateAction<any>>,
    packImages: any[],
    setPackImages: Dispatch<SetStateAction<any>>,
    userPackConfigs: any[],
    setUserPackConfigs: Dispatch<SetStateAction<any>>
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
    userGearList: [],
    setUserGearList: () => [],
    packImages: [],
    setPackImages: () => [],
    userPackConfigs: [],
    setUserPackConfigs: () => []
})

export const UserContextProvider = ({ children }: any) => {
    const [ userName, setUserName ] = useState("")
    const [ userID, setUserID ] = useState("")
    const [ verified, setVerified ] = useState(false)
    const [ userPFP, setUserPFP ] = useState<any>(null)
    const [ logFollowList, setLogFollowList ] = useState([])
    const [ createdLogs, setCreatedLogs ] = useState([])
    const [ userGearList, setUserGearList ] = useState<any[]>([])
    const [ packImages, setPackImages ] = useState<any[]>([])
    const [ userPackConfigs, setUserPackConfigs] = useState<any[]>([])

    return (
        <UserContext.Provider value={{ userName: userName, setUserName: setUserName, userID: userID, setUserID: setUserID, verified: verified, setVerified: setVerified, userPFP: userPFP, setUserPFP: setUserPFP, logFollowList: logFollowList, setLogFollowList: setLogFollowList, createdLogs: createdLogs, setCreatedLogs: setCreatedLogs, userGearList: userGearList, setUserGearList: setUserGearList, packImages: packImages, setPackImages: setPackImages, userPackConfigs: userPackConfigs, setUserPackConfigs: setUserPackConfigs }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext)