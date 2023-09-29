import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import AuthRouters from "./routes/AuthRoutes.js";

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/auth", AuthRouters)

const server = app.listen(process.env.PORT, () => {
    console.log(`Server listening on ${process.env.PORT}`);
})