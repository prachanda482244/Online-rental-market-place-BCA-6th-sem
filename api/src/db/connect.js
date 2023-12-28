import { connect } from 'mongoose'
import { dbUrl } from '../config/config.js'
export const connectToDb = async () => {
    try {
        await connect(dbUrl)
        console.log(`Connect to database `)
    } catch (e) { console.log(e.message) }
}