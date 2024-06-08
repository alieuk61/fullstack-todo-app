import { createContext, useState, useEffect } from "react";
import bodyParser from "body-parser";
import axios from 'axios';

export const myContext = createContext();

export default function ContextProvider ({children}){

    const [theme, setTheme] = useState('light');
    const [commentsData, setCommentsData] = useState([]);
    const [todoValue, setTodoValue] = useState('');
    const todoFilter = ['All', 'Active', 'Completed'];
    const [currentPage, setPage] = useState('All');
    
    useEffect(() => {
      document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);


    async function todoPosting (e, todo){
        if (e.key == 'Enter' && todo.length > 0){
            try {
                const response = await axios.post('http://localhost:3000/todos', {item: todo}) //remember whenever we make a request, we receive a response as well
                const newTodo = response.data
                console.log(newTodo)
                setCommentsData([...commentsData, newTodo])
                setTodoValue('')
            } catch (error) {
                console.error(error)
            }

        }
    }

    async function todoDelete (todo) {
        try {
            const deleteTodo = await axios.delete('http://localhost:3000/todos/' + todo._id)
            const updatedTodo = commentsData.filter((obj) => obj._id !== todo._id)
            setCommentsData(updatedTodo)
            console.log(updatedTodo)
        } catch (error) {
            console.error(error)
        }
    }

    async function deleteMany () {
        try {
            const completedTodoId = commentsData.filter(obj => obj.completed._id);
            const clearCompleted = completedTodoId.map(id => {
                async () => await axios.delete('http://localhost:3000/todos/' + id)
            })
            await Promise.all(clearCompleted);
            console.log(clearCompleted)

            // Update the commentsData array by removing the deleted items
            setCommentsData(prevData => prevData.filter(todo => !completedTodoIds.includes(todo._id)));
            
        } catch (error) {
            console.error(error);
        }
    }

    async function todoUpdate (todo) {
        try {
            const updatedTodo = await axios.put('http://localhost:3000/todos/' + todo._id, {
                completed: !todo.completed
            }) //remember we created a response in the server side so it will be in this variable
            const data = updatedTodo.data
            console.log(data)
            setCommentsData(commentsData.map(t => (t._id === data._id ? data : t)))
            
        } catch (error) {
            console.error(error)
        }
    }

    function dynamicPageFilter(){
        switch (currentPage) {
            case 'All':
                return commentsData
                break;
            case 'Active':
                return commentsData.filter(obj => obj.completed === false)
                break
            case 'Completed':
                return commentsData.filter(obj => obj.completed === true)
        
            default:
                commentsData
                break;
        }
    }

    return(
        <myContext.Provider value={{
            theme,
            setTheme,
            commentsData, 
            setCommentsData,
            todoPosting,
            todoValue, 
            setTodoValue,
            todoDelete,
            todoUpdate,
            todoFilter,
            currentPage,
            setPage,
            dynamicPageFilter,
            deleteMany
        }}>
            {children}
        </myContext.Provider>
    )
}
