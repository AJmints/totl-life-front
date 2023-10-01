import Image from "next/image"
import viceroy from "../../../public/images/viceroy.jpg"
import secretary from "../../../public/images/secretary-of-the-treasury.jpg"

export default function AboutTeamPage() {

    return (
        <div className="">
            <div className="flex justify-center">
                <div className="mx-5">
                    <h1 className="text-center mt-20 bg-gray-100 p-5 rounded-md">Get to know the heart and soul of TOTL.life
                    </h1>

                    <div className="block sm:flex justify-around mt-5">
                    <Image src={viceroy} alt="" className="w-52 h-auto bg-gray-500 p-2 rounded-full shadow-lg shadow-gray-800 hover:p-0 duration-300"></Image>
                    <Image src={secretary} alt="" className="w-52 h-auto bg-gray-500 p-2 rounded-full shadow-lg shadow-gray-800 hover:p-0 duration-300"></Image>
                    </div>

                    <div className="text-center my-5 bg-gray-100 p-5 rounded-md">
                    <p>our incredible team of TOTLers. 
                    We&#39;re not just a collective; we&#39;re a *Bale,* a close-knit community united by a shared commitment to Sustainable Stewardship.</p>
                    <p>\- *Alex our Viceroy* (he/him):</p>
                    <p>\- *Iley our Secretary of Treasury* (he/him):</p>
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