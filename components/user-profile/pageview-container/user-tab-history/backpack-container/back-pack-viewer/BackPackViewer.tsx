const BackPackViewer = (props: any) => {

    return (
        <>

            

        {props.packContents ? 
            <div>
                <div className="flex flex-wrap gap-2">
                    <button className="bg-gray-400 hover:bg-emerald-500 duration-200 rounded-md p-2">All Gear</button>
                    <button className="bg-gray-400 hover:bg-emerald-500 duration-200 rounded-md p-2">BackPack Config 1</button>
                    <button className="bg-gray-400 hover:bg-emerald-500 duration-200 rounded-md p-2">BackPack Config 2</button>
                </div>
                <div className="mt-3">
                <p>Gear Display:</p>
                <li>No items present</li>
                </div>
            </div>
            :
            <></>
        } 


        </>
    )
}

export default BackPackViewer