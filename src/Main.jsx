import React, { useState, useEffect,useRef} from 'react'
import './Main.css'
import data from './assets/data'

function Main() {

  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [isCorrect, setIsCorrect] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(120); 
  const [showMessage, setShowMessage] = useState(false); // State for showing the message
  const [startQuiz, setStartQuizz] = useState(false); // State for showing the result
  const timerRef = useRef(null);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    if (timeLeft > 0 && startQuiz && !showMessage) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000); // Update every second
    } else {
      setShowMessage(true);
    }
    return () => clearTimeout(timerRef.current); // Cleanup on unmount
  }, [timeLeft,showMessage,startQuiz]);

  const start = () => {
    console.log("starting the quiz...");
    setStartQuizz(true);
    setTimeLeft(120); // Reset timer
    setIndex(0); // Reset question index
    setQuestion(data[0]); // Reset question
    setShowMessage(false); // Hide message
    setScore(0); // Reset score
    setCorrectAnswers(0); // Reset correct answers
  };

  const NextQuestion = () =>{
    const newIndex = index+1;
    if(newIndex<data.length){
      setIndex(newIndex);
      setQuestion(data[newIndex]);
      setIsCorrect(null);
      setSelectedOption(null);
    }
  };

  const PrevQuestion=()=>{
    const newIndex = index-1;
    if(newIndex>=0){
      setIndex(newIndex);
      setQuestion(data[newIndex]);
      setIsCorrect(null);
      setSelectedOption(null);
    }
  }

  const handleOption = (option) =>{
    setSelectedOption(option);  // Track the selected option
    setIsCorrect(question.answer.includes(option));
    if (question.answer.includes(option)) {
      setCorrectAnswers(correctAnswers + 1); // Increment correct answers
    }
  };

  const handleSubmit = (selectedOption) => {
    // Handle submission logic (e.g., calculate score, show results)
    clearTimeout(timerRef.current);
    setScore(correctAnswers); // Set score to correct answers count
    setShowMessage(true);
  };



  return (
    <>
      { !startQuiz? (
        <div className="start-page">
          <h1>Ready for the quizz !</h1>
          <button onClick={start}>Start</button>
        </div>
        ): showMessage ? (
          // Full-page message
          <div className="full-page-message">
            <h2>Quiz Completed! 🎉</h2>
            😊<p>You scored {score} out of {data.length}</p>
            <p>Thank you for taking the quiz.</p>
          </div>
          ) : (
          // Quiz content
          <>  
            <div className="timer">
              Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
            </div>
            <div className="quiz-card">
                <div className="quiz">
                    <div className="question">
                      <h3>{question.id}. {question.question}</h3>
                    </div>
                    {question.options.map((option,index)=>(
                      <div key={index} 
                          className={`option 
                            ${selectedOption !== null ?
                              option === question.answer ? 'correct' : 
                              option === selectedOption ? 'wrong' : 
                              '' 
                            : ''}
                          `} 
                            onClick={()=>handleOption(option)}>
                        {option}
                      </div>
                    ))}
                </div>
                <div className="btn">
                  <button onClick={PrevQuestion}>Prev</button>
                  <p>{index+1} of {data.length} questions</p>
                  {index === data.length-1?(<button onClick={handleSubmit}>Submit</button>):(<button onClick={NextQuestion}>Next</button>)}
                </div>
            </div>
          </>
        )}
    </>
  );
}

export default Main