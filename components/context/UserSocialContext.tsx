'use client'

import { createContext, useContext, Dispatch, SetStateAction, useState } from 'react'

type ContextProps = {
    userFriendList: any[],
    setUserFriendList: Dispatch<SetStateAction<any>>,
    userTurtleRequestList: any[],
    setUserTurtleRequestList: Dispatch<SetStateAction<any>>
}

const UserSocialContext = createContext<ContextProps>({
    userFriendList: [],
    setUserFriendList: () => [],
    userTurtleRequestList: [], 
    setUserTurtleRequestList: () => []
})

export const UserSocialContextProvider = ({ children }: any) => {
    const [ userFriendList, setUserFriendList ] = useState<any[]>([])
    const [ userTurtleRequestList, setUserTurtleRequestList ] = useState<any[]>([])

    return (
        <UserSocialContext.Provider value={{ userFriendList: userFriendList, setUserFriendList: setUserFriendList, userTurtleRequestList: userTurtleRequestList, setUserTurtleRequestList: setUserTurtleRequestList }}>
            {children}
        </UserSocialContext.Provider>
    )
}

export const useUserSocialContext = () => useContext(UserSocialContext)