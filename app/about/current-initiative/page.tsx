import Image from "next/image"
import riverView from "../../../public/images/river-view.jpg"

export default function AboutInitiativePage() {

    return (
        <div className="flex mb-5">
            <div className="flex justify-center">
                <div className="mx-5">
                <div className="flex justify-center text-3xl">
                <h1 className=" mt-20 bg-gray-100 p-5 rounded-md">River Cleanup 2024</h1>
                </div>
                <Image
                    src={riverView}
                    alt=""
                    className="w-72 h-auto mx-auto mt-5 bg-gray-100 p-2 rounded-md"
                />
                <div className=" mt-5 bg-gray-100 p-5 rounded-md">
                <h1>&#39;River Cleanup 2024,&#39; 
                embodies our philosophy of &#39;We don&#39;t do much, but when we do, it is to help.&#39; 
                Join us as we roll up our sleeves and work together to protect and restore our local rivers. 
                Together, we can make a significant impact on the environment and the communities that rely 
                on these waterways</h1><br/>
                <p>The details for this event are 
                pending, but once Totl finds its footing, we will start releasing details about our first 
                ever group river clean up in 2024!</p>
                </div>
                </div>
            </div>
        </div>
    )
}