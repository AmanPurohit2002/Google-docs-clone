const { Server } = require("socket.io");

const dbConnection= require("./db/db.js");
const { getDocument,updateDocument } =require("./controller/document-controller.js");
require('dotenv').config();

dbConnection();

const io = new Server(process.env.PORT, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["Get", "Post"],
  },
});

io.on("connection", (socket) => {
  socket.on("get-document", async (documentId) => {
    const document= await getDocument(documentId);
    socket.join(documentId);
    socket.emit('load-document',document.data);

    //get data from frontend
    socket.on("send-changes", (delta) => {
      // broadcast data from backend to frontedn to all users
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    //trigger event to frontend
    socket.on('save-document',async (data)=>{
        await updateDocument(documentId,data);
    })
  });
});
