import { Router } from 'express'
import { createListing, getListing, deleteListing, updateListing, getOneListing, getContactLandLord } from '../controllers/listing.controller.js'
import { verifyUser } from '../middleware/verifyUser.middleware.js'

const listingRouter = Router()
listingRouter.route('/create').post(verifyUser, createListing)
listingRouter.route('/getListing/:id').get(verifyUser, getListing)
listingRouter.route('/deleteListing/:id').delete(verifyUser, deleteListing)
listingRouter.route('/updateListing/:id').put(verifyUser, updateListing)
listingRouter.route('/getOneListing/:id').get(getOneListing)
listingRouter.route('/contactLandLord/:id').get(verifyUser, getContactLandLord)

export default listingRouter