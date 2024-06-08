import mongoose from "mongoose";

// Define a schema for todo items, like classes, were going to create neew instances based on the different todos
const todoSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create a model from the schema
const Todo = mongoose.model('Todo', todoSchema);

export default Todo