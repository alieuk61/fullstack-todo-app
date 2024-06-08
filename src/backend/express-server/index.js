import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import Todo from './schema/todoSchema.js';

// this loads all the variables in the .env file into process.env
dotenv.config();

// create express application
const app = express();
const port = 3000;

// getting this exact string from process.env
const connectionString = process.env.MONGODB_CONNECTION_STRING;
 
// connect to mongodb
mongoose.connect(connectionString);
const db = mongoose.connection;

// we will have it check for errors, if there is an error we will console.log it
db.on('error', (error) => {console.error(error)}) 
// will console log this only once and thats when we connect to the database
db.once('open', () => {console.log('connected to the database')})

// using cors middleware to allow cross origin resource sharing
app.use(cors());

// Middleware to parse JSON bodies, before the request is sent 
app.use(bodyParser.json());

app.post('/todos', async (req, res) => {
    try {
        const newTodo = new Todo({
            item: req.body.item,
            completed: req.body.completed
        })
        // this checks to see if the new todo we are creating followings is valid according to the schema, else if theres something that wasnt included in the schema it wouldnt be saved and would throw an error
        const savedTodo = await newTodo.save();
        // the line below allows us to send a response by using the res object, we then give a status code of 201 which allows us to create the response of the express server, then we send it as json
        res.status(201).json(savedTodo);
    } catch (error) {
        console.error(error)
    }
});

app.delete('/todos/:id', async (req, res) => {
    try {
        const todoId = req.params.id
        // deletes the todo mongoose model with that id in the database
        const deletedTodo = await Todo.findByIdAndDelete(todoId);
        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        // the response is the deleted and is returned to us 
        res.status(200).json({ message: 'Todo deleted successfully', todo: deletedTodo });
    } catch (error) {
        console.error('Error deleting todo:', error)
    }
})

app.put('/todos/:id', async (req, res) => {
    try {
        const todoId = req.params.id;
        const updatedTodo = await Todo.findByIdAndUpdate(
            todoId,
            { completed: req.body.completed },
            { new: true, runValidators: true } // options: return the updated document and run schema validators
        );
        if (updatedTodo) {
            res.status(200).json(updatedTodo);
        } else {
            res.status(404).json({ message: 'Todo not found' });
        }
    } catch (error) {
        console.error(error)
    }
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})