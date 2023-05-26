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

  const getUser = useCallback(async () => {
    // async function getUser() {
    try {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserUID(user.uid);
        } else {
          // User is signed out
        }
      });

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

      const responseTitles = await axios.get(myFirebaseUrl + "tasks.json");
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

        if (task.assignedUser === userEmail) {
          tasksForThisUser.push(task); //cuvamo samo koji su assigned ovom useru. Koji ce biti dodani u MyTasks
        }
      }
      setTasks(allTasks);
      setMyTasks(tasksForThisUser);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [userUID, userEmail]);

  useEffect(() => {
    getUser();
    // fetchTasksHandler();
  }, [getUser]);

  const loadingHandler = () => {
    setIsLoading(!isLoading);
  };

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
      if (task.title === taskTitleForDelete) {
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
            setError(error);
          });
      }
    });
    setTasks(tasksArray);
  };

  const updateTaskHandler = (taskForUpdate) => {
    const tempTasks = [...tasks];
    const tempMyTasks = [...myTasks];
    let addedInMyTask = false;
    for (const counter in tempTasks) {
      if (tempTasks.at(counter).title === taskForUpdate.title) {
        tempTasks[counter] = taskForUpdate;
        if (tempTasks[counter].assignedUser === userEmail) {
          tempMyTasks.push(tempTasks[counter]);
          addedInMyTask = true;
        }
        break;
      }
    }

    //ako je tek dodan nema potrebe ici ga traziti ovdje.
    if (!addedInMyTask) {
      for (const counter in tempMyTasks) {
        if (tempMyTasks.at(counter).title === taskForUpdate.title) {
          tempMyTasks[counter] = taskForUpdate;
          if (tempMyTasks.at(counter).assignedUser !== userEmail) {
            //ako se promijenio assignedUser, tj ako vise nisam ja treba me izbacit odavdje.
            tempMyTasks.splice(counter, 1);
          }
          break;
        }
      }
    }
    setTasks(tempTasks);
    setMyTasks(tempMyTasks);
  };

  const userDataContextValue = {
    tasks,
    error,
    isLoading,
    myTasks,
    loadingHandler,
    addTask: addTaskHandler,
    deleteTask: deleteTaskHandler,
    updateTask: updateTaskHandler,
    //
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
