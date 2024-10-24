const friend = {
    name: "",
    profilePic: ""
}

const userPack = {
    user: "",
    userPack: ["gear", "gear"]
}

const comment = {
    user: "",
    comment: "",
    time: "",
    like: 10,
    dislike: 2,
    childComments: ["children comments"]
}

export const checking = {

    event : {
        eventName: "",
        createdBy: "",
        isPublic: false,
        date: "",
        mapLink: "",
        eventType: "",
        quickEventNotes: "",
        campFriends: [friend, friend, friend],
        recommendedGear: [],
        foodArrangements: [],
        userPacks: [userPack, userPack, userPack],
        postComments: []
    }

}