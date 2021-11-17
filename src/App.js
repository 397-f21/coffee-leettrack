import { useState, useEffect } from "react";
import "./index.css";
import ProgressIcon from "./Components/ProgressIcon";
import { Typography, MenuItem, FormControl, Select } from "@mui/material";
import PatternTable from "./Components/PatternTable";
import {patterns, questions} from "./data/data.js";
import CompletedQuestion from "./Components/CompletedQuestionModal";

function App() {

  // const [questions, setQuestions] = useState(questionData);
  const [dailyGoal, setDailyGoal] = useState(2);
  const [problemsToDo, setProblemsToDo] = useState([]);
  const [newProblems, setNewProblems] = useState([]);
  const [reviewProblems, setReviewProblems] = useState([]);
  const [percentComplete, setPercentComplete] = useState(0);
  const [open, setOpen] = useState(true);
  const [patternSelected, setPatternSelected] = useState("Arrays");

  //function for set daily goal
  const handleDailyGoal =(event)=>{
    setDailyGoal(event.target.value);
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
        setPercentComplete(Math.floor(toDo.length/totalQuestions*100));
      }

      refreshProblems();
      
  }, [dailyGoal]);

  return (
    <div className="App">
      <div className="content">
       <CompletedQuestion open={open} setOpen={setOpen} problemID={0} />
        <div id="progress-column">
          <Typography variant="h2" style={{ marginBottom: 25 }}>LeetTrack</Typography>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}> Overall Progress: {percentComplete}%</Typography>
          {Object.keys(patterns).map((categoryName) => (
            <ProgressIcon 
              key={categoryName} 
              name={categoryName}
              questions={questions.filter(x=>x.pattern.includes(categoryName))}
              setPatternSelected={setPatternSelected}/>
          ))}
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
              <ol>
                {newProblems.map((question) =>
                  <li key={question.id}>
                    <a href={question.url}>{question.name}</a>
                  </li>
                )}
              </ol>
            </div >
            <div id="review-questions" className="card questionCard">
              <div className="question-list-header">
                <Typography variant="h6"> Problems up for review:</Typography>
              </div>
              <ol>
                {reviewProblems.map((question) =>
                  <li key={question.id}>
                    <a href={question.url}>{question.name}</a>
                  </li>
                )}
              </ol>
            </div>
          </div>
          <div className="card tableCard">
            <Typography variant="h5">{patternSelected}</Typography>
            <PatternTable pattern = {patternSelected}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
