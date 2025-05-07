// No need to change the pre-written code
// Implement the features in io.on() section
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

export const app = express();
app.use(cors());

export const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("Connection made.");
    // Write your code here
    socket.on("join", (data) => {
        socket.join(data.roomId);
        socket.username = data.username;
        socket.roomId = data.roomId;
        // socket.to(data.roomId).emit("welcome-message", `Welcome, ${data.username}!`);
        socket.to(data.roomId).emit("alert-message", `${data.username} has joined the room`);
    });

    socket.on("input-message", (message) => {
        const userMessage = { username: socket.username, message };
        io.to(socket.roomId).emit("message", userMessage);
    });

    socket.on("disconnect", () => {
        console.log("Connection disconnected.");
    });
});

