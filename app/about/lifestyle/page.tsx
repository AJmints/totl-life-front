import Image from "next/image"
import lifeStyle from "../../../public/images/lifestyle.jpg"

export default function AboutLifestylePage() {

    return (
        <div className="flex mb-5">
            <div className="flex justify-center">
            <div>
                <div className="flex justify-center">
                <h1 className="text-center mt-20 text-2xl bg-gray-100 p-5 rounded-md mx-5">The TOTL lifestyle</h1>
                </div>
                <Image
                    src={lifeStyle}
                    alt=""
                    className="w-96 mt-5 p-2 rounded-md bg-gray-100 h-auto mx-auto"
                />
                <p className="text-center mt-5 bg-gray-100 p-5 rounded-md mx-5">At TOTL.life, our lifestyle 
                is defined by Sustainable Stewardship. We embrace a mindful approach to living, making 
                choices that contribute to the well-being of our planet. Sustainable Stewardship, to us, 
                means carefully managing and nurturing the resources we&#39;ve been entrusted with. As 
                TOTLers, we understand the profound impact of our actions, and we strive to lead by example.
                </p>
                </div>
            </div>
        </div>
    )
}