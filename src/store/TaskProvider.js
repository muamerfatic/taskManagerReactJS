// import TasksContext from "./tasks-context";
// import axios from "axios";
// import { myFirebaseUrl } from "../util/myFirebase";
// import { useState, useEffect, useCallback, useContext } from "react";
// import UserDataContext from "./userData-context";
// import { getAuth, onAuthStateChanged } from "firebase/auth";

// const TaskProvider = (props) => {
//   const ctxUserData = useContext(UserDataContext);
//   const [tasks, setTasks] = useState([]);
//   const [myTasks, setMyTasks] = useState([]);
//   //   const [userEmail, setUserEmail] = useState();
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   //   const auth = getAuth();
//   //   onAuthStateChanged(auth, (user) => {
//   //     if (user) {
//   //       //User is signed in
//   //       setUserEmail(user.email);
//   //     } else {
//   //       // User is signed out
//   //     }
//   //   });

//     const fetchTasksHandler = useCallback(async () => {
// //   async function fetchTasksHandler() {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const responseTitles = await axios.get(myFirebaseUrl + "tasks" + ".json");
//       if (responseTitles.statusText !== "OK") {
//         throw new Error("Something went wrong: " + responseTitles.statusText);
//       }

//       const titles = await responseTitles.data;
//       const allTasks = [];
//       const tasksForThisUser = [];
//       //za svaki title of task, izvadi creatora i uporedi jel to taj
//       for (const title in titles) {
//         const responseTask = await axios.get(
//           myFirebaseUrl + "tasks/" + title + ".json"
//         );
//         if (responseTask.statusText !== "OK") {
//           throw new Error("Something went wrong: " + responseTask.statusText);
//         }
//         const task = await responseTask.data;
//         allTasks.push(task); //jer ovdje cuvamo sve taskove...
//         console.log(task.assignedUser, "===", ctxUserData.userEmail);
//         if (
//           task.assignedUser === ctxUserData.userEmail
//         ) {
//           tasksForThisUser.push(task); //cuvamo samo koji su assigned ovom useru.
//         }
//       }

//       //   console.log(tasksOfThisCreator);
//       setTasks(allTasks);
//       setMyTasks(tasksForThisUser);
//     } catch (error) {
//       console.log(error.message);
//       setError(error.message);
//     }
//     setIsLoading(false);
// //   }
//     }, []);

//   useEffect(() => {
//     fetchTasksHandler();
//   }, [fetchTasksHandler]);

//   const tasksContextValue = {
//     tasks,
//     error,
//     isLoading,
//     myTasks,
//     fetchTasks: fetchTasksHandler,
//   };

//   return (
//     <TasksContext.Provider value={tasksContextValue}>
//       {props.children}
//     </TasksContext.Provider>
//   );
// };
// export default TaskProvider;
