import UserContext from "./userData-context";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import { myFirebaseUrl } from "../util/myFirebase";
import { useState, useEffect, useCallback } from "react";

const UserProvider = (props) => {
  const [tasks, setTasks] = useState([]);
  const [myTasks, setMyTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [userUID, setUserUID] = useState("");
  const [userUsername, setUserUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userBirthday, setUserBirthday] = useState("");
  const [userPosition, setUserPosition] = useState("");
  const addBirthdayHandler = (newBirthday) => {
    setUserBirthday(newBirthday);
  };
  const addPositionHandler = (newPosition) => {
    setUserPosition(newPosition);
  };
  const addTaskHandler = (newTask) => {
    const newTasks = [newTask, ...tasks];
    if (newTask.assignedUser === userEmail) {
      const newMyTasks = [newTask, ...myTasks];
      setMyTasks(newMyTasks);
    }
    setTasks(newTasks);
  };
  const setInitialValue = (initialEmail) => {
    setUserEmail(initialEmail);
  };

  const deleteTaskHandler = async (taskTitleForDelete) => {
    setIsLoading(true);
    const tasksArray = [...tasks];
    tasksArray.filter((task) => {
      console.log(task);
      if (task.title === taskTitleForDelete) {
        console.log("SAMO JEDAN JE ", task);
        console.log("index mu je ", tasksArray.indexOf(task));
        axios
          .delete(myFirebaseUrl + "tasks/" + taskTitleForDelete + ".json")
          .then(() => {
            tasksArray.splice(tasksArray.indexOf(task), 1);
            if (task.assignedUser === userEmail) {
              const newMyTasks = [...myTasks];
              newMyTasks.splice(newMyTasks.indexOf(task), 1);
              setMyTasks(newMyTasks);
            }

            setIsLoading(false);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
    // tasksArray.pop()
    console.log("tasks su ", tasks);
    console.log("obrisani je", tasksArray);
    setTasks(tasksArray);
    console.log("zasto??");
  };

  const getUser = useCallback(async () => {
    // async function getUser() {
    try {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        console.log("ovdje sammmmmmmmmmmmmmmmmmmmmmmmmm");
        console.log(user.email);
        if (user) {
          console.log("udjem i ovdje cak...");
          //User is signed in
          console.log(user.uid);
          setUserUID(user.uid);
        } else {
          // User is signed out
        }
      });

      console.log("jel se ovo stvarno");
      const response = await axios.get(
        myFirebaseUrl + "users/" + userUID + ".json"
      );
      const data = response.data;
      setUserEmail(data.email);
      setUserUsername(data.username);
      setUserPosition(data.position);
      setUserBirthday(data.birthday);

      //dio za taskove...
      setIsLoading(true);

      const responseTitles = await axios.get(myFirebaseUrl + "tasks" + ".json");
      if (responseTitles.statusText !== "OK") {
        throw new Error("Something went wrong: " + responseTitles.statusText);
      }

      const titles = await responseTitles.data;
      const allTasks = [];
      const tasksForThisUser = [];
      //za svaki title of task, izvadi creatora i uporedi jel to taj
      for (const title in titles) {
        const responseTask = await axios.get(
          myFirebaseUrl + "tasks/" + title + ".json"
        );
        if (responseTask.statusText !== "OK") {
          throw new Error("Something went wrong: " + responseTask.statusText);
        }
        const task = await responseTask.data;
        allTasks.push(task); //jer ovdje cuvamo sve taskove...

        console.log(task.assignedUser, "===", userEmail); //nema mi userEmaila nikako ne kontam..
        if (task.assignedUser === userEmail) {
          tasksForThisUser.push(task); //cuvamo samo koji su assigned ovom useru.
        }
      }
      setTasks(allTasks);
      setMyTasks(tasksForThisUser);
      // } catch (error) {
      //   console.log(error.message);
      //   // setError(error.message);
      // }
      setIsLoading(false);
      //   //   }
      // }, []);
    } catch (error) {
      console.log(error);
    }
    // }
  }, [userUID, userEmail]);

  useEffect(() => {
    console.log("jel se ovo stvarno");
    getUser();
    // fetchTasksHandler();
  }, [getUser]);

  const loadingHandler=()=>{
    setIsLoading(!isLoading);
  }
  const userDataContextValue = {
    tasks,
    error,
    isLoading,
    myTasks,
    loadingHandler,
    addTask: addTaskHandler,
    deleteTask: deleteTaskHandler,
    // fetchTasks: fetchTasksHandler,
    // getMyTasks,
    userUID,
    userUsername,
    userEmail,
    userBirthday,
    userPosition,
    setInitialValue,
    addBirthday: addBirthdayHandler,
    addPosition: addPositionHandler,
  };
  return (
    <UserContext.Provider value={userDataContextValue}>
      {props.children}
    </UserContext.Provider>
  );
};
export default UserProvider;
