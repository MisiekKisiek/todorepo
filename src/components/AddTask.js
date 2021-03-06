import React, { useState } from 'react';

//Mobexior
import { observer } from 'mobx-react-lite';
import { store } from '../Store.js';

const AddTask = observer(
  () => {
    const { addTask, isEditing } = store;

    const [addTaskText, setaddTaskText] = useState("");
    const [addTaskDate, setaddTaskDate] = useState("deadline");

    const addTaskFunc = (e) => {
      e.preventDefault();

      if (!isEditing) {
        const now = new Date();
        const day = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
        const month = now.getMonth() + 1 < 10 ? "0" + now.getMonth() + 1 : now.getMonth() + 1;
        const date = `${now.getFullYear()}-${month}-${day}`
        addTask(addTaskText, "", date, addTaskDate);
        setaddTaskDate("");
        setaddTaskText("");
      }
    }

    return (<li className="taskList__addTask">
      <form onSubmit={(e) => { addTaskFunc(e); }}>
        <input
          className="taskList__addTask-text-input"
          type="text"
          placeholder="Enter task"
          value={addTaskText}
          onChange={(e) => { setaddTaskText(e.target.value) }}
          required
          minLength="3"
          maxLength="45"
        />
        <span className="taskList__addTask-deadline-title">Add deadline:</span>
        <input
          className="taskList__addTask-deadline-input"
          type="date" value={addTaskDate}
          onChange={(e) => { setaddTaskDate(e.target.value) }}
          required
        />
        <button type="submit">Add task</button>
      </form>
    </li>);
  }
)

export default AddTask;