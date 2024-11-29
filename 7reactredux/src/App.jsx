import { useState  } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Provider , useDispatch , useSelector} from 'react-redux';
import { createStore } from 'redux';

function taskReducer(state=[],action){
  if (action.type==='addTask'){
    return [...state , action.task]
    
  }else if (action.type==='deleteTask'){
    const filterTask = state.filter((ele)=>ele.id!==action.id);
    return [...filterTask]
  }else if(action.type==='markCompletedTask'){
    return state.map((task)=>
      task.id===action.id ? { ...task , isCompleated: !task.isCompleated} : task
    )
  }else{
    return state
  }
}


const addTask = (task)=>{
  const NewtaskObj={
    title:task,
    isCompleated: false,
    id:Date.now(),
  };

  return {
    type : 'addTask',
    task : NewtaskObj
  }
}

const DeleteTask = (id)=>{
  
  return {
    type : 'deleteTask',
    id : id
  }
}

const MarkCompleted = (id)=>{
  
  return {
    type : 'markCompletedTask',
    id : id
  }
}




const store = createStore(taskReducer)

function TasksCompo(){

  const [newTask,setNewTask] = useState('');

  const tasks = useSelector((state)=>state);

  const dispatch = useDispatch();

  const submitHandler = (e)=>{
    e.preventDefault();
    dispatch(addTask(newTask))
    setNewTask('');
  }

  return( 
    <div className="main-cont">
      <h1>To-Do List</h1>
      <div className="add-task">
        

        <form onSubmit={submitHandler} >
          <input placeholder='Enter Task' value={newTask} onChange={(e)=>setNewTask(e.target.value)}></input>
          <button type="submit" >Add Task</button>
        </form>
      </div>

      <h1>Tasks</h1>
      <div className="cont">
        {tasks && tasks.map((task)=>(
          <div key={task.id} className="card">
            <h3 className={`${task.isCompleated===true ? 'complete':''}`}>{task.title}</h3>
            <button disabled={task.isCompleated} onClick={()=>dispatch(MarkCompleted(task.id))} className='markCompleteBtn'>Mark Completed</button>
            <button onClick={()=>dispatch(DeleteTask(task.id))} className='deleteBtn'>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}



function App() {
  
  return (
    <Provider store={store}>
      <TasksCompo/>
    </Provider>
  )
}

export default App
