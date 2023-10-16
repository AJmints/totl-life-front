import BalesContainer from "./BalesContainer";

export default function LogLoadOut() {

    return (
        <div className="">
            <div className="flex justify-around">
                
                <div className="hidden shadow-lg xl:flex text-lg text-center rounded-lg">
                    <div className=" my-5 ml-2 bg-gray-400">
                        <p>This container is going to be used for...</p>
                        <div className=" bg-gray-400">
                        <div>
                            {/* <p>This is a test to see if that the thing will grow or not</p> */}
                            <ul>
                                <li>log = subreddit</li>
                                <li>bale = forum post</li>
                            </ul>
                        </div>
                    </div>
                    </div>
                </div>
                
                <div className="shadow-lg flex-1 text-lg  text-center rounded-lg">
                    <BalesContainer />
                </div>

                <div className="hidden my-5 mr-2 lg:flex shadow-xl text-lg text-center rounded-lg">
                    <div className=" bg-gray-400">
                        <p>This container is going to be for...</p>
                        <div>
                            {/* <p>This is a test to see if that the thing will grow or not</p> */}
                            <ul>
                                <li>log = subreddit</li>
                                <li>bale = forum post</li>
                            </ul>
                        </div>
                    </div>
                </div>
            
            </div>
        </div>
    )
}