import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ data }) => {
  const questions = Object.keys(data.optionCounts);

  const labels = [];
  const datasets = [];
  const questionLabels = [];

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
          backgroundColor: `rgba(${Math.floor(
            Math.random() * 255
          )}, ${Math.floor(Math.random() * 255)}, ${Math.floor(
            Math.random() * 255
          )}, 1)`,
          borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
            Math.random() * 255
          )}, ${Math.floor(Math.random() * 255)}, 1)`,
          borderWidth: 1,
          data: new Array(questions.length).fill(0)
        });
        datasetIndex = datasets.length - 1;
      }
      datasets[datasetIndex].data[questionLabels.length - 1] = responseCount;
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
              backgroundColor: `rgba(${Math.floor(
                Math.random() * 255
              )}, ${Math.floor(Math.random() * 255)}, ${Math.floor(
                Math.random() * 255
              )}, 1)`,
              borderColor: `rgba(${Math.floor(
                Math.random() * 255
              )}, ${Math.floor(Math.random() * 255)}, ${Math.floor(
                Math.random() * 255
              )}, 1)`,
              borderWidth: 1,
              data: new Array(questions.length).fill(0)
            });
            datasetIndex = datasets.length - 1;
          }
          datasets[datasetIndex].data[questionLabels.length - 1] =
            responseCount;
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
              backgroundColor: `rgba(${Math.floor(
                Math.random() * 255
              )}, ${Math.floor(Math.random() * 255)}, ${Math.floor(
                Math.random() * 255
              )}, 1)`,
              borderColor: `rgba(${Math.floor(
                Math.random() * 255
              )}, ${Math.floor(Math.random() * 255)}, ${Math.floor(
                Math.random() * 255
              )}, 1)`,
              borderWidth: 1,
              data: new Array(questions.length).fill(0)
            });
            datasetIndex = datasets.length - 1;
          }
          datasets[datasetIndex].data[questionLabels.length - 1] =
            options[option];
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

  return <Bar data={chartData} options={options} />;
};

export default BarChart;
