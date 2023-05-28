import React from "react";

const UserDataContext = React.createContext({
  tasks: "",
  myTasks: "",
  error: "",
  isLoading: "",
  addTask: (newTask) => {},
  deleteTask: (taskTitleForDelete) => {},
  updateTask:(taskForUpdate)=>{},
  completeTask:(taskForComplete)=>{},
  logTaskTime:(loggedTask)=>{},
  setCtxLoading:()=>{},
  // fetchTasks: () => {},
  // getMyTasks:()=>{},
  userUsername: "",
  userEmail: "",
  userUID: "",
  userBirthday: "",
  userPosition: "",
  setInitialValue: (initialEmail) => {},
  addBirthday: (newBirthday) => {},
  addPosition: (newPosition) => {},
});

export default UserDataContext;
