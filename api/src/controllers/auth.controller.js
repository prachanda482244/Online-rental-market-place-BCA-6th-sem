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

export const googleSignIn = async (req, res, next) => {
    const { name, email, photo } = req.body
    try {
        const user = await User.findOne({ email })
        if (user) {
            let info = {
                id: user._id
            }
            const token = generateToken(info, secretKey)
            const { password, ...rest } = user._doc
            successResponse({
                res: res.cookie('accesstoken', token, { httpOnly: true }),
                status: 200,
                result: rest
            })

        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = await generateHashCode(generatedPassword)
            const newUser = new User({
                username: name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
                email: email,
                password: hashedPassword,
                avatar: photo
            })
            await newUser.save()
            const token = generateToken({ id: newUser._id }, secretKey)
            const { password, ...rest } = newUser._doc
            successResponse({
                res: res.cookie('accesstoken', token, { httpOnly: true }),
                status: 200,
                result: rest
            })
        }

    } catch (error) {
        next(error)

    }

}