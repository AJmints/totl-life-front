export default function RecentBales() {

    return (
        <div className="bg-gray-300 justify-between flex p-2 rounded-md">
            <div className="bg-gray-600 w-[70%] p-1 rounded-l-md">
                <div className="bg-gray-100 w-[100%] rounded-tl-md h-[60%]">
                    <p className="flex text-3xl py-1">An Example of an exciting title that is meant to be brief</p>
                </div>
                <div className="bg-gray-300 rounded-bl-md text-xs pt-1 w-[100%] h-[40%]">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi</p>
                </div>
            </div>
            <div className="bg-gray-500 h-100% rounded-r-md text-sm w-[30%] p-1">
                <div className="bg-gray-400 rounded-tr-md h-[50%]">
                    <p>User Profile Pic/Link</p>
                </div>
                <div className="bg-gray-300 h-[25%]">
                    <p>Up / Comment</p>
                </div>
                <div className="bg-gray-400 rounded-br-md h-[25%]">
                    <p>Down / Share</p>
                </div>
                
            </div>
        </div>
    )
}