import React from "react";

function QuestionPage(props) {
  function handleAnswerClick(questionIndex, answerIndex) {
    props.handleAnswerClick(questionIndex, answerIndex);
  }

  return (
    <section className="questionSection" id="questionPage">
      {props.questions.map((question, questionIndex) => (
        <div className="question" key={question.id}>
          <h3>{question.question}</h3>
          <div className="optionsdiv">
            {props.options[questionIndex].map((option, answerIndex) => (
              <button
                className={`answer ${
                  props.selectedAnswers[questionIndex] === answerIndex
                    ? "selected"
                    : "optionbtn"
                } ${
                  props.showResults &&
                  question.correct_answer === option
                    ? "correct"
                    : ""
                } ${
                  props.showResults &&
                  props.selectedAnswers[questionIndex] === answerIndex &&
                  question.correct_answer !== option
                    ? "incorrect"
                    : ""
                }`}
                key={answerIndex}
                onClick={() => handleAnswerClick(questionIndex, answerIndex)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

export default QuestionPage;
