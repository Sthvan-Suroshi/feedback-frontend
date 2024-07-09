// import React, { useState } from 'react';
// import './custom.css';

// const FeedbackFormBuilder = () => {
//   const [questions, setQuestions] = useState([]);
//   const [newQuestionText, setNewQuestionText] = useState('');
//   const [newQuestionDescription, setNewQuestionDescription] = useState('');
//   const [newChoices, setNewChoices] = useState(['']);

//   const handleAddQuestion = () => {
//     if (newQuestionText && newChoices.every(choice => choice)) {
//       setQuestions([
//         ...questions,
//         { 
//           id: questions.length + 1, 
//           text: newQuestionText, 
//           description: newQuestionDescription,
//           choices: newChoices 
//         }
//       ]);
//       setNewQuestionText('');
//       setNewQuestionDescription('');
//       setNewChoices(['']);
//     }
//   };

//   const handleChoiceChange = (index, value) => {
//     const choicesCopy = [...newChoices];
//     choicesCopy[index] = value;
//     setNewChoices(choicesCopy);
//   };

//   const addChoiceField = () => {
//     setNewChoices([...newChoices, '']);
//   };

//   return (
//     <div className="custom">
//         <div className="form-container">
//       <div className="form-builder">
//         <h3>Create Your Feedback Form</h3>
//         <input
//           type="text"
//           placeholder="Enter question text"
//           value={newQuestionText}
//           onChange={(e) => setNewQuestionText(e.target.value)}
//           className="input-field"
//         />
//         <textarea
//           placeholder="Enter question description (optional)"
//           value={newQuestionDescription}
//           onChange={(e) => setNewQuestionDescription(e.target.value)}
//           className="textarea-field"
//         />
//         {newChoices.map((choice, index) => (
//           <input
//             key={index}
//             type="text"
//             placeholder={`Choice ${index + 1}`}
//             value={choice}
//             onChange={(e) => handleChoiceChange(index, e.target.value)}
//             className="input-field"
//           />
//         ))}
//         <button
//           onClick={addChoiceField}
//           className="add-choice-btn"
//         >
//           Add Choice
//         </button>
//         {/* <br /> */}
//         <button
//           onClick={handleAddQuestion}
//           className="add-question-btn"
//         >
//           Add Question
//         </button>
//       </div>
//       <div className="form-preview">
//         <h3>Preview Feedback Form</h3>
//         {questions.length === 0 ? (
//           <div>No questions added yet.</div>
//         ) : (
//           questions.map((question, index) => (
//             <div key={index} className="question-preview">
//               <div>{question.id} ➔ {question.text}</div>
//               {question.description && (
//                 <div className="question-description">
//                   {question.description}
//                 </div>
//               )}
//               <div className="choices-preview">
//                 {question.choices.map((choice, idx) => (
//                   <button key={idx} className="choice-btn">
//                     {String.fromCharCode(65 + idx)} {choice}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//     </div>
//   );
// };

// export default FeedbackFormBuilder;


import React, { useState } from 'react';
// import './custom.css';


const FeedbackFormBuilder = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newQuestionDescription, setNewQuestionDescription] = useState('');
  const [newChoices, setNewChoices] = useState(['']);
  const [showDescription, setShowDescription] = useState(false);
  const [editQuestionIndex, setEditQuestionIndex] = useState(null);
  const [editChoiceIndex, setEditChoiceIndex] = useState(null);

  const handleAddQuestion = () => {
    if (newQuestionText && newChoices.every(choice => choice)) {
      const updatedQuestions = [...questions];
      if (editQuestionIndex !== null) {
        updatedQuestions[editQuestionIndex] = {
          id: editQuestionIndex + 1,
          text: newQuestionText,
          description: newQuestionDescription,
          choices: newChoices
        };
        setEditQuestionIndex(null);
      } else {
        updatedQuestions.push({
          id: questions.length + 1,
          text: newQuestionText,
          description: newQuestionDescription,
          choices: newChoices
        });
      }
      setQuestions(updatedQuestions);
      setNewQuestionText('');
      setNewQuestionDescription('');
      setNewChoices(['']);
      setShowDescription(false);
    }
  };

  const handleChoiceChange = (index, value) => {
    const choicesCopy = [...newChoices];
    choicesCopy[index] = value;
    setNewChoices(choicesCopy);
  };

  const addChoiceField = () => {
    setNewChoices([...newChoices, '']);
  };

  const handleEditQuestion = (index) => {
    const question = questions[index];
    setNewQuestionText(question.text);
    setNewQuestionDescription(question.description);
    setNewChoices(question.choices);
    setShowDescription(!!question.description);
    setEditQuestionIndex(index);
  };

  const handleEditChoice = (questionIndex, choiceIndex) => {
    setEditQuestionIndex(questionIndex);
    setEditChoiceIndex(choiceIndex);
    const question = questions[questionIndex];
    setNewQuestionText(question.text);
    setNewQuestionDescription(question.description);
    setNewChoices(question.choices);
    setShowDescription(!!question.description);
  };

  const handleUpdateChoice = () => {
    if (editChoiceIndex !== null) {
      const updatedQuestions = [...questions];
      const updatedChoices = [...questions[editQuestionIndex].choices];
      updatedChoices[editChoiceIndex] = newChoices[editChoiceIndex];
      updatedQuestions[editQuestionIndex].choices = updatedChoices;
      setQuestions(updatedQuestions);
      setEditChoiceIndex(null);
      setEditQuestionIndex(null);
      setNewQuestionText('');
      setNewQuestionDescription('');
      setNewChoices(['']);
      setShowDescription(false);
    }
  };

  return (
    <div className="custom bg-red-500 w-screen h-screen">red
      <div className="form-container flex flex-col p-[20px] max-w-[600px] mx-[auto] my-[0] [box-shadow:0_4px_8px_rgba(0,0,0,0.1)] rounded-[8px] bg-[#f9f9f9]">
      <div className="form-builder w-full">
        <h3 className='mb-[20px] text-[#333]'>Create Your Feedback Form</h3>
        <input
          type="text"
          placeholder="Enter question text"
          value={newQuestionText}
          onChange={(e) => setNewQuestionText(e.target.value)}
          className="input-field w-full p-[10px] mb-[15px] border-[1px] border-[solid] border-[#ccc] rounded-[4px]"
        />
        {showDescription && (
          <textarea
            placeholder="Enter question description (optional)"
            value={newQuestionDescription}
            onChange={(e) => setNewQuestionDescription(e.target.value)}
            className="textarea-field w-full p-[10px] mb-[15px] border-[1px] border-[solid] border-[#ccc] rounded-[4px]  h-[100px] resize-none"
          />
        )}
        <button
          onClick={() => setShowDescription(!showDescription)}
          className="toggle-description-btn bg-[#007bff] text-[white] p-[10px] border-[none] rounded-[4px] cursor-pointer mr-[10px] mb-[10px] hover:bg-[#0056b3]"
        >
          {showDescription ? 'Remove Description' : 'Add Description'}
        </button>
        {newChoices.map((choice, index) => (
          <div key={index} className="choice-field flex items-center">
            <input
              type="text"
              placeholder={`Choice ${index + 1}`}
              value={choice}
              onChange={(e) => handleChoiceChange(index, e.target.value)}
              className="input-field"
            />
            {editChoiceIndex === null && (
              <button onClick={() => handleEditChoice(editQuestionIndex, index)} className="edit-btn bg-[#007bff] text-[white] p-[10px] border-[none] rounded-[4px] cursor-pointer mr-[10px] mb-[10px] hover:bg-[#0056b3]">Edit</button>
            )}
          </div>
        ))}
        <button onClick={addChoiceField} className="add-choice-btn bg-[#007bff] text-[white] p-[10px] border-[none] rounded-[4px] cursor-pointer mr-[10px] mb-[10px] hover:bg-[#0056b3]">
          Add Choice
        </button>
        <br />
        <button onClick={editChoiceIndex !== null ? handleUpdateChoice : handleAddQuestion} className="add-question-btn bg-[#007bff] text-[white] p-[10px] border-[none] rounded-[4px] cursor-pointer mr-[10px] mb-[10px] hover:bg-[#0056b3]">
          {editQuestionIndex !== null ? 'Update Question' : 'Add Question'}
        </button>
      </div>
      <div className="form-preview">
        <h3 className='mb-[20px] text-[#333]'>Preview Feedback Form</h3>
        {questions.length === 0 ? (
          <div>No questions added yet.</div>
        ) : (
          questions.map((question, index) => (
            <div key={index} className="question-preview mb-[20px]">
              <div>{question.id} ➔ {question.text}</div>
              {question.description && (
                <div className="question-description italic mb-[10px] text-[#666]">
                  {question.description}
                </div>
              )}
              <div className="choices-preview mr-[10px] bg-[#6c757d] hover:bg-[#5a6268]">
                {question.choices.map((choice, idx) => (
                  <button key={idx} className="choice-btn bg-[#007bff] text-[white] p-[10px] border-[none] rounded-[4px] cursor-pointer mr-[10px] mb-[10px] hover:bg-[#0056b3] ">
                    {String.fromCharCode(65 + idx)} {choice}
                  </button>
                ))}
              </div>
              <button onClick={() => handleEditQuestion(index)} className="edit-btn bg-[#ffc107] text-[black] hover:bg-[#e0a800]">Edit Question</button>
            </div>
          ))
        )}
      </div>
    </div>
    </div>
  );
};

export default FeedbackFormBuilder;
