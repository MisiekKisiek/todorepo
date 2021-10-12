import React, { useState } from 'react';

//Mobexior
import { store } from '../Store.js';

const AddTask = () => {
  const { addTask } = store;

  const [addTaskText, setaddTaskText] = useState("");
  const [addTaskDate, setaddTaskDate] = useState("deadline");

  const addTaskFunc = (e) => {
    e.preventDefault();
    addTask(addTaskText,"","",addTaskDate);
    setaddTaskDate("");
    setaddTaskText("");
  }

  return ( <li className="taskList__addTask">
    <form onSubmit={(e)=>{addTaskFunc(e);}}>
      <input 
        className="taskList__addTask-text-input" 
        type="text" 
        placeholder="Enter task" 
        value={addTaskText} 
        onChange={(e)=>{setaddTaskText(e.target.value)}} 
        required
        minLength="3"
        maxLength="45"
      />
      <span className="taskList__addTask-deadline-title">Add deadline:</span>
      <input 
        className="taskList__addTask-deadline-input" 
        type="date" value={addTaskDate} 
        onChange={(e) => {setaddTaskDate(e.target.value ? e.target.value : "Add deadline")}}
        required
      />
      <button type="submit">Add task</button>
    </form>
  </li>);
}
 
export default AddTask;