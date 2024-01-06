import { Listing } from "../schema/models.js"
import successResponse from "../utils/successResponse.utils.js"

export const createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body)
        successResponse({
            res,
            status: 201,
            message: 'Listing Created',
            result: listing
        })
    } catch (error) {
        next(error)

    }
}