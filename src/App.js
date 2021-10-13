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
  const { taskList, removeTask } = store;

  const renderTasks = (taskList) => {
    const tasks = taskList.slice().sort((el, prevEl) => el.deadline > prevEl.deadline).map(e => <TaskListItem key={e.id} task={e} removeTask={removeTask} />);
    return tasks;
  }

  return (<>
    <Header />
    <main className="main">
      <TaskPanel />
      <ul className="taskList__list">
        <AddTask />
        {renderTasks(taskList)}
      </ul>
    </main>
  </>);
})

export default App;
