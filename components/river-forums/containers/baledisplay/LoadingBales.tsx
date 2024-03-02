import LoadingRecentBales from "./LoadingRecentBales"

const LoadingBales = () => {

    return (
        <>
            <div className="bg-gray-600/80 py-2 rounded-md justify-center flex">
                <div className="flex">
                    <p>Page: </p>
                    <div className="bg-gray-300 rounded-md py-3 px-20 sm:px-32 xl:px-40 animate-pulse mx-2"></div>
                </div>
            </div>
                
        
            <LoadingRecentBales />
            <LoadingRecentBales />
            <LoadingRecentBales />


            <div className="bg-gray-600/80 py-2 rounded-md justify-center flex">
                <div className="flex">
                    <p>Page:</p>
                    <div className="bg-gray-300 rounded-md py-3 px-20 sm:px-32 xl:px-40 animate-pulse mx-2"></div>
                </div>
            </div>
        
        </>
    )
}

export default LoadingBales