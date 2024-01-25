import express from "express";
import { port } from "./src/config/config.js";
import { connectToDb } from "./src/db/connect.js";
import authRouter from "./src/routers/auth.route.js";
import { errorMiddleware } from "./src/middleware/error.middleware.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
import userRouter from "./src/routers/user.route.js";
import listingRouter from "./src/routers/listing.route.js";
import path from 'path';


const __dirname = path.resolve();

const app = express()
app.use(express.json({ limit: '16kb' }))
app.use(cookieParser())

connectToDb();
app.get('/', (req, res) => {
    res.send("hello world")
})

//Routes
app.use("/api/v1/users", authRouter)
app.use("/api/v1/userInfo", userRouter)
app.use('/api/v1/listing', listingRouter)

app.use(errorMiddleware)
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))

app.use(express.static(path.join(__dirname, '/client/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
})

app.listen(port, () => {
    console.log(`Server running on  port ${port}`)
})

