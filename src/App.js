import { useState, useEffect } from "react";
import "./index.css";
import ProgressIcon from "./Components/ProgressIcon";
import { Typography } from "@mui/material";
import PatternTable from "./Components/PatternTable";
import {patterns, questionList} from "./data/data.js";


function App() {

  if (typeof window.localStorage['questions'] === 'undefined'){
    window.localStorage.setItem(`questions`, JSON.stringify(questionList))
  }

  const [questions, setQuestions] = useState(JSON.parse(window.localStorage.getItem('questions')));
  const [dailyGoal, setDailyGoal] = useState(2);
  const [dailyProblems, setDailyProblems] = useState([]);
  const [incompleteProblems, setIncompleteProblems] = useState([]);
  const [reviewProblems, setReviewProblems] = useState([]);
  const [percentComplete, setPercentComplete] = useState(0);
  
  const [patternSelected, setPatternSelected] = useState("Arrays");

  //function to set daily goal
  const handleDailyGoal =(event)=>{
    setDailyGoal(event.target.value);
  }
  
  useEffect(() => {

      // function to select random new problems and problems to review
      const refreshProblems = () => {
        const toDo = questions.filter(question => question.complete === 0);
        const toReview = questions.filter(question => question.review === 1);
        const totalQuestions = questions.length;

        setReviewProblems(toReview);
        setIncompleteProblems(toDo);
        // select dailyGoal random problems from the toDo list for the daily problems
        toDo.sort((firstEl, secondEl) => Math.random());
        setDailyProblems(toDo.slice(0, dailyGoal));
        setPercentComplete(Math.floor((totalQuestions - toDo.length)/totalQuestions*100));
      }

      refreshProblems();
      window.localStorage.setItem('questions', JSON.stringify(questions))
      
  }, [dailyGoal, questions]);

  return (
    <div className="App">
      <div className="content">
        <div id="progress-column">
          <Typography variant="h2" style={{ marginBottom: 15 }}>LeetTrack</Typography>
          <Typography variant="h5"> Overall Progress: {percentComplete}%</Typography>
          <div id="progress-component-list">
            {Object.keys(patterns).map((categoryName) => (
              <ProgressIcon 
              key={categoryName} 
              name={categoryName}
              questions={questions.filter(question=>question.pattern.includes(categoryName))}
              setPatternSelected={setPatternSelected}/>
              ))}
          </div>
        </div>
        <div id="problems-column">
          <div id="new-and-review">
            <div id="new-questions" className="card questionCard">
              <div className="question-list-header">
                <Typography variant="h6"> 
                  Daily Goal:
                </Typography>
                <select
                  id="select-daily-goal"
                  data-cy="select-daily-goal"
                  value={dailyGoal}
                  onChange={handleDailyGoal}
                >
                {incompleteProblems.length === 0 ?
                  <option value={dailyGoal}>{dailyGoal}</option> 
                  : incompleteProblems.map((problem, idx) => (
                    <option 
                      key={problem.id}
                      data-cy={"select-option-" + (idx+1)}
                      value={idx+1}>
                        {idx+1}
                    </option>
                  ))}
                </select>
                <Typography variant="h6"> 
                  new problems
                </Typography>
              </div>
              <ol className="problem-list"
                  data-cy="daily-problems">
                {dailyProblems.map((question) =>
                  <li key={question.id}>
                    <a href={question.url}  target="_blank" rel="noreferrer">{question.name}</a>
                  </li>
                )}
              </ol>
            </div >
            <div id="review-questions" className="card questionCard">
              <div className="question-list-header">
                <Typography variant="h6" style={{paddingTop: 5}}> Problems up for review:</Typography>
              </div>
              <ol className="problem-list">
                {reviewProblems.map((question) =>
                  <li key={question.id}>
                    <a href={question.url} target="_blank" rel="noreferrer">{question.name}</a>
                  </li>
                )}
              </ol>
            </div>
          </div>
          <div className="card tableCard">
            <Typography variant="h5">All <b>{patternSelected.toLowerCase()}</b> problems</Typography>
            <PatternTable pattern={patternSelected} questions={questions} setQuestions={setQuestions}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
