import '../styles/components/_inputbox.scss'
import { useState, useContext } from 'react'
import axios from 'axios';
import { myContext } from '../context/context';

export default function InputDiv () {

    const {todoPosting, todoValue, setTodoValue} = useContext(myContext)


    return(
        <div className="input-div">
             <button></button>
            <input 
            type="text" 
            placeholder='Create a new todo...'
            onChange={(e) => {
                setTodoValue(e.target.value)
            }}
            value={todoValue}
            onKeyDown={(e) => {
                todoPosting(e, todoValue)
            }} 
              />
        </div>
    )
}