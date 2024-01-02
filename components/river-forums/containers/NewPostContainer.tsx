import CreateNewBale from "./createnewbale/CreateNewBale"
import BaleDisplay from "./baledisplay/BaleDisplay"
import AboutLogContainer from "./rightmenu-aboutlog/AboutLogContainter"

const NewPostContainer = (props: any) => {

    return (
        <div className="flex">

            <div className="space-y-4 m-4 ">
                <CreateNewBale />
                <BaleDisplay />
            </div>

            <div className="mt-4 mr-4">
                <AboutLogContainer />
            </div>

        </div>
    )
}

export default NewPostContainer