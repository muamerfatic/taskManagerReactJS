import UserDataContext from "../../store/userData-context";
import { useContext, useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Box } from "@mui/material";
import UpdatingForm from "../profile/UpdatingForm";
import modalStyle from "../modals/style-modal";

import { Pie } from "react-chartjs-2";

Chart.register(CategoryScale);
const PieChart = (props) => {
  
  return (
    <>
      <Pie
        data={props.chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Logged Time For Each Task",
            },
          },
        }}
      />
    </>
  );
};

export default PieChart;
