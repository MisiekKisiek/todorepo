import React from 'react';
import { observer } from 'mobx-react-lite';

//Mobexior
import { store } from '../Store.js';

const TaskListItem = observer(({task}) => {
  const { id, title,  deadline, editTask, checked, checkTask} = task;
  const {activeTaskID, setActiveTask} = store;

  return ( <li className={`taskList__item ${activeTaskID === id? "taskList_item-active":""}`} onClick={()=>{setActiveTask(id)}}>
    <div className="taskList__checkbox">
      <label htmlFor={`task `}>
          <input type="checkbox" name={`task `} value={checked} defaultChecked={checked}
              onChange={() => {checkTask()}} />
          <span></span>
      </label>
    </div>
    <span className={`taskList__item-title ${checked?"taskList__item-title-active":""}`}>{title}</span>
    <span className="taskList__item-deadline-title">Deadline:</span>
    <span className={`taskList__item-deadline ${checked?"taskList__item-deadline-active":""}`}>{deadline}</span>
  </li>);
})
 
export default TaskListItem;