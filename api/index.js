import express from "express";
import { port } from "./src/config/config.js";
import { connectToDb } from "./src/db/connect.js";
import userRouter from "./src/routers/user.route.js";
import UserRouter from "./src/routers/auth.route.js";
import { errorMiddleware } from "./src/middleware/error.middleware.js";

const app = express()
app.use(express.json())
connectToDb();
app.get('/', (req, res) => {
    res.send("hello world")

})
app.use(userRouter)
app.use(UserRouter)
app.use(errorMiddleware)
app.listen(port, () => {
    console.log(`Server running on  port ${port}`)
})

