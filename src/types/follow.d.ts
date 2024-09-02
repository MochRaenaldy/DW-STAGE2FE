export interface Ifollow {
followersId : number
followingId : number
}

export interface IFollowers {
    followers : {
        id : number
        username : string
        profile_pic : string
        fullname : string
    };
    followingId : number
    FollowersId : number
    id : number
}

export interface IFollowing {
    following : {
        id : number
        username : string
        profile_pic : string
        fullname : string
    };
    followersId : number
    FollowingId : number
    id : number
}

