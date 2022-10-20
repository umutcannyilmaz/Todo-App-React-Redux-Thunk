import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

// api async thunk
// axios  return res.data
export const getTodosAsync = createAsyncThunk("todos/getTodosAsync", async ()=>{
    const res = await fetch("http://localhost:7000/todos");
    return await res.json();
})

//Add Todo

export const addTodoAsync = createAsyncThunk("todos/addTodoAsync", async (data)=>{
const res =await axios.post("http://localhost:7000/todos",data);
return res.data;})

//Güncelleme

export const toggleTodoAsync = createAsyncThunk("todos/toggleTodoAsync", async ({id,data})=>{
    const res = await axios.patch(`http://localhost:7000/todos/${id}`,data);
    return res.data;
})

// Delete

export const removeTodoAsync = createAsyncThunk ("todos/removeTodoAsync", async (id)=>{
    const res = await axios.delete(`http://localhost:7000/todos/${id}`);
    return id

})


export const todosSlice = createSlice({
    name:"todos",
    initialState:{
        items:[],
        isLoading: false,
        error:null,
        activeFilter:"All",
        addNewTodoLoading: false,
    },
    reducers:{
        // toggle:(state,action)=>{
        //     const {id}= action.payload;
        //     const item = state.items.find(item => item.id===id);
        //     item.completed =!item.completed
        // },
        // destroy:(state,action)=>{
        //     const id= action.payload;
        //     const filtered= state.items.filter((item)=>item.id!==id)
        //     state.items=filtered
        // },

        changeFilter: (state,action)=>{
            const selectFilter= action.payload;
            state.activeFilter=selectFilter

        },

        clearCompleted:(state)=>{
            const filter = state.items.filter((item)=>!item.completed)
            state.items=filter
        },
    },
    extraReducers:{
        // get todos
        [getTodosAsync.pending]:(state,action)=>{
            state.isLoading=true;
        },
        [getTodosAsync.fulfilled]:(state,action)=>{
            state.items=action.payload;
            state.isLoading=false;
        },
        [getTodosAsync.rejected]:(state,action)=>{
            state.isLoading=false;
            state.error=action.error.message;
        },

        //add todo

        [addTodoAsync.pending]: (state,action)=>{ 
            state.addNewTodoLoading=true
        },
        //fullfilled başarıyla tamamlandığında
        [addTodoAsync.fulfilled]: (state,action)=>{ 
            state.items.push(action.payload);
            state.addNewTodoLoading=false;
        },
        [addTodoAsync.rejected]: (state,action)=>{
            state.addNewTodoLoading=false;
            state.error=action.error.message;
        },
        // toggle todo

        [toggleTodoAsync.fulfilled]:(state,action)=>{
            const {id,completed}=action.payload;
            const index = state.items.findIndex(item=> item.id ===id);
            state.items[index].completed = completed;
        },

        // remove todo
        [removeTodoAsync.fulfilled]:(state,action)=>{
            const id = action.payload;
            const index=state.items.findIndex((item)=>item.id===id);
            state.items.splice(index,1)
        }
    }
})

export const {changeFilter,clearCompleted} =todosSlice.actions;
export default todosSlice.reducer;