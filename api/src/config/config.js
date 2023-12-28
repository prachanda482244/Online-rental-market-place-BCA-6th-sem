import { config } from "dotenv"

config()

export let port  = process.env.PORT 
export let dbUrl  = process.env.DB_URL