export const Player = `
type Player @cacheControl(maxAge: 5000) {
    id: Int
    name: String
    nick: String
    image_url: String
}`