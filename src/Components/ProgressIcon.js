import React from "react";
import "../index.css";
import {patterns} from "../data/data.js";


export default function ProgressIcon({ name, questions, setPatternSelected }) {
  
  const divWidth = 300;
  const color=Object.values(patterns[name]);
  const color1="#c7c7c5";
  
  const calculateProgress = () => {
    const isComplete = (question) => question.complete === 1;
    const total = questions.length;
    var complete = 0;
    for (const question of questions) {
      if (isComplete(question)) {
        complete += 1
      }
    }
    return Math.floor(complete/total*(divWidth - 20));
  }
  
  const changePattern = () => {
    // console.log(name);
    setPatternSelected(name);
  }

  return (
    <div>
      <div className="card progressCard" 
            style={{background: `linear-gradient(to bottom,  ${color} 0%,${color1} 100%)`, width: divWidth}}
            onClick={changePattern}>
      {/* <div className="card" style={{backgroundColor: color}}> */}
        <div className="cardDescription" variant="h6">
          {name}
        </div>
        <div className="progressBar progressBarBack" style={{width: divWidth - 20, zIndex: -1}}>
          <div className="progressBar progressBarFront" style={{width: calculateProgress(), zIndex: 1, position: 'relative'}}></div>
        </div>
        
        

      </div>
    </div>
  );
}
