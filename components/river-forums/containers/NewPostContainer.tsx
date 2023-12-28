import CreateNewBale from "./newpost-lognav/create-new-bale-components/CreateNewBale"
import BaleDisplay from "./baledisplay/BaleDisplay"

const NewPostContainer = (props: any) => {

    return (
        <>
        {/* Main container */}
        <div className="my-4 mx-14 flex">
            <div className="mr-2 space-y-2">
                <CreateNewBale />
                <BaleDisplay />
            </div>
            <div className="bg-gray-400 ml-2 h-96 w-[40rem] p-10 rounded-md">

            </div>
        </div>
        </>
    )
}

export default NewPostContainer