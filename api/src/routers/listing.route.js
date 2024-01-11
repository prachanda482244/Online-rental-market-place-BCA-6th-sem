import { Router } from 'express'
import { createListing, getListing, deleteListing, updateListing } from '../controllers/listing.controller.js'
import { verifyUser } from '../middleware/verifyUser.middleware.js'

const listingRouter = Router()
listingRouter.route('/create').post(verifyUser, createListing)
listingRouter.route('/getListing/:id').get(verifyUser, getListing)
listingRouter.route('/deleteListing/:id').delete(verifyUser, deleteListing)
listingRouter.route('/updateListing/:id').put(verifyUser, updateListing)

export default listingRouter