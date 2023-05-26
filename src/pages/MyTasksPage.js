import NavigationBar from "../components/navigationBar/NavigationBar";
import MyTasksCard from "../components/mytasks/MyTasksCard";
import { useContext } from "react";
import UserDataContext from "../store/userData-context";
const MyTasksPage = () => {
  
  const ctxUserData = useContext(UserDataContext);
  console.log(ctxUserData);
  console.log(ctxUserData.myTasks);
  return (
    <>
      <NavigationBar />
      <MyTasksCard />
    </>
  );
};
export default MyTasksPage;
