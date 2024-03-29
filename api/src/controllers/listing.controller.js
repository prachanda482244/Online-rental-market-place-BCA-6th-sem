import { Listing, User } from "../schema/models.js"
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

export const getListing = async (req, res, next) => {
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
export const deleteListing = async (req, res) => {
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


export const updateListing = async (req, res, next) => {
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

export const getOneListing = async (req, res, next) => {
    const id = req.params.id
    try {
        const listing = await Listing.findById(id)
        if (!listing) return next(errorHandler(404, 'Listing not found'))
        successResponse({
            res,
            status: 200,
            result: listing,
            message: 'Get one listing'
        })
    } catch (error) {
        next(error)


    }
}
export const getContactLandLord = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) return next(errorHandler(401, 'Unauthorized landlord'))

        const { password: pass, ...rest } = user._doc
        successResponse({
            res,
            status: 200,
            message: 'Landlord',
            result: rest
        })
    } catch (error) {
        next(error)

    }
}
export const getListings = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = parseInt(req.query.startIndex) || 0;
        let offer = req.query.offer
        let furnished = req.query.furnished
        let parking = req.query.parking
        let type = req.query.type
        let searchTerm = req.query.searchTerm || '';
        let sort = req.query.sort || 'createdAt';
        let order = req.query.order || 'desc';


        if (offer === undefined || offer === 'false') {
            offer = {
                $in: [false, true]
            }
        }
        if (furnished === undefined || furnished === 'false') {
            furnished = {
                $in: [false, true]
            }
        }
        if (parking === undefined || parking === 'false') {
            parking = {
                $in: [false, true]
            }
        }
        if (type === undefined || type === 'all') {
            type = {
                $in: ['sale', 'rent']
            }
        }

        const listings = await Listing.find({
            name: {
                $regex: searchTerm,
                $options: 'i'
            },
            offer, furnished, type, parking
        }).sort({
            [sort]: order
        }).limit(limit).skip(startIndex)

        if (!listings) return next(errorHandler(404, 'Not found'))
        successResponse({
            res,
            result: listings,
            status: 200,
            message: 'Search Listings'
        })

    } catch (error) {
        next(error)

    }
}