import React from 'react';

//Mobexior
import { observer } from 'mobx-react-lite';
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

  const TaskList = observer(() => {
    const tasks = taskList.slice().sort((el, prevEl) => el.deadline > prevEl.deadline).map(e => <TaskListItem key={e.id} task={e} removeTask={removeTask} />);

    return (<ul className="taskList__list">
      <AddTask />
      {tasks}
    </ul>);
  })

  return (<>
    <Header />
    <main className="main">
      <TaskPanel />

      <TaskList />
    </main>
  </>);
})

export default App;
