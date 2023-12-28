import { User } from "../schema/models.js";
import { generateHashCode } from "../utils/hashing.utils.js";

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
        res.status(200).json({
            message: 'User created succesfully',
            user: user
        })
    } catch (error) {
        next(error)
    }
}