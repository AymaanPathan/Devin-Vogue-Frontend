/* eslint-disable react/prop-types */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Sidebar from "./SideBar";

// Register the components you need
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ chartData }) => {
  return (
    <div className="flex flex-1">
      <Sidebar />
      <div className="flex-1 p-4">
        <div className="w-full h-[400px] md:h-[500px] lg:h-[600px]">
          <Bar data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default BarChart;
