'use client'

import Image from "next/image"
import Link from "next/link"
import totlhome from '../../public/logo/totl-home.png'
import picDefault from '../../public/icons/profile-pic.png'
import arrow from '../../public/icons/Arrow.png'
import menuCompressed from '../../public/icons/menu-burger.png'
import { useState, useCallback, useEffect } from "react"
import { usePathname } from "next/navigation"
import LoginForm from "../login/LoginForm"
import UserOptions from "../user-profile/UserOptions"

export default function Header() {

    const [userLogged, setUserLogged] = useState<boolean>(false)
    const [menuToggle, setMenuToggle] = useState(false)
    const [aboutToggle, setAboutToggle] = useState(false)
    const [aboutTogglePhone, setAboutTogglePhone] = useState(false)
    const [loginToggle, setLoginToggle] = useState(false)
    const [userDetailsToggle, setUserDetailsToggle] = useState(true)

    const [routeChange, setRouteChange] = useState("")
    const pathname = usePathname()

    
    
    useEffect(function () {
        const detectRoute = () => {
            const url = `${pathname}`
            setRouteChange(url)
            if (routeChange !== url) {
                setMenuToggle(false)
                setLoginToggle(false)
            }
        }
        const checkLoginStatus = () => {
            if (sessionStorage.getItem("userName")) {
                setUserLogged(true)
            }
        }
        checkLoginStatus()
        detectRoute()

    }, [loginToggle, pathname])

    const logout = () => {
        sessionStorage.clear()
        localStorage.clear()
        setUserLogged(false)
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
                    <Link className="items-center flex text-gray-100 ml-5" href="/">Vibe</Link>
                    <Link className="items-center flex text-gray-100 ml-5" href="/forum">Forums</Link>
                    <Link className="items-center flex text-gray-100 ml-5" href="/dapp">Dapp</Link>
                    <div className="relative inline-block">
                        <div className="flex space-x-1">
                        <Link onMouseOver={() => setAboutToggle(prev => !prev)} onMouseLeave={() => setAboutToggle(prev => !prev)} className="items-center flex text-gray-100 ml-5" href="/about">About</Link>
                        <Image src={arrow} alt="" className={!aboutToggle ? "cursor-pointer w-6 h-6 -rotate-90 hover:bg-gray-400 bg-gray-500 rounded-md p-1 duration-300" : "cursor-pointer w-6 h-6 rotate-90 hover:bg-gray-400  rounded-md p-1 duration-300"} onClick={() => setAboutToggle(prev => !prev)} />
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
                    <Image 
                        src={picDefault}
                        alt=""
                        className="cursor-pointer h-14 w-14 sm:h-20 sm:w-20 bg-emerald-300 p-1 hover:p-0 hover:bg-emerald-600 duration-500 rounded-full"
                        onClick={() => setUserDetailsToggle(prev => !prev)}
                    />
                </div>
                {userDetailsToggle ? 
                <></>
                :
                <div className="fixed z-30 right-0 top-0 ">
                <div className="shadow-xl shadow-gray-800 relative bg-gray-700 h-screen">
                <div className="">
                <Image src={arrow} alt="" onClick={() => setUserDetailsToggle(prev => !prev)} className="cursor-pointer relative z-20 bg-gray-300 p-3 right-14 rounded-md shadow-lg top-20 w-16" />
                </div>
                <UserOptions 
                setUserLogged={setUserLogged}
                />
                </div>
                </div>
                }     
                <div className="hidden sm:block">
                    {/* <button onClick={() => logout()} className="bg-rose-700 p-2 text-gray-300 shadow-lg shadow-gray-800 rounded-md">Log Out</button> */}
                </div>
            </div>
            :
            <div className="items-center flex">
                <button onClick={() => setLoginToggle(prev => !prev)} className="m-3 hidden sm:block bg-gray-500 p-2 rounded-md shadow-lg hover:bg-yellow-500 hover:shadow-gray-800 duration-500">{loginToggle ? "Close" : "Login"}</button>
                
                {loginToggle ? 
                <div className="absolute top-24 z-10 right-0">
                    <LoginForm />
                </div>
                :
                <>
                </>
                }
                <Link className="m-3 bg-gray-500 p-2 rounded-md shadow-lg hover:bg-yellow-500 hover:shadow-gray-800 duration-500" href="/login">Login</Link>
                
            </div>}

            <div className={!menuToggle ? "hidden" : "sm:hidden fixed z-10 left-0"}>
                <div className="w-52 min-h-screen text-xl block bg-gray-300 rounded-md font-light">
                    <div className="items-center flex">
                        <button className="text-4xl ml-5 mt-3 font-light text-gray-700" onClick={() => setMenuToggle(prev => !prev)}>X</button> 
                    </div>
                    <div className="mt-5">
                    <Link className="m-2 mt-3 flex hover:bg-yellow-500 px-2 rounded-md duration-500 hover:shadow-lg shadow-gray-600" href="/">Vibe</Link>
                    <Link className="m-2 mt-3 flex hover:bg-yellow-500 px-2 rounded-md duration-500 hover:shadow-lg shadow-gray-600" href="/forum">Forums</Link>
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