import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useCubeQuery } from "@cubejs-client/react";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Charts() {
  const { resultSet, isLoading, error } = useCubeQuery({
    measures: ["Orders.count"],
    dimensions: ["ProductCategories.name"],
    filters: [],
    timeDimensions: [
      {
        dimension: "Orders.createdAt",
        granularity: "month",
        dateRange: "last 6 months",
      },
    ],
  });

  if (isLoading) return "Loading...";
  if (error) return <p>{error.toString()}</p>;
  if (!resultSet) return null;

  const labels = resultSet
    .seriesNames({
      x: [],
      y: ["Orders.createdAt"],
    })
    .map((column) => moment(column.yValues[0]).format("MMMM/YY"));

  const datasets = resultSet.series().map((item, i) => ({
    label: item.title.replace(", Orders Count", ""),
    data: item.series.map((item) => item.value),
  }));

  return (
    <div className="chart-holder">
      <Bar
        data={{
          labels,
          datasets,
        }}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top" as const,
            },
            title: {
              display: true,
              text: "Orders",
            },
          },
        }}
      />
    </div>
  );
}
