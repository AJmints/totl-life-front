import NewBalePost from "@/components/bales/NewBalePost"
import CreateNewBale from "./create-new-bale-components/CreateNewBale"

const NewPostContainer = (props: any) => {

    return (
        <>
        <div className="p-4 bg-gray-600 rounded-md mx-5">
            <CreateNewBale />
        </div>
        </>
    )
}

export default NewPostContainer