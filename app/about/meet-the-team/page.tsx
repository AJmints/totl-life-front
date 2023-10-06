import Image from "next/image"
import viceroy from "../../../public/images/viceroy.jpg"
import secretary from "../../../public/images/secretary-of-the-treasury.jpg"

export default function AboutTeamPage() {

    return (
        <div className="mb-5">
            <div className="flex justify-center">
                <div className="mx-5">
                    <div className="flex justify-center">
                    <h1 className="text-center mt-10 text-2xl bg-gray-100 p-5 rounded-md">Get to know the heart and soul of TOTL.life
                    </h1>
                    </div>
                    <div className="block sm:flex justify-around mt-5">
                    <div>
                    <Image src={viceroy} alt="" className="w-52 h-auto mx-auto bg-gray-500 p-2 rounded-full shadow-lg shadow-gray-800 hover:p-0 duration-300"/>
                    <p className="bg-gray-100 p-2 rounded-md text-lg text-center mt-2">Alex</p>
                    </div>
                    <div>
                    <Image src={secretary} alt="" className="w-52 mt-2 h-auto mx-auto bg-gray-500 p-2 rounded-full shadow-lg shadow-gray-800 hover:p-0 duration-300"/>
                    <p className="bg-gray-100 p-2 rounded-md text-lg text-center mt-2">Iley</p>
                    </div>
                    </div>

                    <div className="text-center my-5 space-y-2 bg-gray-100 p-5 rounded-md">
                    <p>Our incredible team of TOTLers. 
                    We&#39;re not just a collective; we&#39;re a *Bale,* a close-knit community united by a 
                    shared commitment to Sustainable Stewardship.</p>
                    <p className="text-2xl">Alex, the Viceroy (he/him):</p>
                    <p>Alex was raised in Missouri, and always had a strong love for nature. Growing up, he
                    had exposure to many of the beautiful local, city, state, and national parks that MO 
                    has to offer. He also got to visit some of the parks in the South Eastern part of the US. 
                    His love for nature sparked a desire to get more involved in preserving the natural 
                    beauty that we have left. That is what sparked the desire for Alex and Iley to create the 
                    Totl.life website! We believe in the power of organizing and working towards a common 
                    goal, and hope you do too! 
                    </p>
                    <p className="text-2xl">Iley, the Secretary of Treasury (he/him):</p>
                    <p>Iley is a native of Missouri and Oklahoma, where the rivers and lakes of the Midwest became the backdrop to many of
                    his childhood summers. Infused with a love for the outdoors from a young age, Iley felt a calling to ensure that the
                    pristine beauty he enjoyed would be preserved for future generations.
                    Drawing from his expertise in data analytics and engineering, Iley is driven to document and study the most effective methods for achieving Sustainable Stewardship. His professional background uniquely positions him to contribute valuable insights, aligning his passion for nature with a commitment to strategic environmental conservation.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}