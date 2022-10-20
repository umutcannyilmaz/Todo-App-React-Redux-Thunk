import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {addTodoAsync} from "../redux/todos/todosSlice";
import { v4 as uuidv4, v4 } from 'uuid';
import {useState} from "react"

function Form() {
    const [title,setTitle]=useState("");
    const dispatch =useDispatch();
    const isLoading = useSelector(state=>state.todos.addNewTodoLoading)

    const handleSubmit=async (e)=>{
        e.preventDefault();
        if(!title){return}
        await dispatch(addTodoAsync({title}))
        setTitle("")
    }
  return (
    <form onSubmit={handleSubmit} style={{display: "flex" , alignItems: "center"}}>
			<input
            className="new-todo" 
            placeholder="What needs to be done?"  
            value={title} 
            onChange={(e)=>setTitle(e.target.value)}
            autoFocus />
           {isLoading && <span style={{paddingRight: 10}}>Loading..</span>} 
		</form>
  )
}

export default Form;