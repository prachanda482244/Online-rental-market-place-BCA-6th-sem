import { Listing } from "../schema/models.js"
import { errorHandler } from "../utils/errorHandler.utils.js"
import successResponse from "../utils/successResponse.utils.js"

export const createListing = async(req, res, next) => {
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

export const getListing = async(req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, 'Unauthorized user'))

    try {
        const listing = await Listing.find({ userRef: req.params.id })
        if (!listing) return next(errorHandler(400, 'Unable to create the listing'))

        successResponse({
            res,
            status: 200,
            message: 'Listings',
            result: listing
        })
    } catch (error) {
        next(error)
    }
}
export const deleteListing = async(req, res) => {
    const id = req.params.id
    const userId = req.user.id
    const listing = await Listing.findById(id)
    if (!listing) return next(errorHandler(404, 'Listing Not found'))
    if (userId !== listing.userRef) {
        return next(errorHandler(401, 'Unauthorized , cant delete anyone else listing'))
    }
    try {
        await Listing.findByIdAndDelete(id)
        successResponse({ res, message: 'Listing delete' })
    } catch (error) {
        next(error)
    }
}


export const updateListing = async(req, res, next) => {
    const id = req.params.id
    const userId = req.user.id

    try {
        const listing = await Listing.findById(id)
        if (!listing) return next(errorHandler(404, 'Listing Not found'))
        if (userId !== listing.userRef) return next(errorHandler(401, 'Unauthorized user cannot update the listing'))

        const updatedListing = await Listing.findByIdAndUpdate(id, req.body, { new: true })
        if (!updatedListing) return next(errorHandler(400, 'failed to update listing'))
        successResponse({
            res,
            status: 200,
            message: 'Listing Update Successfully',
            result: updatedListing
        })

    } catch (error) {

    }
}