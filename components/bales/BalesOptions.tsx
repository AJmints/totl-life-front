import NewBalePost from "./NewBalePost"

export default function BalesOptions() {

    return (
        <>
        <div className="py-3 px-5 rounded-t-md items-center flex justify-between bg-gray-400">
            <p>select log</p>
            <div className="rounded-full bg-gray-600 p-6">
                <p className="text-4xl font-thin"></p>
                {/* <div className="absolute bg-gray-700 mt-6 -ml-10">
                    <NewBalePost />
                </div> */}
            </div>
            <p>search/filter</p>
        </div>
        </>
    )
}