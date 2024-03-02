'use client'

import Image from "next/image"
import Link from "next/link"
import totlhome from '../../public/logo/totl-home.png'
import picDefault from '../../public/icons/profile-pic.png'
import arrow from '../../public/icons/Arrow.png'
import menuCompressed from '../../public/icons/menu-burger.png'
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import LoginForm from "../login/LoginForm"
import UserOptionsConst from "../user-profile/sidebar-menu/UserOptionsConst"
import LogSelect from "./header-parts/LogSelect"
import { useUserContext } from "@/app/context/UserContextProvider"
import { useRiverContext } from "@/app/context/RiverContextProvider"

let USER_ID: string = ""
const URL: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL

export const serverSideProps = () => {
    fetch("/api/logout")
}

export const authCheck = async() => {
    const infoCall = await fetch("/api/authCheck")
    const status = await infoCall.json().catch((err) => {
        console.log(err)
    })
    if (status.loggedIn === true) {
        USER_ID = status.id
        return true
    } else {
        return false
    }
}

export default function Header() {

    const [userLogged, setUserLogged] = useState<boolean>(false)
    const [menuToggle, setMenuToggle] = useState<boolean>(false)
    const [aboutToggle, setAboutToggle] = useState<boolean>(false)
    const [aboutTogglePhone, setAboutTogglePhone] = useState<boolean>(false)
    const [loginToggle, setLoginToggle] = useState<boolean>(false)
    const [userDetailsToggle, setUserDetailsToggle] = useState<boolean>(false)
    const [selectLog, setSelectLog] = useState<string[]>([])
    const router = useRouter()

    const { setUserID, setUserName, setVerified, userPFP, setUserPFP } = useUserContext()
    const { setFollowingList} = useRiverContext()
    
    
    useEffect(() => {
        const checkLoginStatus = async () => {
            const logged = await authCheck()
            if (await logged) {
                setUserLogged(true)
                setUserContext()
                return
            } else {
                setUserLogged(false)
            }
        }
        const setUserContext = async () => {
            const getUserContext = await fetch( URL + "/profile/userInfo/" + USER_ID)
            const response = await getUserContext.json().catch(err => {
                console.log(err)
            })
            if (await response.userName) {
            setUserID(response.userId)
            setUserName(response.userName)
            setVerified(response.accountVerified)
                if (response.pfp) {
                    setUserPFP('data:image/jpeg;base64,' + response.pfp.image)
                } else {
                    setUserPFP(null)
                }
            }

            USER_ID = ""
            return
        }
        
        checkLoginStatus() 
        
        
    }, [userLogged, userPFP])

    const logout = () => {
        
        setUserLogged(false)
        setUserDetailsToggle(false)
        setLoginToggle(false)
        
        serverSideProps()
        setFollowingList([])
        setUserID("") 
        setUserName("")
        setVerified(false)
        setUserPFP(null)
        router.push("/")
        
    }

    return (
        <header id="top" className="flex bg-gray-700 justify-between xl:justify-around shadow-lg bg-shadow-900/90">
            
            {/* Hamburger menu in phone view */}
            <div className="sm:hidden  flex items-center">
                <Image 
                    src={menuCompressed}
                    alt=""
                    className="w-10 h-auto ml-2 sm:mx-5 cursor-pointer bg-gray-500 p-1 shadow-lg rounded-lg hover:shadow-gray-800/90"
                    onClick={() => setMenuToggle(prev => !prev)}
                />
            </div>
            
            {/* Logo */}
            <div className="sm:ml-10 flex items-center">
            <Link href="/">
            <Image
            src={totlhome}
            alt=""
            className="cursor-pointer w-auto h-14 sm:h-14 hover:bg-gray-600 hover:shadow-lg px-1 rounded-md duration-300"
            priority={true}
            />
            </Link>
            </div>

            {/* Select Log drop-down menu when screen not in phone view*/}
            <div className="hidden sm:flex">
                <LogSelect 
                selectLog={selectLog}
                setSelectLog={setSelectLog}
                />
            </div>

            {/* Links tablet/laptop display*/}
            <div className="hidden sm:flex items-center">
                <nav className="flex  items-center">
                    <Link className="items-center flex text-gray-100 ml-5" href="/river">River</Link>
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

            {/* True: User Profile button option */}
            {/* False: Login or Register */}
            { userLogged ?
            <div className="flex items-center pt-3 pb-2 mr-2 sm:mx-5 space-x-5">
                {/* <UserProfileButton 
                setUserID={setUserID}
                setUserName={setUserName}
                setVerified={setVerified}
                setUserPFP={setUserPFP}
                USER_ID={USER_ID}
                setUserLogged={setUserLogged}
                /> */}
                <div>
                    {userPFP !== null && userPFP !== "data:image/jpeg;base64" ? 
                    <Image 
                        src={userPFP}
                        alt=""
                        width={100}
                        height={100}
                        className="cursor-pointer h-12 w-12 bg-emerald-300 p-1 hover:p-0 hover:bg-emerald-600 duration-500 rounded-full"
                        onClick={() => setUserDetailsToggle(prev => !prev)}
                    />
                    :
                    <Image 
                        src={picDefault}
                        alt=""
                        className="cursor-pointer h-12 w-12 bg-emerald-300 p-1 hover:p-0 hover:bg-emerald-600 duration-500 rounded-full"
                        onClick={() => setUserDetailsToggle(prev => !prev)}
                    />
                    }
                </div>
                {/* Open user sidebard from Profile Icon */}
                    <UserOptionsConst
                    logout={logout}
                    userLogged={userLogged}
                    userDetailsToggle={userDetailsToggle}
                    setUserDetailsToggle={setUserDetailsToggle}
                    setUserLogged={setUserLogged}
                    />   
                <div>
                </div>
            </div>
            :
            <div className="items-center flex">
                <button onClick={() => setLoginToggle(prev => !prev)} className="m-3 block bg-gray-500 p-2 rounded-md shadow-lg hover:bg-yellow-500 hover:shadow-gray-800 duration-500">{loginToggle ? "Close" : "Login"}</button>
                
                {loginToggle ? 
                <div className="absolute top-24 z-10 right-0">
                    <LoginForm
                    setLoginToggle={setLoginToggle}
                    setUserLogged={setUserLogged}
                    userLogged={userLogged}
                     />
                </div>
                :
                <>
                </>
                }
            </div>
            }

            {/* Open hamburger menu when in phone view */}
            <div className={!menuToggle ? "hidden" : "sm:hidden fixed z-20 left-0"}>
                <div className="w-52 min-h-screen text-xl block bg-gray-300 rounded-md font-light">
                    <div className="items-center flex">
                        <button className="text-4xl ml-5 mt-3 font-light text-gray-700" onClick={() => setMenuToggle(prev => !prev)}>X</button> 
                    </div>

                    <div>
                        <LogSelect
                        selectLog={selectLog}
                        setSelectLog={setSelectLog}
                        />
                    </div>

                    <div className="mt-5">
                    <Link className="m-2 mt-3 flex hover:bg-yellow-500 px-2 rounded-md duration-500 hover:shadow-lg shadow-gray-600" href="/river">River</Link>
                    {/* <Link className="m-2 mt-3 flex hover:bg-yellow-500 px-2 rounded-md duration-500 hover:shadow-lg shadow-gray-600" href="/logs">Logs</Link> */}
                    {/* <Link className="m-2 mt-3 flex hover:bg-yellow-500 px-2 rounded-md duration-500 hover:shadow-lg shadow-gray-600" href="/dapp">Dapp</Link> */}
                    <div className="flex items-center">
                    <Link className="m-2 flex hover:bg-yellow-500 px-2 rounded-md duration-500 hover:shadow-lg shadow-gray-600" href="/about">About</Link>
                    <Image src={arrow} alt="" className={aboutTogglePhone ? "cursor-pointer w-6 h-6 -rotate-90 hover:bg-gray-400 rounded-md p-1 duration-300" : "cursor-pointer w-6 h-6 rotate-90 hover:bg-gray-400 rounded-md p-1 duration-300"} onClick={() => setAboutTogglePhone(prev => !prev)} />
                    </div>
                    {aboutTogglePhone ?
                    <div className="ml-2" >
                        <Link className="m-2 mt-3 flex hover:bg-yellow-500 px-2 rounded-md duration-500 hover:shadow-lg shadow-gray-600" href="/about#Initiative">-Current Initiative</Link>      
                        <Link className="m-2 mt-3 flex hover:bg-yellow-500 px-2 rounded-md duration-500 hover:shadow-lg shadow-gray-600" href="/about#Lifestyle">-TOTL Lifestyle</Link>
                        <Link className="m-2 mt-3  flex hover:bg-yellow-500 px-2 rounded-md duration-500 hover:shadow-lg shadow-gray-600" href="/about#MeetUs">-Meet the Team</Link>
 
                    </div>
                    :
                    ""
                    }

                    </div>
                </div>
            </div>
            

        </header>
    )
}