

const FriendContainer = () => {


    return (
        <div className="bg-gray-400 flex items-center rounded-md p-2 -mb-32 -ml-3">
            
            <div className="">

                <div className="">
                    <div className="mb-2 flex justify-center">
                    <button onClick={() => console.log("launch add turtle function")} className="bg-gray-600 p-2 rounded-md shadow-md shadow-gray-800/40">Add Turtle</button>
                    </div>
                    <div>
                    <button onClick={() => console.log("launch follow turtle function")} className="bg-gray-600 p-2 rounded-md shadow-md shadow-gray-800/40">Follow Turtle</button>
                    </div>
                </div>

            </div>
            
            
        </div>
    )
}

export default FriendContainer