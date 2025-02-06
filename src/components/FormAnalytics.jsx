import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllFeedbacksToForm } from "../store/Slices/feedbackSlice";
import Loader from "./Loader";
import { IoIosArrowBack } from "react-icons/io";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FormAnalytics = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const formId = atob(id);
  const loading = useSelector((state) => state.feedback.loading);
  const accountType = useSelector((state) => state.auth.accountType);
  const data = useSelector((state) => state.feedback.feedback);

  useEffect(() => {
    dispatch(getAllFeedbacksToForm(formId));
  }, [dispatch, formId]);

  if (loading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center z-[999]">
        <Loader h="32" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-xl mx-auto p-4 bg-white shadow-lg rounded-md mt-8 min-w-96 h-fit">
        <p className="text-2xl text-center">No feedbacks yet!</p>
      </div>
    );
  }

  const getSummaryChartData = () => {
    const labels = [];
    const datasets = [];

    Object.entries(data.optionCounts).forEach(([question, options]) => {
      if (!Array.isArray(options)) {
        labels.push(question);
        const totalResponses = Object.values(options).reduce((sum, count) => sum + count, 0);
        datasets.push(totalResponses);
      }
    });

    return {
      labels,
      datasets: [
        {
          label: 'Total Responses',
          data: datasets,
          backgroundColor: '#2e61a8',
          borderColor: '#214e82',
          borderWidth: 1,
        },
      ],
    };
  };

  const getQuestionChartData = (options) => {
    return {
      labels: Object.keys(options),
      datasets: [
        {
          label: 'Responses',
          data: Object.values(options),
          backgroundColor: '#2e61a8',
          borderColor: '#214e82',
          borderWidth: 1,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Response Distribution',
        color: '#3e3e65',
        font: {
          size: 18,
          weight: 'bold',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#3e3e65',
        },
      },
      x: {
        ticks: {
          color: '#3e3e65',
        },
      },
    },
  };

  return (
    <div className="mx-auto max-w-4xl p-4 bg-white shadow-lg rounded-md mt-8">
      <Link
        to={accountType === "admin" ? "/admin/view-forms" : "/your-forms"}
        className="flex items-center text-[#214e82] hover:text-[#2e61a8] transition-colors duration-300 mb-4"
      >
        <IoIosArrowBack className="mr-2" /> Back
      </Link>

      <h1 className="text-2xl font-bold mb-4 text-[#3e3e65] pb-2 border-b-2">{data.formTitle}</h1>
      <p className="text-gray-600 mb-6">{data.formDescription}</p>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-[#3e3e65]">Summary of Responses</h2>
        <Bar data={getSummaryChartData()} options={chartOptions} />
      </div>

      <div className="space-y-8">
        {Object.entries(data.optionCounts).map(([question, options], idx) => (
          <div key={question} className="p-4 bg-[#f0f4f8] rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-[#3e3e65]">
              {idx + 1}. {question}
            </h3>
            {Array.isArray(options) ? (
              <ul className="list-disc pl-6 space-y-1">
                {options.map((feedback, index) => (
                  <li key={index} className="text-gray-700">{feedback}</li>
                ))}
              </ul>
            ) : (
              <>
                <div className="mb-4 h-64">
                  <Bar data={getQuestionChartData(options)} options={chartOptions} />
                </div>
                <ul className="space-y-2">
                  {Object.entries(options).map(([opt, count]) => (
                    <li key={opt} className="flex items-center text-[#214e82]">
                      <span className="font-medium mr-2 w-1/4">{opt}:</span>
                      <div className="flex-grow flex items-center">
                        <div className="w-full bg-[#e0e7ff] rounded-full h-4 overflow-hidden">
                          <div 
                            className="bg-[#2e61a8] h-full rounded-full"
                            style={{ width: `${(count / Object.values(options).reduce((a, b) => a + b, 0)) * 100}%` }}
                          />
                        </div>
                        <span className="ml-2 min-w-[30px] text-right">{count}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormAnalytics;

