import { User } from "../schema/models.js"
import { errorHandler } from "../utils/errorHandler.utils.js"
import { generateHashCode } from "../utils/hashing.utils.js"
import successResponse from "../utils/successResponse.utils.js"

export const users = (req, res) => {
    res.json({
        name: 'user',
        message: 'something'
    })
}
export const updateUser = async (req, res, next) => {
    const accessTokenID = req.user.id
    const _id = req.params.id
    let { username, email, password, photo } = req.body
    if (accessTokenID !== _id) return next(errorHandler(401, 'Unauthorized user'))

    try {
        if (password) {
            password = await generateHashCode(password)
        }
        const updateUser = await User.findByIdAndUpdate(_id, {
            $set: {
                username,
                email,
                password,
                avatar: photo
            }
        }, { new: true }).select("-password")

        successResponse({
            res,
            result: updateUser,
            status: 200,
            message: "User Updated Succcessfully"
        })
    }
    catch (err) {
        next(err)
    }
}