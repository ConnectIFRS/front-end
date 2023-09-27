export type classes_type = {
    id: number,
    className: string
}

export type JWTToken = {
    name: string,
    className: string,
    createdAt: Date,
    profilePic: string,
    exp: number
}

export type post_type = {
    id: string,
    coverUrl: string,
    content: string,
    createdAt: Date,
    user: {
        userClass: string,
        name: string,
        profilePic: string,
        id: string
    },
    likes: number,
    comments: number,
    likedByUser: boolean
}

export type comment_type = {
    id: string,
    user: {
        className: string,
        name: string,
        profilePic: string,
        id: string
    },
    content: string,
    createdAt: Date
}