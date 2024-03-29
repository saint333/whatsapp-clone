import getPrismaInstance from "../utils/PrismaClient.js";
import {renameSync} from "fs"

export const addMessage = async (req, res, next) => {
  try {
    const prisma = getPrismaInstance();
    const { message, from, to } = req.body;
    const getUser = onlineUsers.get(to);

    if (message && from && to) {
      const newMessage = await prisma.message.create({
        data: {
          message,
          sender: { connect: { id: from } },
          reciever: { connect: { id: to } },
          messageStatus: getUser ? "delivered" : "sent",
        },
        include: { sender: true, reciever: true },
      });
      return res.status(201).send({ message: newMessage });
    }
    return res.status(400).send("From, to and message is required.");
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const prisma = await getPrismaInstance();
    const { from, to } = req.params;

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: from,
            recieverId: to,
          },
          {
            senderId: to,
            recieverId: from,
          },
        ],
      },
      orderBy: {
        id: "asc",
      },
    });

    const unreadMessages = [];

    messages.forEach((message, index) => {
      if (message.messageStatus !== "read" && message.senderId == to) {
        messages[index].messageStatus = "read";
        unreadMessages.push(message.id);
      }
    });

    await prisma.message.updateMany({
      where: {
        id: {
          in: unreadMessages,
        },
      },
      data: {
        messageStatus: "read",
      },
    });

    res.status(200).json({ messages });
  } catch (error) {
    next(error);
  }
};

export const addImageMessage = async (req, res, next) => {
  try {
    if (req.file) {
      const date = Date.now()
      let fileName = `uploads/image/${date}${req.file.originalname}`;
      renameSync(req.file.path, fileName)
      const prisma = getPrismaInstance()
      const {from, to} = req.query
      if (from && to) {
        const message =  await prisma.message.create({
          data: {
            message: fileName,
            sender: {connect: { id: from }},
            reciever: { connect: { id: to } },
            type: "image",
          }
        })
        return res.status(201).json({message})
      }
      return res.status(400).send('From, to is required')
    }
    return res.status(400).send('Image is required')
  } catch (error) {
    next(error);
  }
}