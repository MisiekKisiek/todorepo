import React from 'react';
import { observer } from 'mobx-react-lite';

//Mobexior
import { store } from './Store.js';

//Styles
import './styles/Main.sass';

//Components
import Header from './components/Header';
import TaskListItem from './components/TaskListItem';
import TaskPanel from './components/TaskPanel';
import AddTask from './components/AddTask';

const App = observer(() => {
  const {taskList, addTask, removeTask} = store;

  const renderTasks = (taskList) => {
    const tasks = taskList.slice().map(e => <TaskListItem key={e.id} task={e} removeTask={removeTask}/>);
    return tasks;
  }

  console.log(Object.values(taskList));
  
  return (<>
    <Header/>
    <main className="main">
      <TaskPanel/>
      <ul className="taskList__list">
        <AddTask/>
        {renderTasks(taskList)}
      </ul>
      <button onClick={()=>{addTask("fsafas","fsafsa","fsafas","yryrt")}}>add</button>
      <button onClick={()=>{removeTask("fsa")}}>remove</button>
      <button onClick={()=>{console.log(taskList.slice())}}>show</button>

    </main>
  </>);
})
 
export default App;
