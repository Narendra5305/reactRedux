import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {  Provider,useDispatch,useSelector } from 'react-redux'
import  {createStore}  from 'redux'

const reducerCounter = (state=0 , action) =>{
  if (action.type==='INCREMENT'){
    return state + 1;
  }else if (action.type==='DECREMENT'){
    return state - 1;
  }else{
    return state;
  }
}

const INCREMENT= 'INCREMENT';
const DECREMENT='DECREMENT';

const store = createStore(reducerCounter)


function Counter(){
  const count = useSelector((state)=> state);
  const dispatch = useDispatch();
  
  return(
    <div className='count'>
      <button onClick={()=>dispatch({type:INCREMENT})}>Increase</button>
      <h1>{count}</h1>
      <button disabled={count<=0} onClick={()=>dispatch({type:DECREMENT})}>Decrease</button>
    </div>
    
  )
}
function App() {
  
  return (
    <Provider store={store}>
      <Counter/>
    </Provider>
  )
}

export default App
