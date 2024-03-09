import EditOptionsLogic from "./bale-post-buttons/edit-options/EditOptionsLogic"
import FavoriteSaveLogic from "./bale-post-buttons/favorite-save/FavoriteSaveLogic"
import ShareButtonLogic from "./bale-post-buttons/share/ShareButtonLogic"

const ButtonNotificationContainer = (props: any) => {

    return (
        <div className="absolute p-5 bg-gray-300 rounded-md mb-20" onClick={() => console.log(props)}>
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
            {
            props.buttonType === "Share" ?
            <ShareButtonLogic /> 
            :
            <></>
            }
        </div>
    )
}

export default ButtonNotificationContainer