import NavigationBar from "../components/navigationBar/NavigationBar";
import MyTasksCard from "../components/mytasks/MyTasksCard";
// import ButtonAddTask from "../components/UI/ButtonAddTask";
// import { useNavigate } from "react-router-dom";
const MyTasksPage = () => {
  // const navigate = useNavigate();
  // const newTaskHandler = () => {
  //   navigate("/newTask");
  // };
  return (
    <>
      <NavigationBar />

      <MyTasksCard />
    </>
  );
};
export default MyTasksPage;
