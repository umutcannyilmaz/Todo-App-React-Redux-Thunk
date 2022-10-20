import React, { useEffect } from 'react';
import {useSelector,useDispatch} from "react-redux";
import {getTodosAsync, toggleTodoAsync,removeTodoAsync} from "../redux/todos/todosSlice"

function TodoList() {
    const dispatch=useDispatch();
    const items = useSelector((state)=>state.todos.items)

    const activeFilter=useSelector(state=>state.todos.activeFilter)
    const isLoading=useSelector(state=>state.todos.isLoading)
    const error =useSelector(state=>state.todos.error)
    useEffect(()=>{
        dispatch(getTodosAsync())
    },[dispatch])

    let filtered=[]
    if(activeFilter==="All" || activeFilter===""){
        filtered =items
    }else if(activeFilter==="Completed"){
        filtered=items.filter(item=>item.completed===true)
    }else if(activeFilter==="Active"){
        filtered=items.filter(item=>item.completed===false)
    }

    console.log(items)
    // console.log("filtered", filtered)
    
    const handleDestroy= async (id)=>{
        if(window.confirm("Are you sure?")){
            await dispatch(removeTodoAsync(id))
        }
    };
    
    const handleToggle =async (id,completed)=>{
        await dispatch(toggleTodoAsync({id,data:{completed}}))

    }


    if(isLoading){
        return <div style={{padding: 15, fontSize: 18}}>Loading...</div>
    }
    if(error){
        return <div style={{padding: 15, fontSize: 18}}>Error: {error}</div>
    }
  return (
    <ul className="todo-list">



        {filtered.map((item,i)=>(
            <li className={item.completed ? "completed" : ""} key={i}>
            <div className="view">
                <input className="toggle" 
                type="checkbox" 
                onChange={()=>handleToggle(item.id,!item.completed)}/>
        <label >{item.title}</label>
        <button className="destroy" onClick={()=>handleDestroy(item.id)}></button>
        
        </div>
        </li>
        ))}
		</ul>
  )
}

export default TodoList