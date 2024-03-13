import FavoriteSaveLogic from "./bale-post-buttons/favorite-save/FavoriteSaveLogic"

const ButtonNotificationContainer = (props: any) => {

    return (
        <div className="absolute p-1 bg-gray-300 rounded-md mb-20">
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