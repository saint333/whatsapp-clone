import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import AuthRouters from "./routes/AuthRoutes.js";
import MessageRouter from "./routes/MessageRouter.js";
import { Server } from "socket.io";

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

app.use("/uploads/image", express.static("uploads/image"))

app.use("/api/v1/auth", AuthRouters)
app.use("/api/v1/messages", MessageRouter)

const server = app.listen(process.env.PORT, () => {
    console.log(`Server listening on ${process.env.PORT}`);
})

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
})

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id)
    })
    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to)
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", {
                from: data.from,
                message: data.message
            })
        }
    })
})