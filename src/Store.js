import { makeObservable, observable, action } from 'mobx';

class TaskItemStore {
  id = "";
  title = "";
  desc = "";
  addDate = "";
  deadline = "";
  checked = false;

  constructor(id, title, desc, addDate, deadline) {
    makeObservable(this, {
      id: observable,
      title: observable,
      desc: observable,
      addDate: observable,
      deadline: observable,
      checked: observable,
      editTask: action,
    });
    this.id = id
    this.title = title
    this.desc = desc
    this.addDate = addDate
    this.deadline = deadline
  }

  editTask = (title, desc, addDate, deadline) => {
    this.title = title;
    this.desc = desc;
    this.addDate = addDate;
    this.deadline = deadline;
  }

  checkTask = () => {
    this.checked = !this.checked
  }
}

class TaskStore {
  taskList = [];
  activeTaskID = "";
  isEditing = false;

  constructor() {
    makeObservable(this, {
      taskList: observable,
      activeTaskID: observable,
      isEditing: observable,
      addTask: action,
      removeTask: action,
      setActiveTask: action,
      setisEditing: action,
    }, { proxy: false });
  }

  addTask = (title, desc, addDate, deadline) => {
    const id = Math.random();
    this.taskList.push(new TaskItemStore(id, title, desc, addDate, deadline));
  }

  removeTask = (id) => {
    const taskIndex = this.taskList.findIndex(e => e.id === id);
    this.taskList.splice(taskIndex, 1);
  }

  setActiveTask = (id) => {
    this.activeTaskID = id;
  }

  setisEditing = (value) => {
    this.isEditing = value;
  }
}

export const store = new TaskStore();