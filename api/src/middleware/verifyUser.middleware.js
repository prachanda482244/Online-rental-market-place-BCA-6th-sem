import { secretKey } from "../config/config.js"
import { errorHandler } from "../utils/errorHandler.utils.js"
import { verifyToken } from "../utils/token.utils.js"

export const verifyUser = async (req, res, next) => {
    const token = req.cookies?.accessToken // || req.cookies?.access_token
    try {
        if (!token) return next(errorHandler(401, "Unauthorized user"))
        let user = await verifyToken(token, secretKey)
        req.user = user
        next()
    }
    catch (err) {
        console.log(err);
        next()
    }
}