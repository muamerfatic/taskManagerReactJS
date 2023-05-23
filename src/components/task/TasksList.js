import Task from "../task/Task";
import UserDataContext from "../../store/userData-context";
import { useContext } from "react";
import { Box } from "@mui/material";
import UpdatingForm from "../profile/UpdatingForm";
import modalStyle from "../modals/style-modal";
import ErrorPage from "../../pages/ErrorPage";
const TasksList = (props) => {
  
  // const ctxUserData = useContext(UserDataContext);
  // if (ctxUserData.error) {
  //   return (
  //     <Box sx={modalStyle}>
  //       <ErrorPage message={ctxUserData.error} />
  //     </Box>
  //   );
  // }

  // if (ctxUserData.isLoading) {
  //   return (
  //     //   <Box sx={modalStyle}>
  //     <UpdatingForm />
  //     //   </Box>
  //   );
  // }
  return (
    
    <>
      {props.tasks.map((task) => (
        <Task
          key={task.title}
          title={task.title}
          creator={task.creator}
          assignedUser={task.assignedUser}
          dueDate={task.dueDate}
          status={task.status}
          priority={task.priority}
        />
      ))}
    </>
  );
};
export default TasksList;
