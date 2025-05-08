// no need to change the prewritten code
// make necessary imports here
import mongoose from "mongoose";
// Define the Task schema
const taskSchema = new mongoose.Schema({
    // ------write your code here.-------
    message: String,
    timestamp: Date
});

// Create a Task model from the schema
const Task = mongoose.model('Task', taskSchema);

export default Task;
