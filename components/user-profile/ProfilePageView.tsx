import UserPageDetails from "./pageview-containers/user-detail-header/UserPageDetails"

const ProfilePageView = () => {

    return (
        <div className="bg-gray-700/80 p-10 font-extralight text-white">
        
        <UserPageDetails />
        <div className="flex mt-3 space-x-2">
        <li>Posts</li>
        <li>Comments</li>
        <li>Saved</li>
        <li>BackPack</li>
        <li>Events</li>
        </div>

        <div className="mt-5">
            <p>Right column</p>
            <li>BackPack Feature</li>
        </div>

        <div>
            <p>Left Column</p>
            <li>Event Creator</li>
            <li>Market Place</li>
        </div>

        </div>
    )
}

export default ProfilePageView