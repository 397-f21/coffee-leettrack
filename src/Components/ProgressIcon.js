import React from "react";
import "../index.css";
import {patterns} from "../data/data.js";


export default function ProgressIcon({ name, questions }) {
  
  const color=Object.values(patterns[name]);
  const color1="#f2f2f2";
  
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
      <div className="card" style={{background: `linear-gradient(to bottom,  ${color} 0%,${color1} 100%)`}}>
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
