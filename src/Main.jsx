import React, { useState, useEffect } from 'react'
import './Main.css'
import data from './assets/data'

function Main() {

  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [isCorrect, setIsCorrect] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(120); 

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000); // Update every second
  
      return () => clearTimeout(timer); // Cleanup on unmount
    } else {
      // Handle timer completion (e.g., end the quiz)
      alert("Time's up!");
    }
  }, [timeLeft]);

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

  return (
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
                <button onClick={NextQuestion}>Next</button>
              </div>
          </div>
    </>
  )
}

export default Main