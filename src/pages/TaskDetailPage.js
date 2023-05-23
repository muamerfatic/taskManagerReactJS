import { useParams } from "react-router-dom";
import NavigationBar from "../components/navigationBar/NavigationBar";
import TaskDetailCard from "../components/task/task detail/TaskDetailCard";
import { useContext, useEffect, useState } from "react";
import UserDataContext from "../store/userData-context";
import ErrorPage from "./ErrorPage";
const TaskDetailPage=()=>{
    const params=useParams();
    const ctxUserData=useContext(UserDataContext);

    const validateParamsTaskTitle=()=>{
        for (const counter in ctxUserData.tasks) {
            // console.log(ctxUserData.tasks.at(counter).title,'poredi sa ',params.taskTitle)
            if (ctxUserData.tasks.at(counter).title === params.taskTitle) {
              return true;
            }
          }
          return false;
    }
    // console.log('vrati',validateParamsTaskTitle())
    if(!validateParamsTaskTitle()){
return(<ErrorPage message='page doesnt exist'></ErrorPage>)
    }
    return(
        <>
        <NavigationBar/>
        <TaskDetailCard title={params.taskTitle}/>
        </>
    )
}
export default TaskDetailPage;