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