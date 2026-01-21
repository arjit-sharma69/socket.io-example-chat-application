const express = require('express');
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(express.static(path.join(__dirname, "public")));


// Creating A Server

app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

io.on("connection",(socket)=>{
    // Now this message is catched by our server

    socket.on('chat-message', (msg)=>{
       const msgObj ={msg:msg, id:socket.id}; 
       io.emit('chat-message', msgObj);
    });

})

server.listen(3000, ()=>{
    console.log("Listening at Port 3000");
})