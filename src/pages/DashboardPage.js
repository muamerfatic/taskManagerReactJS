import { useContext } from "react";
import NavigationBar from "../components/navigationBar/NavigationBar";
import UserDataContext from "../store/userData-context";
const DashboardPage = () => {
  const ctxUserData = useContext(UserDataContext);

  return (
    <div>
      <NavigationBar />
      <h1>Dashboard</h1>
    </div>
  );
};
export default DashboardPage;
