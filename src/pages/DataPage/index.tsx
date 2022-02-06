import React, { useContext } from "react";
import Container from "@mui/material/Container";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  ScatterController,
} from "chart.js";
import { Chart } from "react-chartjs-2";

import { AppContext } from "../../state/context";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  ScatterController,
  Legend,
  Tooltip,
);
const DataPage = () => {
  const {
    state: { data, fileName },
  } = useContext(AppContext);
  return (
    <Container maxWidth="xl">
      <h1>DataPage</h1>

      <Chart
        type="scatter"
        data={{
          datasets: [
            {
              label: `${fileName.split(".")[0]} : Scatter Dataset`,
              data: data,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
          ],
        }}
      />
    </Container>
  );
};

export default DataPage;
