'use client'

import Image from "next/image"
import Link from "next/link"
import totlhome from '../../public/logo/totl-home.png'
import menuCompressed from '../../public/icons/menu-burger.png'
import { useState } from "react"

export default function Header() {

    const [userLogged, setUserLogged] = useState(true)
    const [menuToggle, setMenuToggle] = useState(false)
    const [aboutToggle, setAboutToggle] = useState(false)

    return (
        <header className="flex bg-gray-700 justify-between xl:justify-around shadow-lg bg-shadow-900/90">
            
            <div className="sm:hidden  flex items-center">
                <Image 
                    src={menuCompressed}
                    alt=""
                    className="w-10 h-auto mx-3 sm:mx-5 cursor-pointer bg-gray-500 p-1 shadow-lg rounded-lg hover:shadow-gray-800/90"
                    onClick={() => setMenuToggle(prev => !prev)}
                />
            </div>
            
            {/* Logo */}
            <Link href="/">
            <Image
            src={totlhome}
            alt=""
            className="cursor-pointer w-auto sm:ml-10 h-20  hover:bg-gray-600 hover:shadow-lg px-1 m-1 rounded-md duration-300"
            priority={true}
            />
            </Link>

            {/* Links */}
            <div className="hidden sm:flex items-center">
                <nav className="flex ml-10 items-center">
                    <div>
                    <Link className="items-center flex text-gray-100 ml-5" href="">Vibe</Link>
                    </div>
                    <Link className="items-center flex text-gray-100 ml-5" href="">Forums</Link>
                    <Link className="items-center flex text-gray-100 ml-5" href="">Dapp</Link>
                    <div className="relative inline-block">
                        <Link onMouseOver={() => setAboutToggle(prev => !prev)} onMouseLeave={() => setAboutToggle(prev => !prev)} className="items-center flex text-gray-100 ml-5" href="/about">About</Link>
                            <div 
                                onMouseOver={() => setAboutToggle(true)} 
                                onMouseLeave={() => setAboutToggle(false)} 
                                className={aboutToggle ? "absolute block bg-gray-400 z-10 rounded-md py-2 px-3 left-3 shadow-lg shadow-gray-800/90" : "hidden"}
                            >
                            <div className="block min-w-max">
                            <Link className="m-2 flex hover:bg-yellow-500 px-2 rounded-md duration-500 hover:shadow-lg shadow-gray-600" href="/">TOTL Mission</Link>
                            <Link className="m-2 flex hover:bg-yellow-500 px-2 rounded-md duration-500 hover:shadow-lg shadow-gray-600" href="/">Meet the Team</Link>
                            <Link className="m-2 flex hover:bg-yellow-500 px-2 rounded-md duration-500 hover:shadow-lg shadow-gray-600" href="/">Current Initiative</Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

            { !userLogged ?
            <div>
                <button>Profile</button>
                <p>Image of user profile pic</p>
            </div>
            :
            <div className="items-center flex">
                <button className="m-3 bg-gray-500 p-2 rounded-md shadow-lg hover:bg-yellow-500 hover:shadow-gray-800 duration-500">Login</button>
                <button className="m-3 hidden sm:block bg-gray-500 p-2 rounded-md shadow-lg hover:bg-yellow-500 hover:shadow-gray-800 duration-500">Register</button>
            </div>}

            <div className={!menuToggle ? "hidden" : "fixed z-10 left-0"}>
                <div className="w-52 min-h-screen bg-gray-300 rounded-md">
                    <div className="bg-gray-200 flex">
                        <div className="just">
                            <button className="text-4xl" onClick={() => setMenuToggle(prev => !prev)}>x</button>
                        </div>

                    </div>
                </div>
            </div>
            

        </header>
    )
}