// App.js
import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import he from "he";
import { shuffle } from "lodash";
import Intro from "./components/IntroPage";
import QuestionPage from "./components/QuestionPage";

function App() {
  const [questions, setQuestions] = useState([]);
  const [started, setStarted] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [playAgain, setPlayAgain] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
 

 




  useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=5&category=${selectedCategory}`)
      .then((res) => res.json())
      .then((data) => {
        const encodedQuestions = data.results.map((result) => ({
          ...result,
          id: nanoid(),
          question: he.decode(result.question),
          correct_answer: he.decode(result.correct_answer),
          incorrect_answers: result.incorrect_answers.map((answer) =>
            he.decode(answer)
          ),
        }));
        setQuestions(encodedQuestions);
        const shuffled = encodedQuestions.map((question) =>
          shuffle([
            ...question.incorrect_answers,
            question.correct_answer,
          ])
        );
        setShuffledOptions(shuffled);
      })
      .catch((error) => {
        console.log("Error fetching questions:", error);
      });
  }, [started,playAgain]);

  function introDisplayNone() {
    setStarted(true);
    document.getElementById("intro").style.display = "none";
    document.getElementById("checkbtn").style.display = "flex";
    
    
  }

  function handleAnswerClick(questionIndex, answerIndex) {
    setSelectedAnswers((prevSelectedAnswers) => {
      const newSelectedAnswers = [...prevSelectedAnswers];
      newSelectedAnswers[questionIndex] = answerIndex;
      return newSelectedAnswers;
    });
  }

  function handleCheckAnswers() {
    const count = questions.reduce((acc, question, index) => {
      const selectedAnswerIndex = selectedAnswers[index];
      const isCorrect =
        selectedAnswerIndex !== undefined &&
        question.correct_answer === shuffledOptions[index][selectedAnswerIndex];
      return isCorrect ? acc + 1 : acc;
    }, 0);
    setCorrectCount(count);
    setShowResults(true);
  }

  function handlePlayAgain() {
    setStarted(false);
  setQuestions([]);
  setShuffledOptions([]);
  setSelectedAnswers([]);
  setShowResults(false);
  setCorrectCount(0);
  setPlayAgain(!playAgain);
  document.getElementById("intro").style.display = "flex";
  document.getElementById("checkbtn").style.display = "none";
  }

  return (
    <main>
      <Intro introDisplayNone={introDisplayNone}
               setSelectedCategory={setSelectedCategory}   />
      {started && (
        <QuestionPage
          questions={questions}
          options={shuffledOptions}
          selectedAnswers={selectedAnswers}
          handleAnswerClick={handleAnswerClick}
          showResults={showResults}
        />
      )}
      {!showResults ? (
        <button className="checkbtn" id="checkbtn" onClick={handleCheckAnswers}>
          Check answers
        </button>
      ) : (
        <button className="checkbtn" id="checkbtn" onClick={handlePlayAgain}>
          Play again
        </button>
      )}
      {showResults && (
        <div className="result">
          <p>Correct Answers: {correctCount}</p>
        </div>
      )}
    </main>
  );
}

export default App;
