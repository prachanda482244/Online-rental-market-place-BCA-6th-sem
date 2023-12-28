import { User } from "../schema/models.js";
import { generateHashCode } from "../utils/hashing.utils.js";
import successResponse from "../utils/successResponse.utils.js";

export const signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) res.status(400).json({ message: 'All field required' })
        const hashPassword = await generateHashCode(password)
        const userInfo = {
            username,
            email,
            password: hashPassword
        }
        const user = await User.create(userInfo)
        if (!user) res.status(400).json("User cannot created")
        successResponse({
            res,
            status: 200,
            result: user,
            message: 'User Created Successfully'
        })
    } catch (error) {
        next(error)
    }
}