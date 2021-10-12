import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';

//Mobexior
import { store } from '../Store.js';

const TaskPanel = observer(() => {
  const { taskList, activeTaskID, setActiveTask, removeTask } = store;

  const [isEditing, setisEditing] = useState(false);

  const activeTask = taskList.length > 0 ? taskList.slice()[taskList.findIndex(e => e.id === activeTaskID)] : null;

  const titleElement = (activeTask ? <span className="taskPanel__title">{activeTask.title}</span> : <span className="taskPanel__title">Add or select task</span>);

  const checkedElement = (activeTask ? (<div className={`taskPanel__checked ${activeTask.checked ? "taskPanel__checked-true" : ""}`}>
    <span className="taskPanel__checked-dot"></span>
    <span className="taskPanel__checked-text">{activeTask.checked ? "Done" : "Undone"}</span>
  </div>) : null)

  const descriptionElement = (activeTask ?
    <div className="taskPanel__desc">
      <span className="taskPanel__desc-title">Description:</span>
      <span className={`taskPanel__desc-text ${activeTask.desc === "" ? "taskPanel__desc-text-empty" : ""}`}>{activeTask.desc === "" ? "Edit to add description to task" : activeTask.desc}</span>
    </div> : null);

  const datesElement = (activeTask ? (<div className="taskPanel__date-edit">
    <div className="taskPanel__deadline">
      <span className="taskPanel__deadline-title">Deadline:</span>
      <span className="taskPanel__deadline-date">{activeTask.deadline}</span>
    </div>
    <div className="taskPanel__addDate">
      <span className="taskPanel__addDate-title">Add date:</span>
      <span className="taskPanel__addDate-date">{activeTask.addDate}</span>
    </div>
    {isEditing ?
      <>
        <button
          className="taskPanel__edit-btn taskPanel__edit-btn-accept"
          onClick={() => {
            activeTask.editTask("dupa", "fas", "fasf", "fasfas");
            setisEditing(false);
          }}>
          Accept
        </button>
        <button
          className="taskPanel__edit-btn taskPanel__edit-btn-abort"
          onClick={() => {
            setisEditing(false);
          }}>
          Abort
        </button>
      </> :
      <>
        <button
          className="taskPanel__edit-btn"
          onClick={() => { setisEditing((prevState) => (!prevState)) }}>
          Edit
        </button>
        <button
          className="taskPanel__delete-btn"
          onClick={() => { removeTask(activeTaskID) }}>
          Delete
        </button>
      </>}
  </div>) : null);


  return (<div className="taskPanel__wrap">
    {titleElement}
    {checkedElement}
    {descriptionElement}
    {datesElement}
  </div>);
})

export default TaskPanel;