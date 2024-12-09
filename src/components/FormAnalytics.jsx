import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { motion } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FormAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const { id } = useParams();
  const formId = atob(id);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulating API call - replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setData({
          formTitle: "Customer Satisfaction Survey",
          formDescription: "Help us improve our services",
          optionCounts: {
            "How satisfied are you with our product?": {
              "Very Satisfied": 45,
              "Satisfied": 30,
              "Neutral": 15,
              "Dissatisfied": 7,
              "Very Dissatisfied": 3
            },
            "Would you recommend our product to others?": {
              "Definitely": 50,
              "Probably": 25,
              "Not Sure": 15,
              "Probably Not": 7,
              "Definitely Not": 3
            },
            "Any additional comments?": [
              "Great product!",
              "Could use some improvements",
              "Love the customer service"
            ]
          }
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [formId]);

  const Loader = () => (
    <motion.div
      className="h-32 w-32 border-4 border-t-[#2e61a8] border-r-[#214e82] border-b-[#3e3e65] border-l-[#e0e7ff] rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );

  const BarChart = ({ data }) => {
    const chartData = {
      labels: Object.keys(data),
      datasets: [
        {
          label: 'Number of Responses',
          data: Object.values(data).map(count => typeof count === 'number' ? count : count.length),
          backgroundColor: '#2e61a8',
          borderColor: '#214e82',
          borderWidth: 1,
        },
      ],
    };

    const options = {
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

    return <Bar data={chartData} options={options} />;
  };

  if (loading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center z-[999] bg-[#3e3e65] bg-opacity-50">
        <Loader />
      </div>
    );
  }

  if (!data) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl mx-auto p-8 bg-white shadow-lg rounded-md mt-8 min-w-96 h-fit"
      >
        <p className="text-2xl text-center text-[#3e3e65]">No feedbacks yet!</p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-4 sm:p-8 bg-white shadow-2xl rounded-lg my-8"
    >
      <Link
        to="/forms"
        className="flex items-center text-[#214e82] hover:text-[#2e61a8] transition-colors duration-300 mb-6"
      >
        <IoIosArrowBack className="mr-2" /> Back to Forms
      </Link>

      <motion.h1 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
        className="text-2xl sm:text-3xl font-bold mb-6 text-[#3e3e65] border-b-2 border-[#214e82] pb-2"
      >
        {data.formTitle}
      </motion.h1>

      <motion.p 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 120 }}
        className="text-gray-600 mb-8"
      >
        {data.formDescription}
      </motion.p>

      <div className="space-y-8">
        {Object.entries(data.optionCounts).map(([question, options], idx) => (
          <motion.div 
            key={question}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 + idx * 0.1, duration: 0.5 }}
            className="p-4 sm:p-6 bg-[#f0f4f8] rounded-lg shadow-md"
          >
            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-[#3e3e65]">
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
                <div className="mb-4">
                  <BarChart data={options} />
                </div>
                <ul className="space-y-2">
                  {Object.entries(options).map(([opt, count]) => (
                    <li key={opt} className="flex flex-col sm:flex-row sm:items-center text-[#214e82]">
                      <span className="font-medium mr-2 mb-1 sm:mb-0">{opt}:</span>
                      <div className="flex-grow flex items-center">
                        <div className="w-full bg-[#e0e7ff] rounded-full h-4 overflow-hidden">
                          <motion.div 
                            className="bg-[#2e61a8] h-full rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${(count / Object.values(options).reduce((a, b) => a + b, 0)) * 100}%` }}
                            transition={{ duration: 1, delay: 1 }}
                          />
                        </div>
                        <span className="ml-2 min-w-[30px] text-right">{count}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default FormAnalytics;

