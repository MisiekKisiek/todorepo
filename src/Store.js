import { makeObservable, makeAutoObservable, observable, configure, action } from 'mobx';

class TaskItemStore{
  id = "";
  title = "";
  desc = "";
  addDate = "";
  deadline = "";
  checked = false;

  constructor(id, title, desc, addDate, deadline){
    makeObservable(this,{
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

class TaskStore{
  taskList = [];
  activeTaskID = "";

  constructor(){
    makeObservable(this,{
      taskList: observable,
      activeTaskID: observable,
      addTask: action,
      removeTask: action,
      setActiveTask: action,
    },{proxy: false});
  }

  addTask = ( title, desc, addDate, deadline ) => {
    const setID = () => {
      let id = Math.random();
      while (this.taskList.find(e => e.id === id)) {
        id = Math.random();
      }
      return id;
    }
    this.taskList.push(new TaskItemStore(setID(), title, desc, addDate, deadline));
  }

  removeTask = (id) => {
    const taskIndex = this.taskList.findIndex(e=> e.id === id);
    this.taskList.splice(taskIndex,1);
  }

  setActiveTask = (id) => {
    this.activeTaskID = id
  }
}

export const store = new TaskStore();