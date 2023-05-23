import { useContext } from "react";
import NavigationBar from "../components/navigationBar/NavigationBar";
import UserDataContext from "../store/userData-context";
import TasksContext from "../store/tasks-context";
const DashboardPage = () => {
  
  const ctxUserData = useContext(UserDataContext);
  
  // const tasksArray =[...ctxUserData.tasks];
  // const index=tasksArray.filter((task)=>{
  //   if(task.title==='MIKI'){
  //     console.log(task)
  //     tasksArray.splice(tasksArray.indexOf(task),1)
  //   }
  // })
  // console.log(ctxUserData.tasks)
  // console.log(tasksArray)
  // console.log(index)
  return (
    <div>
      <NavigationBar />
      <h1>Dashboard</h1>
    </div>
  );
};
export default DashboardPage;
