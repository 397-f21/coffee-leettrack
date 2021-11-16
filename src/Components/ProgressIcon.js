import React from "react";
import "../index.css";

export default function ProgressIcon({ name, questions }) {

  const grey = "#dedede";
  
  const calculateProgress = () => {
    const isComplete = (question) => question.complete === 1;
    const total = questions.length;
    var complete = 0;
    for (const question of questions) {
      if (isComplete(question)) {
        complete += 1
      }
    }
    return Math.floor(complete/total*180);
  }

  return (
    <div>
      <div className="card" style={{background: `linear-gradient(to bottom,  ${grey} 0%,${grey} 100%)`}}>
      {/* <div className="card" style={{backgroundColor: category.color}}> */}
        <div className="cardDescription" variant="h6">
          {name}
        </div>
        <div className="progressBar progressBarBack"></div>
        <div className="progressBar progressBarFront" style={{width: calculateProgress()}}></div> 

      </div>
    </div>
  );
}
