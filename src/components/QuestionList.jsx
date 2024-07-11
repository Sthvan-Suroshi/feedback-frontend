const QuestionsList = ({
  questions,
  handleEditQuestion,
  handleDeleteQuestion,
}) => (
  <div className="w-96 flex flex-col">
    <h3 className="text-xl font-bold mb-2">Questions List</h3>
    <div className="list-disc">
      {questions.map((q, index) => (
        <ul key={index} className="mb-2">
          <strong className="font-semibold">
            {index + 1}. {q.question}
          </strong>
          {q.options ? (
            <div className="list-disc pl-2">
              {q.options.map((opt, idx) => (
                <p key={idx} className="text-gray-700">
                  {idx + 1} {opt}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-gray-700">
              Description: {q.description ? "True" : "False"}
            </p>
          )}
          <div className="my-2">
            <button
              type="button"
              className="bg-yellow-500 text-white px-2 py-1 rounded-md shadow-sm hover:bg-yellow-600 mr-2"
              onClick={() => handleEditQuestion(index)}
            >
              Edit
            </button>
            <button
              type="button"
              className="bg-red-500 text-white px-2 py-1 rounded-md shadow-sm hover:bg-red-600"
              onClick={() => handleDeleteQuestion(index)}
            >
              Delete
            </button>
          </div>
        </ul>
      ))}
    </div>
  </div>
);

export default QuestionsList;
