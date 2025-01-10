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
  const timerRef = useRef(null);

  useEffect(() => {
    if (timeLeft > 0 && !showMessage) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000); // Update every second
    } else {
      // Handle timer completion (e.g., end the quiz)
      // alert("Time's up!");
      setShowMessage(true);
    }
    return () => clearTimeout(timerRef.current); // Cleanup on unmount
  }, [timeLeft,showMessage]);

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
  }

  const handleSubmit = () => {
    // Handle submission logic (e.g., calculate score, show results)
    clearTimeout(timerRef.current);
    setShowMessage(true);
  };

  return (
    <>
      {showMessage ? (
        // Full-page message
        <div className="full-page-message">
          <h2>Quiz Completed! 🎉</h2>
          😊
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
  )
}

export default Main