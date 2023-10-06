import Image from "next/image"
import aboutView from '../../public/images/about-view.jpg'

export default function AboutAll() {

    return (
        <div className="mb-5 flex">
            <div className="flex mx-2 justify-center">
                <div className="block">
                <div className="flex justify-center">
                <h1 className="text-center mt-5 sm:mt-20 bg-gray-100 p-5 text-2xl rounded-md mx-5">Introduction</h1>
                </div>
                <Image
                    src={aboutView}
                    alt=""
                    className="w-96 h-auto mx-auto mt-5 p-2 rounded-md bg-gray-100"
                />
                <div className="flex justify-center">
                <p className="text-center mt-5 bg-gray-100 p-5 rounded-md mx-5">Welcome to TOTL.life, where 
                we are a collective striving to engage in Sustainable Stewardship, in Missouri and beyond. 
                Our mission is rooted in the ethos of responsible and lasting care for our environment, 
                aiming for a positive impact that resonates far into the future. At TOTL.life, we believe in 
                doing good with purpose, and our journey towards Sustainable Stewardship starts here.</p>
                </div>
                </div><br/>
                
            </div>
        </div>
    )
}