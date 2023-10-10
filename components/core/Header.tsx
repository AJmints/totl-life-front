'use client'

import Image from "next/image"
import Link from "next/link"
import totlhome from '../../public/logo/totl-home.png'
import picDefault from '../../public/icons/profile-pic.png'
import arrow from '../../public/icons/Arrow.png'
import menuCompressed from '../../public/icons/menu-burger.png'
import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import LoginForm from "../login/LoginForm"
import UserOptionsConst from "../user-profile/UserOptionsConst"


export const serverSideProps = async() => {
    const infoCall = await fetch("/api/logout")
   const status = await infoCall.json().catch((err) => {
       console.log(err)
   })
   console.log(status)
}

export const authCheck = async() => {
    const infoCall = await fetch("/api/authCheck")
    const status = await infoCall.json().catch((err) => {
        console.log(err)
    })
    if (status.loggedIn === true) {
        return true
    } else {
        return false
    }
}


export default function Header() {

    const [userLogged, setUserLogged] = useState<boolean>(false)
    const [menuToggle, setMenuToggle] = useState(false)
    const [aboutToggle, setAboutToggle] = useState(false)
    const [aboutTogglePhone, setAboutTogglePhone] = useState(false)
    const [loginToggle, setLoginToggle] = useState(false)
    const [userDetailsToggle, setUserDetailsToggle] = useState(false)

    const [routeChange, setRouteChange] = useState("")
    const pathname = usePathname()
    const router = useRouter()

    const [userPFP, setUserPFP] = useState(null)
    
    
    useEffect(function () {
        
        const detectRoute = () => {
            const url = `${pathname}`
            setRouteChange(url)
            if (routeChange !== url) {
                setMenuToggle(false)
                setLoginToggle(false)
            }
        }
        const checkLoginStatus = async () => {
            const logged = await authCheck()
            if (logged) {
                setUserLogged(true)
            } else {
                setUserLogged(false)
            }
        }
        checkLoginStatus()
        detectRoute()

    }, [loginToggle, pathname, userLogged])

    const logout = () => {
        setUserDetailsToggle(false)
        setLoginToggle(false)
        setUserLogged(false)
        serverSideProps()
        router.push("/")
    }

    return (
        <header className="flex bg-gray-700 justify-between xl:justify-around shadow-lg bg-shadow-900/90">
            
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
            <div className="sm:ml-10">
            <Link href="/">
            <Image
            src={totlhome}
            alt=""
            className="cursor-pointer w-auto flex h-20 sm:h-24 hover:bg-gray-600 hover:shadow-lg px-1 rounded-md duration-300"
            priority={true}
            />
            </Link>
            </div>

            {/* Links tablet/laptop display*/}
            <div className="hidden sm:flex items-center">
                <nav className="flex ml-10 items-center">
                    <Link className="items-center flex text-gray-100 ml-5" href="/bales">Bales</Link>
                    <Link className="items-center flex text-gray-100 ml-5" href="/dapp">Dapp</Link>
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
                <div>
                    {userPFP !== null ? 
                    <Image 
                        src={userPFP}
                        alt=""
                        width={100}
                        height={100}
                        className="cursor-pointer h-14 w-14 sm:h-20 sm:w-20 bg-emerald-300 p-1 hover:p-0 hover:bg-emerald-600 duration-500 rounded-full"
                        onClick={() => setUserDetailsToggle(prev => !prev)}
                    />
                    :
                    <Image 
                        src={picDefault}
                        alt=""
                        className="cursor-pointer h-14 w-14 sm:h-20 sm:w-20 bg-emerald-300 p-1 hover:p-0 hover:bg-emerald-600 duration-500 rounded-full"
                        onClick={() => setUserDetailsToggle(prev => !prev)}
                    />
                    }
                </div>
                {/* Open user sidebard from Profile Icon */}
                    <UserOptionsConst
                    logout={logout}
                    userDetailsToggle={userDetailsToggle}
                    setUserDetailsToggle={setUserDetailsToggle}
                    userPFP={userPFP}
                    setUserPFP={setUserPFP}
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
            <div className={!menuToggle ? "hidden" : "sm:hidden fixed z-10 left-0"}>
                <div className="w-52 min-h-screen text-xl block bg-gray-300 rounded-md font-light">
                    <div className="items-center flex">
                        <button className="text-4xl ml-5 mt-3 font-light text-gray-700" onClick={() => setMenuToggle(prev => !prev)}>X</button> 
                    </div>
                    <div className="mt-5">
                    <Link className="m-2 mt-3 flex hover:bg-yellow-500 px-2 rounded-md duration-500 hover:shadow-lg shadow-gray-600" href="/bales">Bales</Link>
                    <Link className="m-2 mt-3 flex hover:bg-yellow-500 px-2 rounded-md duration-500 hover:shadow-lg shadow-gray-600" href="/dapp">Dapp</Link>
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