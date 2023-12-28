import jwt from "jsonwebtoken";

export const generateToken = async (info, secretKey) => {
    let token = await jwt.sign(info, secretKey)
    return token
}

export const verifyToken = async (token, secretKey) => {
    let info = await jwt.verify(token, secretKey)
    return info
}