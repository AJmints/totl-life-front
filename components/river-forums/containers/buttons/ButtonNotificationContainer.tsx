import EditOptionsLogic from "./bale-post-buttons/edit-options/EditOptionsLogic"
import FavoriteSaveLogic from "./bale-post-buttons/favorite-save/FavoriteSaveLogic"
import ShareButtonLogic from "./bale-post-buttons/share/ShareButtonLogic"

const ButtonNotificationContainer = (props: any) => {

    return (
        <div className="absolute p-1 bg-gray-300 rounded-md mb-20">
            {
            props.buttonType === "Option" ?
            <EditOptionsLogic /> 
            :
            <></>
            }
            {
            props.buttonType === "Favorite" ?
            <FavoriteSaveLogic /> 
            :
            <></>
            }
        </div>
    )
}

export default ButtonNotificationContainer