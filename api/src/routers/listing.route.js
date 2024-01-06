import { Router } from 'express'
import { createListing } from '../controllers/listing.controller.js'
import { verifyUser } from '../middleware/verifyUser.middleware.js'

const listingRouter = Router()
listingRouter.route('/create').post(verifyUser, createListing)

export default listingRouter