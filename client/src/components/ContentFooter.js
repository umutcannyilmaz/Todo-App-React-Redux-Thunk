import React from 'react';
import {useSelector,useDispatch} from "react-redux";
import { changeFilter,clearCompleted } from '../redux/todos/todosSlice';


function ContentFooter() {
    const dispatch =useDispatch();
    const items = useSelector(state=>state.todos.items)
    const left=items.filter(item=>!item.completed).length
    const activeFilter=useSelector(state=>state.todos.activeFilter)
    

    console.log(left)
  return (
    <footer className="footer">
		<span className="todo-count">
			<strong>{left}</strong> item{left>1 && "s"} left
		</span>

		<ul className="filters">
			<li>
				<a href="#/" className={activeFilter==="All" ? "selected": ""} onClick={()=>dispatch(changeFilter("All"))}>All</a>
			</li>
			<li>
				<a href="#/" className={activeFilter==="Active" ?"selected" : ""} onClick={()=>dispatch(changeFilter("Active"))}>Active</a>
			</li>
			<li>
				<a href="#/" className={activeFilter==="Completed" ? "selected" : ""} onClick={()=>dispatch(changeFilter("Completed"))}>Completed</a>
			</li>
		</ul>

		<button className="clear-completed" onClick={()=>dispatch(clearCompleted())}>
			Clear completed
		</button>
	</footer>
  )
}

export default ContentFooter