import React from "react";
import "../index.css";

export default function ProgressIcon({ name, questions }) {

  const calculateProgress = () => {
    const isComplete = (question) => question.completed === 1;
    const total = Object.keys(questions).length;
    var complete = 0;
    for (const [id, question] of Object.entries(questions)) {
      if (isComplete(question)) {
        complete += 1
      }
    }
    return Math.floor(complete/total*135);
  }

  return (
    <div>
      <div className="card" sx={{ width: 330 }}>
        <div className="cardDescription" variant="h6">
          {name}
        </div>
        <div className="progressBarBack"></div>
        <div className="progressBarFront" style={{width: calculateProgress()}}></div> 

      </div>
    </div>
  );
}
