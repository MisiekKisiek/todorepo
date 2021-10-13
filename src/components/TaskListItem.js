import React from 'react';

//Mobexior
import { observer } from 'mobx-react-lite';
import { store } from '../Store.js';

const TaskListItem = observer(({ task }) => {
  const { id, title, deadline, checked, checkTask } = task;

  const { activeTaskID, setActiveTask, isEditing, setisEditing, removeTask } = store;

  const buttons = (id === activeTaskID ? <>
    <button
      className="taskList__item-btn-edit"
      onClick={() => {
        setisEditing(true);
      }}>Edit</button>
    <button
      className="taskList__item-btn-delete"
      onClick={() => {
        if (!isEditing) {
          removeTask(id);
        }
      }}>Delete</button>
  </> : null)

  return (<li className={`taskList__item ${activeTaskID === id ? "taskList_item-active" : ""}`} onClick={() => {
    if (!isEditing) {
      setActiveTask(id);
    }
  }}>
    <div className="taskList__checkbox">
      <label htmlFor="task">
        <input
          type="checkbox"
          name="task"
          value={checked}
          defaultChecked={checked}
          onChange={() => { checkTask(); }}
        />
        <span></span>
      </label>
    </div>
    <span className={`taskList__item-title ${checked ? "taskList__item-title-active" : ""}`}>{title}</span>
    <span className="taskList__item-deadline-title">Deadline:</span>
    <span className={`taskList__item-deadline ${checked ? "taskList__item-deadline-active" : ""}`}>{deadline}</span>
    {buttons}
  </li >);
})

export default TaskListItem;