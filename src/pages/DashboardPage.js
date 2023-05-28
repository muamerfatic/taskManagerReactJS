import { useContext } from "react";
import NavigationBar from "../components/navigationBar/NavigationBar";
import UserDataContext from "../store/userData-context";
import PieChartCard from "../components/charts/PieChartCard";
const DashboardPage = () => {
  const ctxUserData = useContext(UserDataContext);
  console.log(ctxUserData.userEmail)
  
  return (
    <div>
      <NavigationBar />
      <PieChartCard/>
    </div>
  );
};
export default DashboardPage;
