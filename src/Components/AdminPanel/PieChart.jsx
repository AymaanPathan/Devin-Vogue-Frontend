/* eslint-disable react/prop-types */
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import Sidebar from "./SideBar";

// Register the components you need
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ chartData }) => {
  const options = {
    plugins: {
      legend: {
        position: "right", // Position the legend to the right
      },
    },
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full lg:w-3/4 xl:w-2/3 h-3/4">
          <Pie data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default PieChart;
