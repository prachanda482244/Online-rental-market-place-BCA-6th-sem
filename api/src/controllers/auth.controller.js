import { response } from "express";
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

        // Check if the user with the given email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with that email address' });
        }

        const hashPassword = await generateHashCode(password);
        const userInfo = {
            username,
            email,
            password: hashPassword
        };

        const user = await User.create(userInfo);

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
    const { name, email, photo } = req.body;
    try {
        const user = await User.findOne({ email });

        if (user) {
            // Existing user
            let info = {
                id: user._id
            };

            // Update avatar URL if it has changed
            if (user.avatar !== photo) {
                user.avatar = photo;
                await user.save();
            }

            const token = await generateToken(info, secretKey);
            const { password, ...rest } = user._doc;
            successResponse({
                res: res.cookie('accessToken', token, { httpOnly: true }),
                status: 200,
                result: rest
            });
        } else {
            // New user
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = await generateHashCode(generatedPassword);
            const newUser = new User({
                username: name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
                email: email,
                password: hashedPassword,
                avatar: photo
            });

            await newUser.save();
            const token = await generateToken({ id: newUser._id }, secretKey);
            const { password, ...rest } = newUser._doc;
            successResponse({
                res: res.cookie('accessToken', token, { httpOnly: true }),
                status: 200,
                result: rest
            });
        }
    } catch (error) {
        next(error);
    }
};

export const signOut = (req, res, next) => {
    try {
        successResponse({
            res: res.clearCookie("accessToken"),
            status: 200,
            message: 'User has been logged out'
        })
    } catch (error) {
        next(error)
    }
}