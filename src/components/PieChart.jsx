import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PieController,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PieController,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const PieChart = ({ data }) => {
  const questions = Object.keys(data.optionCounts);

  const labels = [];
  const questionLabels = [];
  const datasets = [];

  questions.forEach((question) => {
    const options = data.optionCounts[question];

    if (Array.isArray(options)) {
      // Handling options as an array of strings (responses)
      const responseCount = options.length;
      if (!labels.includes("Responses")) {
        labels.push("Responses");
      }

      questionLabels.push(question);

      let datasetIndex = datasets.findIndex(
        (dataset) => dataset.label === "Responses"
      );
      if (datasetIndex === -1) {
        datasets.push({
          label: "Responses",
          backgroundColor: [],
          borderColor: [],
          borderWidth: 1,
          data: []
        });
        datasetIndex = datasets.length - 1;
      }

      datasets[datasetIndex].data.push(responseCount);
      datasets[datasetIndex].backgroundColor.push(
        `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
          Math.random() * 255
        )}, ${Math.floor(Math.random() * 255)}, 0.2)`
      );
      datasets[datasetIndex].borderColor.push(
        `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
          Math.random() * 255
        )}, ${Math.floor(Math.random() * 255)}, 1)`
      );
    } else {
      // Handling options as an object
      questionLabels.push(question);

      Object.keys(options).forEach((option) => {
        if (Array.isArray(options[option])) {
          const responseCount = options[option].length;
          if (!labels.includes(option)) {
            labels.push(option);
          }

          let datasetIndex = datasets.findIndex(
            (dataset) => dataset.label === option
          );
          if (datasetIndex === -1) {
            datasets.push({
              label: option,
              backgroundColor: [],
              borderColor: [],
              borderWidth: 1,
              data: []
            });
            datasetIndex = datasets.length - 1;
          }

          datasets[datasetIndex].data.push(responseCount);
          datasets[datasetIndex].backgroundColor.push(
            `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
              Math.random() * 255
            )}, ${Math.floor(Math.random() * 255)}, 0.2)`
          );
          datasets[datasetIndex].borderColor.push(
            `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
              Math.random() * 255
            )}, ${Math.floor(Math.random() * 255)}, 1)`
          );
        } else {
          if (!labels.includes(option)) {
            labels.push(option);
          }

          let datasetIndex = datasets.findIndex(
            (dataset) => dataset.label === option
          );
          if (datasetIndex === -1) {
            datasets.push({
              label: option,
              backgroundColor: [],
              borderColor: [],
              borderWidth: 1,
              data: []
            });
            datasetIndex = datasets.length - 1;
          }

          datasets[datasetIndex].data.push(options[option]);
          datasets[datasetIndex].backgroundColor.push(
            `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
              Math.random() * 255
            )}, ${Math.floor(Math.random() * 255)}, 0.2)`
          );
          datasets[datasetIndex].borderColor.push(
            `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
              Math.random() * 255
            )}, ${Math.floor(Math.random() * 255)}, 1)`
          );
        }
      });
    }
  });

  const chartData = {
    labels: questionLabels,
    datasets: datasets
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top"
      },
      title: {
        display: true,
        text: data.formTitle
      }
    }
  };

  return <Pie data={chartData} options={options} />;
};

export default PieChart;
