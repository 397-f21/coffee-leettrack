import React from "react";
import "../index.css";

export default function ProgressIcon({ name, category }) {

  console.log(category.color);

  const calculateProgress = () => {
    const isComplete = (question) => question.completed === 1;
    const total = Object.keys(category.questions).length;
    var complete = 0;
    for (const [id, question] of Object.entries(category.questions)) {
      if (isComplete(question)) {
        complete += 1
      }
    }
    return Math.floor(complete/total*135);
  }

  return (
    <div>
      <div className="card" style={{backgroundColor: category.color}}>
        <div className="cardDescription" variant="h6">
          {name}
        </div>
        <div className="progressBarBack"></div>
        <div className="progressBarFront" style={{width: calculateProgress()}}></div> 

      </div>
    </div>
  );
}
