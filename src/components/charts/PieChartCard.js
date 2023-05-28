import PieChart from "./PieChart";
import UserDataContext from "../../store/userData-context";
import { useContext, useState, useEffect, useCallback } from "react";
import { Box } from "@mui/material";
import UpdatingForm from "../profile/UpdatingForm";
import modalStyle from "../modals/style-modal";
import chroma from "chroma-js";
import { Pie } from "react-chartjs-2";
const PieChartCard = () => {
  const ctxUserData = useContext(UserDataContext);

  const [isLoading, setIsLoading] = useState(false);
  const [loggedTimeForTasks, setLoggedTimeForTasks] = useState([]);
  const [chartData, setChartData] = useState({
    labels: ctxUserData.myTasks.map((myTask) => myTask.title),
    datasets: [
      {
        label: "Hours per Task",
        data: loggedTimeForTasks,
        backgroundColor: chroma
          .scale(["#00a1e4", "#00db5e"])
          .mode("lab")
          .colors(ctxUserData.myTasks.length),
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  const fetchingChartData =  ()=>{
    let tempArrayOfLoggedTime = [];
      for (const counter in ctxUserData.myTasks) {
        let counterOfWorkingHours = 0;
        for (const counterOfLogTime in ctxUserData.myTasks.at(counter)
          .loggedTime) {
          counterOfWorkingHours =
            parseInt(
              ctxUserData.myTasks.at(counter).loggedTime.at(counterOfLogTime)
                .hours
            ) + counterOfWorkingHours;
         
        }
        tempArrayOfLoggedTime.push(counterOfWorkingHours);
      }
      setLoggedTimeForTasks(tempArrayOfLoggedTime);
      setChartData({
        labels: ctxUserData.myTasks.map((myTask) => myTask.title),
        datasets: [
          {
            label: "Hours per Task",
            data: tempArrayOfLoggedTime,
            backgroundColor: chroma
              .scale(["#00a1e4", "#00db5e"])
              .mode("lab")
              .colors(ctxUserData.myTasks.length),
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });
    }

  useEffect(() => {
    setIsLoading(true);
    fetchingChartData()
    setIsLoading(false);
  }, [ctxUserData.myTasks]);
  
  if (isLoading) {
    <Box sx={modalStyle}>
      <UpdatingForm />
    </Box>
  }
console.log(chartData)
  return (
    <Box
        sx={{
          flexGrow: 1,
          margin: "45px auto",
          textAlign: "center",
          width: "85%",
          border: "2px solid #9F4298",
          borderRadius: "12px",
        }}
      >
        <PieChart chartData={chartData}/>
      </Box>
  );
};
export default PieChartCard;
