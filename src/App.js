import { useState, useEffect } from "react";
import "./index.css";
import ProgressIcon from "./Components/ProgressIcon";
import { Typography, MenuItem, FormControl, Select } from "@mui/material";
import PatternTable from "./Components/PatternTable";
import {patterns, questionData} from "./data/data.js";


function App() {

  const [questions, setQuestions] = useState(questionData);
  const [dailyGoal, setDailyGoal] = useState(2);
  const [problemsToDo, setProblemsToDo] = useState([]);
  const [newProblems, setNewProblems] = useState([]);
  const [reviewProblems, setReviewProblems] = useState([]);
  const [percentComplete, setPercentComplete] = useState(0);
  
  const [patternSelected, setPatternSelected] = useState("Arrays");

  //function for set daily goal
  const handleDailyGoal =(event)=>{
    setDailyGoal(event.target.value);
  }

  for (const key in patterns){
    // console.log(key);
    if (typeof window.localStorage[`${key}`] === "undefined")
    {
      const table = questions.filter(question => question['pattern'].includes(key));
      window.localStorage.setItem(`${key}`, JSON.stringify(table));
    }
  }

  useEffect(() => {
      // function to select random new problems and problems to review
      const refreshProblems = () => {
        // iterate through all problems to find all
        // which have the review attribute of 1
        var toReview = [];
        var toDo = [];
        var totalQuestions = 0;
        for (const question of questions) {
          if (question.complete === 0) {
            toDo.push(question)
          } else if (question.review === 1) {
            toReview.push(question)
          }
          totalQuestions++;
        }
        setReviewProblems(toReview);
        setProblemsToDo(toDo);
        toDo = toDo.sort(() => Math.random());
        // select dailyGoal random problems from the toDo list
        setNewProblems(toDo.slice(0, dailyGoal));
        // console.log(toDo.length);
        // console.log(totalQuestions);
        setPercentComplete(Math.floor((totalQuestions - toDo.length)/totalQuestions*100));
      }

      refreshProblems();
      console.log(questions[0]);
      
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
              questions={questions.filter(x=>x.pattern.includes(categoryName))}
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
                <FormControl size={"small"} >
                  <Select
                    value={dailyGoal}
                    onChange={handleDailyGoal}
                  >
                  {problemsToDo.length === 0 ?
                    <MenuItem value={dailyGoal}>{dailyGoal}</MenuItem> 
                    : problemsToDo.map((problem, idx) => (
                      <MenuItem 
                        key={problem.id} 
                        value={idx+1}>
                          {idx+1}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Typography variant="h6"> 
                  new problems
                </Typography>
              </div>
              <ol className="problem-list">
                {newProblems.map((question) =>
                  <li key={question.id}>
                    <a href={question.url}  target="_blank">{question.name}</a>
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
                    <a href={question.url} target="_blank">{question.name}</a>
                  </li>
                )}
              </ol>
            </div>
          </div>
          <div className="card tableCard">
            <Typography variant="h5">All <b>{patternSelected.toLowerCase()}</b> problems</Typography>
            <PatternTable pattern={patternSelected} setQuestions={setQuestions}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
