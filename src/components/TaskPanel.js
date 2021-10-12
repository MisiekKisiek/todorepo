import React, {useState} from 'react';
import { observer } from 'mobx-react-lite';

//Mobexior
import { store } from '../Store.js';

const TaskPanel = observer(() => {
  const {taskList, activeTaskID, setActiveTask} = store;

  const [isEditing, setisEditing] = useState(false);

  const activeTask = taskList.length > 0 ? taskList.slice()[taskList.findIndex(e=> e.id === activeTaskID)] : null;

  const title = (activeTask ? <span className="taskPanel__title">{activeTask.title}</span> : <span className="taskPanel__title">Add or select task</span>);
  const description = (activeTask ? 
    <div className="taskPanel__desc">
      <span className="taskPanel__desc-title">Description:</span>
      <span className={`taskPanel__desc-text ${activeTask.desc === "" ? "taskPanel__desc-text-empty" : ""}`}>{activeTask.desc === "" ? "Add description to task" : activeTask.desc}</span>
    </div> : null)
  const dates = (activeTask ? (<div className="taskPanel__date-edit">
    <div className="taskPanel__deadline">
      <span className="taskPanel__deadline-title">Deadline:</span>
      <span className="taskPanel__deadline-date">{activeTask.deadline}</span>
    </div>
    <div className="taskPanel__addDate">
      <span className="taskPanel__addDate-title">Add date:</span>
      <span className="taskPanel__addDate-date">{activeTask.addDate}</span>
    </div>
    <button onClick={()=>{setisEditing((prevState)=>(!prevState))}}>{isEditing ? "Save" : "Edit"}</button>
  </div>) : null)
  

  return ( <div className="taskPanel__wrap">
    {title}
    {description}
    {dates}
  </div>);
})
 
export default TaskPanel;