import { useContext } from "react";
import NavigationBar from "../components/navigationBar/NavigationBar";
import UserDataContext from "../store/userData-context";
import PieChartCard from "../components/charts/PieChartCard";
const DashboardPage = () => {
  
  return (
    <div>
      <NavigationBar />
      <PieChartCard/>
    </div>
  );
};
export default DashboardPage;
