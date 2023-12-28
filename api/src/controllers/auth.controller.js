import { secretKey } from "../config/config.js";
import { User } from "../schema/models.js";
import { errorHandler } from "../utils/errorHandler.utils.js";
import { comparaHashCode, generateHashCode } from "../utils/hashing.utils.js";
import successResponse from "../utils/successResponse.utils.js";
import { generateToken } from "../utils/token.utils.js";

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

export const signIn = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email })
        if (!validUser) return next(errorHandler(404, 'User not found'))

        const validPassword = await comparaHashCode(password, validUser.password);
        if (!validPassword) return next(errorHandler(404, 'Wrong Credentials'))

        let info = {
            id: validUser._id
        }
        const token = await generateToken(info, secretKey)
        res.cookie("accessToken", token, { httpOnly: true })
        const { password: pass, ...rest } = validUser._doc
        successResponse({
            res,
            status: 200,
            message: 'Login Successfully',
            result: rest,
        })
    } catch (error) {
        next(error)
    }
}