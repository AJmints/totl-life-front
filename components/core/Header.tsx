'use client'

import Image from "next/image"
import Link from "next/link"
import totlhome from '../../public/logo/logo-no-background.png'
import picDefault from '../../public/icons/profile-pic.png'
import arrow from '../../public/icons/Arrow.png'
import menuCompressed from '../../public/icons/menu-burger.png'
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import LoginForm from "../login/LoginForm"
import UserOptionsConst from "../user-profile/sidebar-menu/UserOptionsConst"
import LogSelect from "./header-parts/LogSelect"
import { useUserContext } from "@/app/context/UserContextProvider"
import CollapsedMenu from "./phone-view/CollapsedMenu"

let USER_ID: string = ""
const URL: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL

export const serverSideProps = async () => {
    await fetch("/api/logout")
}

export const authCheck = () => {
    // const infoCall = 
    return fetch("/api/authCheck").then((response) => response.json()).then((status: any) => {
        if (status.loggedIn === true) {
                USER_ID = status.id
                return true
            } else {
                return false
            }
    })
    
}

export default function Header() {

    const [userLogged, setUserLogged] = useState<boolean>(false)
    const [menuToggle, setMenuToggle] = useState<boolean>(false)
    const [aboutToggle, setAboutToggle] = useState<boolean>(false)
    const [aboutTogglePhone, setAboutTogglePhone] = useState<boolean>(false)
    const [loginToggle, setLoginToggle] = useState<boolean>(false)
    const [loadingHeader, setLoadingHeader] = useState<boolean>(true)
    const [userDetailsToggle, setUserDetailsToggle] = useState<boolean>(false)
    const [selectLog, setSelectLog] = useState<string[]>([])
    const router = useRouter()

    const { setUserID, setUserName, setVerified, userPFP, setUserPFP, setCreatedLogs, setLogFollowList } = useUserContext()
    
    
    useEffect(() => {
        const checkLoginStatus = async() => {
            setLoadingHeader(true)
            const logged = await authCheck()
            if (logged === undefined) {
                location.reload()
            } else if (logged) {
                setUserContext()
                return
            } else {
                setUserLogged(false)
                setLoadingHeader(false)
            }
        }
        const setUserContext = () => {
            fetch( URL + "/profile/userInfo/" + USER_ID).then((response) => response.json()).then((response: any) => {
                if (response.userName) {
                    setUserID(response.userId)
                    setUserName(response.userName)
                    setVerified(response.accountVerified)
                    setCreatedLogs(response.createdLogs)
                    setLogFollowList(response.logFollowList)
                        if (response.pfp) {
                            setUserPFP('data:image/jpeg;base64,' + response.pfp.image)
                        } else {
                            setUserPFP(null)
                        }
                    }
                    setUserLogged(true)
                    setLoadingHeader(false)
                    return
            })
            
        }
        
        checkLoginStatus() 
        
    }, [userLogged, userPFP])

    const logout = async() => {

        await serverSideProps()
        setUserLogged(false)
        setUserDetailsToggle(false)
        setLoginToggle(false)
        setUserID("") 
        setUserName("")
        setVerified(false)
        setUserPFP(null)
        router.push("/")
        
    }

    return (
        <header id="top" className="absolute top-0 flex w-screen mb-10 bg-gray-700 justify-between xl:justify-around shadow-lg bg-shadow-900/90">
            
            {/* Logo */}
            
            <div className="sm:ml-10 flex items-center ml-2">
            <Link className="group shadow-md cursor-pointer hover:bg-gray-800/50 flex items-center bg-gray-600 rounded-md hover:shadow-md hover:shadow-emerald-400 duration-200" href="/">
            <div>
                <p className="text-gray-200 text-3xl mx-1 font-mono">TOTL</p>
            </div>
            
            <Image
            src={totlhome}
            alt=""
            className="cursor-pointer group-hover:bg-gray-900/60 bg-gray-800/80 w-auto h-12 sm:h-12 border-[1px] pb-0.5 px-0.5 rounded-md"
            priority={true}
            />
            </Link>
            </div>

            
            
            
            {/* Select Log drop-down menu when screen not in phone view*/}
            

            {/* Links tablet/laptop display*/}
            <div className="hidden sm:flex items-center">
                <nav className="flex  items-center">
                    { userLogged && <div className="hidden sm:flex">
                        <LogSelect 
                        selectLog={selectLog}
                        setSelectLog={setSelectLog}
                        />
                    </div>}
                    {/* <Link className="items-center flex text-gray-100 ml-5" href="/river">River</Link> */}
                    {/* <Link className="items-center flex text-gray-100 ml-5" href="/logs">Logs</Link> */}
                    {/* <Link className="items-center flex text-gray-100 ml-5" href="/dapp">Dapp</Link> */}
                    <div className="relative inline-block">
                        <div className="flex space-x-1">
                        <Link onMouseOver={() => setAboutToggle(prev => !prev)} onMouseLeave={() => setAboutToggle(prev => !prev)} className="items-center flex text-gray-100 ml-5" href="/about">About</Link>
                        <Image onMouseLeave={() => setAboutToggle(false)} src={arrow} alt="" className={!aboutToggle ? "cursor-pointer w-6 h-6 -rotate-90 hover:bg-gray-400 bg-gray-500 rounded-md p-1 duration-300" : "cursor-pointer w-6 h-6 rotate-90 hover:bg-gray-400  rounded-md p-1 duration-300"} onClick={() => setAboutToggle(prev => !prev)} />
                        </div>
                            <div 
                                onMouseOver={() => setAboutToggle(true)} 
                                onMouseLeave={() => setAboutToggle(false)}
                                className={aboutToggle ? "absolute block bg-gray-400 z-10 rounded-md py-2 px-3 left-3 shadow-lg shadow-gray-800/90" : "hidden"}
                            >
                            <div className="block min-w-max">
                            <Link className="m-2 flex hover:bg-yellow-500 px-2 rounded-md duration-500 hover:shadow-lg shadow-gray-600" href="/about#Initiative">Current Initiative</Link>
                            <Link className="m-2 flex hover:bg-yellow-500 px-2 rounded-md duration-500 hover:shadow-lg shadow-gray-600" href="/about#Lifestyle">TOTL Lifestyle</Link>
                            <Link className="m-2 flex hover:bg-yellow-500 px-2 rounded-md duration-500 hover:shadow-lg shadow-gray-600" href="/about#MeetUs">Meet the Team</Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

            <div className="flex gap-4">
                {/* Hamburger menu in phone view */}
                    <div className="sm:hidden group flex items-center -bottom-0">
                        <Image 
                            src={menuCompressed}
                            alt=""
                            className="w-10 h-auto ml-2 sm:mx-5 cursor-pointer bg-gray-500 p-1 shadow-lg rounded-lg hover:shadow-gray-800/90"
                            onMouseOver={() => setMenuToggle(true)}
                        />

                        <div onMouseLeave={() => setMenuToggle(false) }>
                            {/* Open hamburger menu when in phone view */}
                            <CollapsedMenu
                            menuToggle={menuToggle}
                            setMenuToggle={setMenuToggle}
                            selectLog={selectLog}
                            setSelectLog={setSelectLog}
                            arrow={arrow}
                            aboutTogglePhone={aboutTogglePhone}
                            setAboutTogglePhone={setAboutTogglePhone}
                            userLogged={userLogged}
                            />
                        </div>
                    </div>
                {/* True: User Profile button option */}
                {/* False: Login or Register */}
                    { userLogged ?
                        <div className="flex items-center pt-3 pb-2 mr-2 sm:mx-5 space-x-5">
                            <div className="group flex ">
                                <Image 
                                src={ userPFP === null ? picDefault : userPFP}
                                alt=""
                                width={100}
                                height={100}
                                className="cursor-pointer h-12 w-12 bg-emerald-300 p-1 hover:p-0 hover:bg-emerald-600 duration-500 rounded-full"
                                onClick={() => setUserDetailsToggle(prev => !prev)}
                                />
                                <div className="hidden group-hover:flex transition-opacity ease-in duration-400 opacity-0 hover:opacity-100 absolute">
                            {/* Open user sidebard from Profile Icon */}
                                <UserOptionsConst
                                logout={logout}
                                userLogged={userLogged}
                                userDetailsToggle={userDetailsToggle}
                                setUserDetailsToggle={setUserDetailsToggle}
                                setUserLogged={setUserLogged}
                                />  
                            </div> 
                            </div>
                        </div>
                        :
                        <>
                            {!loadingHeader ? 
                            <div className="items-center flex">
                                <button onClick={() => setLoginToggle(prev => !prev)} className="m-3 block bg-gray-500 p-2 rounded-md shadow-lg hover:bg-yellow-500 hover:shadow-gray-800 duration-500">{loginToggle ? "Close" : "Login"}</button>
                                
                                {loginToggle ? 
                                <div className="absolute top-24 z-10 right-0 xl:right-32">
                                    <LoginForm
                                    setLoginToggle={setLoginToggle}
                                    setUserLogged={setUserLogged}
                                    userLogged={userLogged}
                                    setLoadingHeader={setLoadingHeader}
                                    />
                                </div>
                                :
                                <>
                                </>
                                }
                            </div>
                            :
                            <div className=" flex items-center">
                                <div className="p-1 m-3 bg-emerald-300 rounded-md">
                                    <button className="bg-gray-500 flex animate-pulse py-4 px-6 rounded-md shadow-lg hover:bg-yellow-500 hover:shadow-gray-800 duration-500"></button>
                                </div>
                            </div>
                            }
                        </>
                    }
            </div>

            
            

        </header>
    )
}