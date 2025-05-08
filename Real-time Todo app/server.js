// Complete the server.js file to make user's add, delete and update the todos.
import express from "express";
import { Server } from "socket.io";
import http from "http"
import cors from "cors"
import taskSchema from "./task.schema.js";
import Task from "./task.schema.js";

const app = express();

export const server = http.createServer(app);
export const io =new Server(server,{
    cors:{
        origin: "*",
        methods:["GET","POST"]
    }
});

io.on("connection",(socket)=>{
console.log("Connection is established");

socket.on("task-data",async (data)=>{
      const taskData =  new Task({
        message: data,
        timestamp: new Date()
    })
   taskData.save().
   then(async (data)=>{
    // console.log(data);
    socket.broadcast.emit("broadcast_message",data);
    const findedData = await Task.findById(data._id)
    socket.emit("data-received",findedData);
   }).catch(err=>{
    console.log(err);
   });

});
socket.on("update", async (data) => {
    const { id, message } = data;
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { message },
            { new: true }
        );
        if (updatedTask) {
            io.emit("task-updated", updatedTask);
        }
    } catch (err) {
        console.error("Error updating task:", err);
    }
});
socket.on("delete",async(data)=>{
    await Task.deleteOne({_id:data.id});
});
socket.on("disconnect",()=>{
    console.log("connection is disconnected ");
})
})

