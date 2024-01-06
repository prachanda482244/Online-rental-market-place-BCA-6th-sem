import { Listing } from "../schema/models.js"
import { errorHandler } from "../utils/errorHandler.utils.js"
import successResponse from "../utils/successResponse.utils.js"

export const createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body)
        if (!listing) return errorHandler(400, 'Cannot create Listing')
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