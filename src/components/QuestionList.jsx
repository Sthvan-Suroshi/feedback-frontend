import { motion, AnimatePresence } from "framer-motion";
import QuestionItem from "./QuestionItem";

const QuestionsList = ({
  questions,
  handleEditQuestion,
  handleDeleteQuestion
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 rounded-xl overflow-y-auto max-h-[90vh] no-scrollbar bg-white shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6 text-[#3e3e65] text-center">
        Questions List
      </h2>

      <AnimatePresence>
        {questions.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-xl text-gray-600 text-center font-semibold"
          >
            No questions yet!
          </motion.p>
        ) : (
          questions.map((q, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <QuestionItem
                question={q.question}
                options={q.options}
                description={q.description}
                index={index}
                onEdit={() => handleEditQuestion(index)}
                onDelete={() => handleDeleteQuestion(index)}
              />
            </motion.div>
          ))
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default QuestionsList;
