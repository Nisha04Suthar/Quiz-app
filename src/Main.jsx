import React, { useState } from 'react'
import './Main.css'
import data from './assets/data'

function Main() {

  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [isCorrect, setIsCorrect] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

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
    setIsCorrect(option === question.answer);
  }

  return (
    <>  
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