export default function LoadingPage() {

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                <div className="bg-gray-400 p-10 m-3 rounded-md h-screen"></div>
                <div className="bg-gray-400 p-10 m-3 rounded-md h-screen lg:flex hidden"></div>
                <div className="bg-gray-400 p-10 mx-10 rounded-md h-screen xl:flex hidden"></div>
            </div>
        </>
    )
}