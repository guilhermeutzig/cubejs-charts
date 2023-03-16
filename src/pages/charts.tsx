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
    filters: [
      {
        member: "ProductCategories.name",
        operator: "equals",
        values: ["Beauty", "Clothing", "Computers", "Electronics"],
      },
    ],
    timeDimensions: [
      {
        dimension: "Orders.createdAt",
        granularity: "month",
        dateRange: "last 6 month",
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
    .map(({ title }) => title);

  const datasets = resultSet.series().map((item, i) => ({
    label: item.title,
    data: item.series.map((item) => item.value),
  }));

  console.log(labels);

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
