import  { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllFeedbacksToForm } from "../store/Slices/feedbackSlice";
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
import { IoIosArrowBack } from "react-icons/io";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Loading Component
const Loader = ({ h = "16" }) => (
  <div
    className={`h-${h} w-${h} border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin`}
  />
);

// Error Message Component
const ErrorMessage = ({ message }) => (
  <div className="max-w-xl mx-auto p-4 bg-red-50 text-red-600 rounded-md mt-8">
    <p className="text-center">{message}</p>
  </div>
);

// Chart Options Configuration
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top"
    },
    title: {
      display: true,
      text: "Response Distribution",
      color: "#3e3e65",
      font: {
        size: 18,
        weight: "bold"
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        color: "#3e3e65"
      }
    },
    x: {
      ticks: {
        color: "#3e3e65"
      }
    }
  }
};

// Multiple Choice Question Component
const MCQResponses = ({ options }) => {
  const total = Object.values(options).reduce((a, b) => a + b, 0);

  const chartData = {
    labels: Object.keys(options),
    datasets: [
      {
        label: "Responses",
        data: Object.values(options),
        backgroundColor: "#2e61a8",
        borderColor: "#214e82",
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="mt-4">
      <div className="mb-4 h-64">
        <Bar data={chartData} options={chartOptions} />
      </div>
      <ul className="space-y-2">
        {Object.entries(options).map(([opt, count]) => (
          <li key={opt} className="flex items-center text-[#214e82]">
            <span className="font-medium mr-2 w-1/4">{opt}:</span>
            <div className="flex-grow flex items-center">
              <div className="w-full bg-[#e0e7ff] rounded-full h-4 overflow-hidden">
                <div
                  className="bg-[#2e61a8] h-full rounded-full transition-all duration-300"
                  style={{ width: `${(count / total) * 100}%` }}
                />
              </div>
              <span className="ml-2 min-w-[30px] text-right">{count}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Descriptive Answers Component
const DescriptiveAnswers = ({ answers }) => (
  <div className="mt-4 space-y-3">
    {answers.map((answer, index) => (
      <div
        key={index}
        className="p-3 bg-white rounded-md shadow-sm border border-gray-100"
      >
        {answer}
      </div>
    ))}
  </div>
);

// Main Form Analytics Component
const FormAnalytics = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const formId = atob(id);

  const {
    loading,
    feedback: data,
    error
  } = useSelector((state) => state.feedback);
  const accountType = useSelector((state) => state.auth.accountType);

  useEffect(() => {
    dispatch(getAllFeedbacksToForm(formId));
  }, [dispatch, formId]);

  // Loading State
  if (loading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center z-[999]">
        <Loader h="32" />
      </div>
    );
  }

  // Error State
  if (error) {
    return <ErrorMessage message={error} />;
  }

  // No Data State
  if (!data) {
    return (
      <div className="max-w-xl mx-auto p-4 bg-white shadow-lg rounded-md mt-8">
        <p className="text-2xl text-center text-gray-600">
          No feedback available yet!
        </p>
      </div>
    );
  }

  // Process MCQ questions for summary chart
  const getSummaryChartData = () => {
    const mcqQuestions = Object.entries(data.optionCounts).filter(
      ([_, options]) => !Array.isArray(options)
    );

    return {
      labels: mcqQuestions.map((_, index) => `Q${index + 1}`),
      datasets: [
        {
          label: "Total Responses",
          data: mcqQuestions.map(([_, options]) =>
            Object.values(options).reduce((sum, count) => sum + count, 0)
          ),
          backgroundColor: "#2e61a8",
          borderColor: "#214e82",
          borderWidth: 1
        }
      ]
    };
  };

  // Check if there are any MCQ questions
  const hasOptionBasedQuestions = Object.values(data.optionCounts).some(
    (options) => !Array.isArray(options)
  );

  return (
    <div className="mx-auto max-w-4xl p-4 bg-white shadow-lg rounded-md mt-8">
      {/* Navigation */}
      <Link
        to={accountType === "admin" ? "/admin/view-forms" : "/your-forms"}
        className="flex items-center text-[#214e82] hover:text-[#2e61a8] transition-colors duration-300 mb-4"
      >
        <IoIosArrowBack className="mr-2" /> Back
      </Link>

      {/* Header */}
      <h1 className="text-2xl font-bold mb-4 text-[#3e3e65] pb-2 border-b-2">
        {data.formTitle}
      </h1>
      {data.formDescription && (
        <p className="text-gray-600 mb-6">{data.formDescription}</p>
      )}

      {/* MCQ Summary Chart */}
      {hasOptionBasedQuestions && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-[#3e3e65]">
            Response Summary
          </h2>
          <div className="h-64">
            <Bar data={getSummaryChartData()} options={chartOptions} />
          </div>
        </div>
      )}

      {/* Individual Questions */}
      <div className="space-y-8">
        {Object.entries(data.optionCounts).map(([question, responses], idx) => (
          <div key={question} className="p-4 bg-[#f0f4f8] rounded-lg shadow-md">
            <div className="flex items-start gap-2">
              <span className="bg-[#2e61a8] text-white px-2 py-1 rounded-md text-sm">
                Q{idx + 1}
              </span>
              <h3 className="text-lg font-semibold text-[#3e3e65] flex-1">
                {question}
              </h3>
            </div>

            {Array.isArray(responses) ? (
              responses.length > 0 ? (
                <DescriptiveAnswers answers={responses} />
              ) : (
                <p className="mt-4 text-gray-500 italic">No responses yet</p>
              )
            ) : (
              <MCQResponses options={responses} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormAnalytics;
