import CreateNewBale from "./create-new-bale-components/CreateNewBale"
import BaleDisplay from "../baledisplay/BaleDisplay"

const NewPostContainer = (props: any) => {

    return (
        <>
        <div className="space-y-4 m-4 ">
            <CreateNewBale />
            <BaleDisplay />
        </div>
        </>
    )
}

export default NewPostContainer