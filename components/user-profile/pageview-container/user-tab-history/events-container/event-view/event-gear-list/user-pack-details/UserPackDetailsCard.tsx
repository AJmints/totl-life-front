

const UserPackDetailsCard = () => {


    return (
        <div className="bg-gray-400 p-1 rounded-md flex flex-col gap-2">
            <div className="bg-gray-300 p-1 rounded-md flex justify-between">
                <div className="bg-gray-200 p-1 rounded-md w-[50%]">
                    <p>User: Name</p>
                    <p>Pack: Name</p>
                </div>
                <div className="bg-gray-200 p-1 h-28 rounded-md">
                    <p>Pack Image</p>
                </div>
            </div>

            <div className="bg-gray-300 p-1 rounded-md">
                <p>Missing : 3 from rec list</p>
                <p>view contents</p>
            </div>
        </div>
    )
}

export default UserPackDetailsCard