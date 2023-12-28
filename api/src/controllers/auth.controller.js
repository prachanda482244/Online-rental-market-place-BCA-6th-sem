import { User } from "../schema/models.js";
import { generateHashCode } from "../utils/hashing.utils.js";
import successResponse from "../utils/successResponse.utils.js";

export const signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields required' });
        }

        const hashPassword = await generateHashCode(password)
        const userInfo = {
            username,
            email,
            password: hashPassword
        }
        const user = await User.create(userInfo)
        if (!user) {
            return res.status(500).json({ message: 'User creation failed' });
        }

        successResponse({
            res,
            status: 200,
            result: user,
            message: 'User Created Successfully'
        });
    } catch (error) {
        next(error);
    }
}
