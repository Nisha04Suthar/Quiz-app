import React, { useState } from 'react'
import './Main.css'
import data from './assets/data'

function Main() {

  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);

  const NextQuestion = () =>{
    const newIndex = index+1;
    if(newIndex<data.length){
      setIndex(newIndex);
      setQuestion(data[newIndex]);
    }
  };

  return (
    <>
        <div className="quiz-card">
            <div className="quiz">
                <div className="question">
                  <h3>{index+1}. {question.question}</h3>
                </div>
                {question.options.map((option,index)=>(
                  <div key={index} className="option">
                    {option}
                  </div>
                ))}
            </div>
            <div className="btn">
              <button type='submit' onClick={NextQuestion}>Next</button>
            </div>
        </div>
    </>
  )
}

export default Main