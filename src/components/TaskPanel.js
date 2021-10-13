/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

//Mobexior
import { store } from '../Store.js';

const TaskPanel = observer(() => {
  const { taskList, activeTaskID, isEditing, setisEditing } = store;

  const activeTask = taskList.length > 0 ? taskList.slice()[taskList.findIndex(e => e.id === activeTaskID)] : null;

  const [titleInput, settitleInput] = useState(activeTask ? activeTask.title : "");
  const [descInput, setdescInput] = useState(activeTask ? activeTask.desc : "");
  const [addDateInput, setaddDateInput] = useState(activeTask ? activeTask.addDate : "");
  const [deadlineInput, setdeadlineInput] = useState(activeTask ? activeTask.deadline : "");

  const cleanInputs = () => {
    if (isEditing) {
      settitleInput(activeTask.title);
      setdescInput(activeTask.desc);
      setaddDateInput(activeTask.addDate);
      setdeadlineInput(activeTask.deadline);
    }
  };

  useEffect(() => {
    cleanInputs();
  }, [isEditing]);

  const titleElement = (activeTask ? isEditing ?
    <input
      className="taskPanel__title-input"
      type="text"
      name="title"
      id="title"
      placeholder="Enter title"
      maxLength="150"
      value={titleInput}
      onChange={(e) => { settitleInput(e.target.value) }}
    /> :
    <span className="taskPanel__title">{activeTask.title}</span> :
    <span className="taskPanel__title">Add or select task</span>);

  const checkedElement = (activeTask ? (<div className={`taskPanel__checked ${activeTask.checked ? "taskPanel__checked-true" : ""}`}>
    <span className="taskPanel__checked-dot"></span>
    <span className="taskPanel__checked-text">{activeTask.checked ? "Done" : "Undone"}</span>
  </div>) : null);

  const descriptionElement = (activeTask ?
    <div className="taskPanel__desc">
      <span className="taskPanel__desc-title">Description:</span>
      {isEditing ?
        <textarea
          name="desc"
          id="desc"
          className="taskPanel__desc-title-input"
          placeholder="Edit task description"
          minLength="3"
          maxLength="45"
          value={descInput}
          onChange={(e) => { setdescInput(e.target.value) }} />
        : <span className={`taskPanel__desc-text ${activeTask.desc === "" ? "taskPanel__desc-text-empty" : ""}`}>{activeTask.desc === "" ? "Edit to add description to task" : activeTask.desc}</span>}
    </div> : null);

  const datesElement = (activeTask ? (<div className="taskPanel__date-edit">
    <div className="taskPanel__deadline">
      <span className="taskPanel__deadline-title">Deadline:</span>
      {isEditing ? <input
        className="taskPanel__deadline-date-input"
        type="date"
        name="deadline"
        id="deadline"
        placeholder="Enter title"
        value={deadlineInput}
        onChange={(e) => {
          setdeadlineInput(e.target.value)
        }}
      /> :
        <span className="taskPanel__deadline-date">{activeTask.deadline}</span>}
    </div>
    <div className="taskPanel__addDate">
      <span className="taskPanel__addDate-title">Add date:</span>
      {isEditing ? <input
        className="taskPanel__addDate-date-input"
        type="date"
        name="deadline"
        id="deadline"
        placeholder="Enter title"
        value={addDateInput}
        onChange={(e) => {
          setaddDateInput(e.target.value)
        }}
      /> :
        <span className="taskPanel__addDate-date">{activeTask.addDate}</span>}

    </div>
    {isEditing ?
      <>
        <button
          className="taskPanel__edit-btn taskPanel__edit-btn-accept"
          onClick={() => {
            setisEditing(false);
            activeTask.editTask(titleInput, descInput, addDateInput, deadlineInput);
            cleanInputs();
          }}>
          Accept
        </button>
        <button
          className="taskPanel__edit-btn taskPanel__edit-btn-abort"
          onClick={() => {
            setisEditing(false);
            cleanInputs();
          }}>
          Abort
        </button>
      </> : null}
  </div>) : null);

  return (<div className="taskPanel__wrap">
    {titleElement}
    {checkedElement}
    {descriptionElement}
    {datesElement}
  </div>);
})

export default TaskPanel;