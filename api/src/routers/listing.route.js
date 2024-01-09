import { Router } from 'express'
import { createListing, getListing, deleteListing } from '../controllers/listing.controller.js'
import { verifyUser } from '../middleware/verifyUser.middleware.js'

const listingRouter = Router()
listingRouter.route('/create').post(verifyUser, createListing)
listingRouter.route('/getListing/:id').get(verifyUser, getListing)
listingRouter.route('/deleteListing/:id').delete(verifyUser, deleteListing)

export default listingRouter