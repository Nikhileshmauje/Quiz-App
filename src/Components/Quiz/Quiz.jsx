import React, { useRef, useState } from "react";
import "./Quiz.css";
import { data } from "../../assets/data";

const Quiz = () => {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);

  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);

  const checkAnswer = (e, ans) => {
    if (lock === false) {
      if (question.answer === ans) {
        e.currentTarget.classList.add("correct");
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        e.currentTarget.classList.add("wrong");
        setLock(true);
        [option1, option2, option3, option4][question.answer - 1].current.classList.add("correct");
      }
    }
  };

  const next = () => {
    if (lock === true) {
      if (index === data.length - 1) {
        setResult(true);
        return;
      }
      setIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        setQuestion(data[newIndex]);
        setLock(false);
        [option1, option2, option3, option4].forEach(option => {
          option.current.classList.remove("wrong");
          option.current.classList.remove("correct");
        });
        return newIndex;
      });
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  };

  return (
    <div className="container">
      <h1>Quiz</h1>
      <hr />
      {result ? (
        <>
          <h1>Your Final Score is: {score} out of {data.length}</h1>
          <button onClick={reset}>Reset</button>
        </>
      ) : (
        <>
          <h2>{index + 1}. {question.question}</h2>
          <ul>
            <li ref={option1} onClick={(e) => checkAnswer(e, 1)}>{question.option1}</li>
            <li ref={option2} onClick={(e) => checkAnswer(e, 2)}>{question.option2}</li>
            <li ref={option3} onClick={(e) => checkAnswer(e, 3)}>{question.option3}</li>
            <li ref={option4} onClick={(e) => checkAnswer(e, 4)}>{question.option4}</li>
          </ul>
          <button onClick={next}>Next</button>
          <div className="index">{index + 1} of {data.length} Questions</div>
        </>
      )}
    </div>
  );
};

export default Quiz;
